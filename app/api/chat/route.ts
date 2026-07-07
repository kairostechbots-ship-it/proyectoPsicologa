import { GoogleGenAI, Type } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const systemInstruction = `
You are a helpful and empathetic virtual assistant for Dra. Jazmin, a psychologist.
You answer questions about the clinic's hours, services, and you can help book appointments.

Hours of Operation:
- Monday to Friday: 9:00 AM - 5:00 PM
- Saturday: 9:00 AM - 1:00 PM

Services:
- Individual Therapy
- Couples Therapy
- Online Therapy

To book an appointment, you must ask the user for:
1. Their name.
2. The date and time they prefer.
3. The type of therapy they want.
4. Their phone number (if they are a new patient).

When you have enough information to book, use the 'bookAppointment' tool.
If the user provides their name, the tool will check if they are in the database and create a new patient record if not, then book the appointment.

Keep your responses friendly, professional, and concise. Speak in Spanish as Dra. Jazmin's patients speak Spanish.
`;

    const bookAppointmentTool = {
      name: 'bookAppointment',
      description: 'Books an appointment for a patient. Checks if the patient exists by name, creates a new one if not, and then creates the appointment.',
      parameters: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: 'The full name of the patient.',
          },
          date: {
            type: Type.STRING,
            description: 'The date for the appointment (e.g., YYYY-MM-DD or a clear description).',
          },
          time: {
            type: Type.STRING,
            description: 'The time for the appointment.',
          },
          type: {
            type: Type.STRING,
            description: 'The type of therapy (e.g., Terapia Individual, Terapia de Pareja).',
          },
          phone: {
            type: Type.STRING,
            description: 'The phone number of the patient. Optional if they are already a patient, but required if they are new.',
          },
        },
        required: ['name', 'date', 'time', 'type'],
      },
    };

    // Convert messages to the format expected by the model
    // Assuming messages from client are { role: 'user' | 'model', content: string }
    const formattedMessages = messages.map((m: any) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    let response;
    let retries = 3;
    while (retries > 0) {
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: formattedMessages,
          config: {
            systemInstruction,
            tools: [{ functionDeclarations: [bookAppointmentTool] }],
            temperature: 0.2,
          },
        });
        break; // Success, exit retry loop
      } catch (e: any) {
        if (e.status === 503 && retries > 1) {
          retries--;
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
        } else {
          throw e; // Re-throw if not 503 or out of retries
        }
      }
    }

    // Tell TypeScript that response is defined here
    if (!response) {
       throw new Error("Failed to generate content");
    }

    const functionCalls = response.functionCalls;
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === 'bookAppointment') {
        const args = call.args as any;
        // In a real app, we would save this to the database.
        // For now, we will return a success message back to the chat.
        // We'll simulate a successful booking.
        const responseText = `¡Perfecto! He agendado la cita para ${args.name} el ${args.date} a las ${args.time} para ${args.type}. Le hemos enviado un recordatorio. ¿Hay algo más en lo que pueda ayudarte?`;
        
        return NextResponse.json({
          text: responseText,
          action: 'book_appointment', // We can send this to the client to update local state if needed
          appointmentDetails: args,
        });
      }
    }

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Lo siento, hubo un problema al procesar tu solicitud.' },
      { status: 500 }
    );
  }
}
