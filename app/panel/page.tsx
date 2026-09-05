'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  Leaf,
  Bell,
  Search,
  MoreVertical,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Menu,
  X,
  Plus,
  Trash2,
  Mail,
  Phone,
  Check,
  XCircle,
  ArrowLeft,
  FileText,
  Activity,
  ClipboardList,
  Camera
} from 'lucide-react';
import Link from 'next/link';

// Mock Data Inicial
const initialPatients = [
  { id: 1, name: 'Ana Pérez', phone: '555 123 4567', email: 'ana@ejemplo.com', date: '10/08/2026' },
  { id: 2, name: 'Carlos y Elena', phone: '555 987 6543', email: 'carlos@ejemplo.com', date: '01/09/2026' },
  { id: 3, name: 'Laura M.', phone: '555 456 7890', email: 'laura@ejemplo.com', date: '05/10/2026' },
  { id: 4, name: 'Roberto G.', phone: '555 222 3333', email: 'roberto@ejemplo.com', date: '20/10/2026' },
];

const initialAppointments = [
  { id: 1, patientId: 1, date: '2026-10-25', time: '09:00 AM', type: 'Terapia Individual', status: 'Confirmada', mode: 'En línea' },
  { id: 2, patientId: 2, date: '2026-10-25', time: '11:00 AM', type: 'Terapia de Pareja', status: 'Confirmada', mode: 'Presencial' },
  { id: 3, patientId: 3, date: '2026-10-25', time: '12:30 PM', type: 'Medicina Natural', status: 'Pendiente', mode: 'Presencial' },
  { id: 4, patientId: 4, date: '2026-10-26', time: '04:00 PM', type: 'Primera Sesión', status: 'Confirmada', mode: 'En línea' },
];

const initialMessages = [
  { id: 1, patientId: 3, msg: 'Hola Dra, quería saber si podemos mover la sesión...', time: '10:42 AM', unread: true },
  { id: 2, patientId: 4, msg: 'Perfecto, nos vemos más tarde. Gracias.', time: 'Ayer', unread: false },
  { id: 3, patientId: 3, msg: '¿Podría enviarme las indicaciones de las flores?', time: 'Lun', unread: false },
];

const initialNotes = [
  { id: 1, patientId: 1, date: '2026-10-18', text: 'Progreso favorable en control de ansiedad. Se recomiendan ejercicios de respiración.' },
  { id: 2, patientId: 2, date: '2026-10-20', text: 'Mejora en la comunicación, se establecen nuevos acuerdos para la semana.' },
];

const initialForms = [
  { id: 1, patientId: 1, title: 'Cuestionario de Historial Médico', status: 'Completado', date: '2026-10-10' },
  { id: 2, patientId: 3, title: 'Evaluación Inicial', status: 'Pendiente', date: '2026-10-24' },
];

export default function Panel() {
  const [activeTab, setActiveTab] = useState('Inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // States de Datos
  const [patients, setPatients] = useState(initialPatients);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [messages, setMessages] = useState(initialMessages);
  const [notes, setNotes] = useState(initialNotes);
  const [forms, setForms] = useState(initialForms);

  // States de Modales
  const [isAptModalOpen, setIsAptModalOpen] = useState(false);
  const [isPatModalOpen, setIsPatModalOpen] = useState(false);

  // Formularios
  const [newApt, setNewApt] = useState({ patientId: '', date: '2026-10-26', time: '09:00 AM', type: 'Terapia Individual', mode: 'En línea' });
  const [newPat, setNewPat] = useState({ name: '', phone: '', email: '' });
  const [newNote, setNewNote] = useState('');

  // Estados Activos
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [activePatient, setActivePatient] = useState<number | null>(null);

  useEffect(() => {
    const loadChatbotAppointments = () => {
      try {
        const savedApts = JSON.parse(localStorage.getItem('chatbot_appointments') || '[]');
        if (savedApts.length > 0) {
          let currentPatients = [...patients];
          let currentAppointments = [...appointments];
          let updated = false;

          savedApts.forEach((apt: any) => {
            // Find or create patient
            let patient = currentPatients.find(p => p.name.toLowerCase() === apt.name.toLowerCase());
            if (!patient) {
              const newPatId = currentPatients.length ? Math.max(...currentPatients.map(p => p.id)) + 1 : 1;
              patient = {
                id: newPatId,
                name: apt.name,
                phone: apt.phone || '',
                email: '',
                date: new Date().toLocaleDateString('es-ES')
              };
              currentPatients.push(patient);
            }

            // Create appointment
            const newAptId = currentAppointments.length ? Math.max(...currentAppointments.map(a => a.id)) + 1 : 1;
            currentAppointments.push({
              id: newAptId,
              patientId: patient.id,
              date: apt.date,
              time: apt.time,
              type: apt.type,
              status: 'Pendiente',
              mode: 'Por definir'
            });
            updated = true;
          });

          if (updated) {
            setPatients(currentPatients);
            setAppointments(currentAppointments);
            localStorage.setItem('chatbot_appointments', '[]'); // clear them after loading
          }
        }
      } catch (e) {
        console.error('Error loading chatbot appointments', e);
      }
    };

    // Load initially
    loadChatbotAppointments();

    // Listen for custom event from chatbot
    window.addEventListener('appointments_updated', loadChatbotAppointments);
    return () => window.removeEventListener('appointments_updated', loadChatbotAppointments);
  }, [patients, appointments]);

  const sidebarLinks = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Inicio' },
    { icon: <CalendarIcon className="w-5 h-5" />, label: 'Calendario y Citas' },
    { icon: <Users className="w-5 h-5" />, label: 'Pacientes' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Mensajes' },
    { icon: <Settings className="w-5 h-5" />, label: 'Configuración' },
  ];

  // Helpers
  const getPatientName = (id: number) => patients.find(p => p.id === id)?.name || 'Desconocido';
  const getUnreadCount = () => messages.filter(m => m.unread).length;

  // Handlers
  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPat.name) return;
    const newId = patients.length ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    setPatients([...patients, { ...newPat, id: newId, date: new Date().toLocaleDateString('es-ES') }]);
    setIsPatModalOpen(false);
    setNewPat({ name: '', phone: '', email: '' });
  };

  const handleDeletePatient = (id: number) => {
    setPatients(patients.filter(p => p.id !== id));
    setAppointments(appointments.filter(a => a.patientId !== id));
  };

  const handleSendWhatsAppReminder = (aptId: number) => {
    const apt = appointments.find(a => a.id === aptId);
    if (!apt) return;
    const patient = patients.find(p => p.id === apt.patientId);
    if (!patient || !patient.phone) return;

    const phone = patient.phone.replace(/\D/g, '');
    const message = `Hola ${patient.name}, te escribo del consultorio de la Dra. Jazmin. Te recordamos que tienes una cita programada para hoy a las ${apt.time} (${apt.type} - ${apt.mode}). ¿Nos confirmas tu asistencia?`;
    
    window.open(`https://wa.me/52${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApt.patientId) return;
    const newId = appointments.length ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
    setAppointments([...appointments, { ...newApt, id: newId, patientId: Number(newApt.patientId), status: 'Confirmada' }]);
    setIsAptModalOpen(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote || !activePatient) return;
    const newId = notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1;
    setNotes([{ id: newId, patientId: activePatient, date: new Date().toLocaleDateString('es-ES'), text: newNote }, ...notes]);
    setNewNote('');
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleToggleAptStatus = (id: number) => {
    setAppointments(appointments.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === 'Confirmada' ? 'Cancelada' : a.status === 'Cancelada' ? 'Pendiente' : 'Confirmada';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const handleDeleteApt = (id: number) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  const openChat = (msgId: number) => {
    setActiveChat(msgId);
    setMessages(messages.map(m => m.id === msgId ? { ...m, unread: false } : m));
  };

  // Renderers para las Pestañas
  const renderInicio = () => {
    const todaysAppointments = appointments.filter(a => a.date === '2026-10-25');
    
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[32px] border border-[#7895A3]/10 shadow-sm flex items-center justify-between transition-transform hover:-translate-y-1">
            <div>
              <p className="text-[#636E72] text-sm font-bold uppercase tracking-widest mb-1">Citas de Hoy</p>
              <p className="text-4xl font-serif text-[#37454A]">{todaysAppointments.length}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#D9E6DF] flex items-center justify-center text-[#37454A]">
              <CalendarIcon className="w-7 h-7" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-[32px] border border-[#7895A3]/10 shadow-sm flex items-center justify-between transition-transform hover:-translate-y-1">
            <div>
              <p className="text-[#636E72] text-sm font-bold uppercase tracking-widest mb-1">Pacientes Activos</p>
              <p className="text-4xl font-serif text-[#37454A]">{patients.length}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#D9E6DF] flex items-center justify-center text-[#37454A]">
              <Users className="w-7 h-7" />
            </div>
          </div>
          <div className="bg-[#7895A3] text-white p-6 rounded-[32px] shadow-lg shadow-[#7895A3]/20 flex items-center justify-between relative overflow-hidden transition-transform hover:-translate-y-1">
            <div className="relative z-10">
              <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-1">Ingresos del Mes</p>
              <p className="text-4xl font-serif">$12,450</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm relative z-10">
              <ArrowUpRight className="w-7 h-7" />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
          </div>
        </div>

        {/* Schedule & Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[32px] border border-[#7895A3]/10 shadow-sm p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif font-medium text-[#37454A]">Agenda de Hoy (25 Oct)</h2>
              <button onClick={() => setActiveTab('Calendario y Citas')} className="text-sm font-bold text-[#7895A3] hover:text-[#37454A]">Ver todo</button>
            </div>
            {todaysAppointments.length === 0 ? (
              <p className="text-[#636E72] text-center py-8">No hay citas programadas para hoy.</p>
            ) : (
              <div className="space-y-4">
                {todaysAppointments.map((apt) => (
                  <div key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-[#E7DED1] hover:border-[#7895A3]/30 hover:bg-[#F7F5F0] transition-all gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#D9E6DF] flex flex-col items-center justify-center text-[#37454A] shrink-0 shadow-inner">
                        <span className="text-xs font-bold uppercase">{apt.time.split(' ')[1]}</span>
                        <span className="text-lg font-serif">{apt.time.split(' ')[0]}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#37454A] text-lg">{getPatientName(apt.patientId)}</h4>
                        <p className="text-sm text-[#636E72]">{apt.type} • {apt.mode}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                      <button 
                        onClick={() => handleSendWhatsAppReminder(apt.id)}
                        title="Enviar recordatorio por WhatsApp"
                        className="p-1.5 text-gray-400 hover:text-[#37454A] hover:bg-[#D9E6DF] rounded-lg transition-colors flex items-center justify-center"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleToggleAptStatus(apt.id)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors
                          ${apt.status === 'Confirmada' ? 'bg-[#D9E6DF] text-[#37454A] hover:bg-[#D9E6DF]' : 
                            apt.status === 'Cancelada' ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'}`}
                      >
                        {apt.status === 'Confirmada' ? <CheckCircle2 className="w-3.5 h-3.5" /> : apt.status === 'Cancelada' ? <XCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {apt.status}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-[32px] border border-[#7895A3]/10 shadow-sm p-6 md:p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif font-medium text-[#37454A]">Mensajes Recientes</h2>
              <button onClick={() => setActiveTab('Mensajes')} className="text-sm font-bold text-[#7895A3] hover:text-[#37454A]">Ir a chat</button>
            </div>
            <div className="space-y-6 flex-1">
              {messages.slice(0,3).map((msg) => (
                <div key={msg.id} onClick={() => { setActiveTab('Mensajes'); openChat(msg.id); }} className="flex gap-4 cursor-pointer group">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#D9E6DF] flex items-center justify-center text-[#37454A] font-serif text-lg">
                      {getPatientName(msg.patientId).charAt(0)}
                    </div>
                    {msg.unread && <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-bold truncate ${msg.unread ? 'text-[#37454A]' : 'text-[#636E72]'}`}>{getPatientName(msg.patientId)}</span>
                      <span className="text-xs text-gray-400 font-medium shrink-0 ml-2">{msg.time}</span>
                    </div>
                    <p className={`text-sm truncate ${msg.unread ? 'font-medium text-[#37454A]' : 'text-[#636E72]'}`}>{msg.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCitas = () => (
    <div className="bg-white rounded-[32px] border border-[#7895A3]/10 shadow-sm p-6 md:p-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-serif font-medium text-[#37454A]">Todas las Citas</h2>
          <p className="text-[#636E72] mt-1 text-sm">Gestiona tu agenda completa</p>
        </div>
        <button 
          onClick={() => setIsAptModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#7895A3] text-white rounded-xl font-bold hover:bg-[#8FAF9D] transition-all shadow-md"
        >
          <Plus className="w-5 h-5" />
          Nueva Cita
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-4 font-bold text-[#636E72] text-sm uppercase">Fecha y Hora</th>
              <th className="py-4 px-4 font-bold text-[#636E72] text-sm uppercase">Paciente</th>
              <th className="py-4 px-4 font-bold text-[#636E72] text-sm uppercase">Detalles</th>
              <th className="py-4 px-4 font-bold text-[#636E72] text-sm uppercase">Estado</th>
              <th className="py-4 px-4 font-bold text-[#636E72] text-sm uppercase text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {appointments.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(apt => (
              <tr key={apt.id} className="border-b border-gray-50 hover:bg-[#F7F5F0] transition-colors">
                <td className="py-4 px-4">
                  <div className="font-bold text-[#37454A]">{apt.date}</div>
                  <div className="text-sm text-[#636E72]">{apt.time}</div>
                </td>
                <td className="py-4 px-4 font-medium text-[#37454A]">
                  {getPatientName(apt.patientId)}
                </td>
                <td className="py-4 px-4">
                  <div className="text-[#37454A] text-sm">{apt.type}</div>
                  <div className="text-xs text-[#636E72]">{apt.mode}</div>
                </td>
                <td className="py-4 px-4">
                  <button 
                    onClick={() => handleToggleAptStatus(apt.id)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 transition-colors
                      ${apt.status === 'Confirmada' ? 'bg-[#D9E6DF] text-[#37454A] hover:bg-[#D9E6DF]' : 
                        apt.status === 'Cancelada' ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'}`}
                  >
                    {apt.status === 'Confirmada' ? <CheckCircle2 className="w-3.5 h-3.5" /> : apt.status === 'Cancelada' ? <XCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {apt.status}
                  </button>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleSendWhatsAppReminder(apt.id)}
                      title="Enviar recordatorio por WhatsApp"
                      className="p-2 text-gray-400 hover:text-[#37454A] hover:bg-[#D9E6DF] rounded-lg transition-all"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeleteApt(apt.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#636E72]">No hay citas registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPacientes = () => {
    if (activePatient) {
      const patient = patients.find(p => p.id === activePatient);
      if (!patient) return null;
      
      const patientNotes = notes.filter(n => n.patientId === activePatient);
      const patientForms = forms.filter(f => f.patientId === activePatient);

      return (
        <div className="bg-white rounded-[32px] border border-[#7895A3]/10 shadow-sm p-6 md:p-8 animate-in fade-in duration-500">
          <button 
            onClick={() => setActivePatient(null)}
            className="flex items-center gap-2 text-[#7895A3] font-bold hover:text-[#37454A] transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Directorio
          </button>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Perfil */}
            <div className="w-full md:w-1/3">
              <div className="bg-[#F7F5F0] p-6 rounded-3xl border border-[#7895A3]/10 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4 group">
                  <input
                    type="file"
                    accept="image/*"
                    id={`avatar-upload-${patient.id}`}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setPatients(patients.map(p => p.id === patient.id ? { ...p, avatar: url } : p));
                      }
                    }}
                  />
                  <label 
                    htmlFor={`avatar-upload-${patient.id}`}
                    className="cursor-pointer block w-full h-full rounded-full bg-[#D9E6DF] flex items-center justify-center text-[#37454A] font-serif text-4xl shadow-inner overflow-hidden border-2 border-transparent group-hover:border-[#7895A3] transition-all relative"
                  >
                    {(patient as any).avatar ? (
                      <img src={(patient as any).avatar} alt={patient.name} className="w-full h-full object-cover" />
                    ) : (
                      patient.name.charAt(0)
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </label>
                </div>
                <h2 className="text-2xl font-serif font-medium text-[#37454A] mb-1">{patient.name}</h2>
                <p className="text-sm text-[#636E72] mb-6">Paciente desde {patient.date}</p>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E7DED1] flex items-center justify-center text-[#7895A3]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#636E72] uppercase">Teléfono</p>
                      <p className="text-sm text-[#37454A]">{patient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E7DED1] flex items-center justify-center text-[#7895A3]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#636E72] uppercase">Email</p>
                      <p className="text-sm text-[#37454A] break-all">{patient.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Historial y Notas */}
            <div className="w-full md:w-2/3 space-y-8">
              {/* Formularios */}
              <div>
                <h3 className="text-lg font-bold text-[#37454A] mb-4 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-[#7895A3]" />
                  Formularios y Cuestionarios
                </h3>
                <div className="space-y-3">
                  {patientForms.map(form => (
                    <div key={form.id} className="flex items-center justify-between p-4 rounded-2xl border border-[#E7DED1] hover:border-[#7895A3]/30 transition-all bg-white">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#7895A3]" />
                        <div>
                          <p className="font-bold text-[#37454A] text-sm">{form.title}</p>
                          <p className="text-xs text-[#636E72]">Enviado: {form.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-bold rounded-lg ${form.status === 'Completado' ? 'bg-[#D9E6DF] text-[#37454A]' : 'bg-yellow-50 text-yellow-700'}`}>
                        {form.status}
                      </span>
                    </div>
                  ))}
                  {patientForms.length === 0 && <p className="text-sm text-[#636E72]">No hay formularios registrados.</p>}
                  <button className="w-full py-3 border-2 border-dashed border-[#E7DED1] text-[#7895A3] font-bold rounded-2xl hover:bg-[#F7F5F0] transition-colors text-sm flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Enviar Cuestionario
                  </button>
                </div>
              </div>

              {/* Notas de Sesión */}
              <div>
                <h3 className="text-lg font-bold text-[#37454A] mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#7895A3]" />
                  Notas Clínicas
                </h3>
                
                <form onSubmit={handleAddNote} className="mb-6">
                  <textarea 
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    placeholder="Escribe una nueva nota o resumen de sesión..."
                    className="w-full p-4 rounded-2xl border border-[#E7DED1] focus:ring-2 focus:ring-[#7895A3] focus:border-transparent outline-none resize-none h-24 mb-3 text-sm"
                  ></textarea>
                  <button type="submit" className="px-5 py-2.5 bg-[#7895A3] text-white rounded-xl font-bold hover:bg-[#8FAF9D] transition-all shadow-md text-sm flex items-center gap-2 ml-auto">
                    <Plus className="w-4 h-4" /> Guardar Nota
                  </button>
                </form>

                <div className="space-y-4">
                  {patientNotes.map(note => (
                    <div key={note.id} className="p-5 rounded-2xl border border-[#E7DED1] bg-[#F7F5F0] relative group">
                      <button 
                        onClick={() => handleDeleteNote(note.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <p className="text-xs font-bold text-[#7895A3] mb-2">{note.date}</p>
                      <p className="text-sm text-[#37454A] leading-relaxed">{note.text}</p>
                    </div>
                  ))}
                  {patientNotes.length === 0 && <p className="text-sm text-[#636E72]">No hay notas registradas.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-[32px] border border-[#7895A3]/10 shadow-sm p-6 md:p-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-serif font-medium text-[#37454A]">Directorio de Pacientes</h2>
            <p className="text-[#636E72] mt-1 text-sm">{patients.length} pacientes activos</p>
          </div>
          <button 
            onClick={() => setIsPatModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#7895A3] text-white rounded-xl font-bold hover:bg-[#8FAF9D] transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            Nuevo Paciente
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {patients.map(pat => (
            <div key={pat.id} className="border border-[#E7DED1] rounded-2xl p-6 hover:border-[#7895A3]/40 hover:shadow-md transition-all bg-[#F7F5F0]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-[#D9E6DF] flex items-center justify-center text-[#37454A] font-serif text-xl overflow-hidden shadow-inner">
                  {(pat as any).avatar ? (
                    <img src={(pat as any).avatar} alt={pat.name} className="w-full h-full object-cover" />
                  ) : (
                    pat.name.charAt(0)
                  )}
                </div>
                <button onClick={() => handleDeletePatient(pat.id)} className="text-gray-400 hover:text-red-500 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-bold text-[#37454A] text-lg mb-1">{pat.name}</h3>
              <p className="text-xs text-[#636E72] mb-4">Alta: {pat.date}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#636E72]">
                  <Phone className="w-4 h-4 text-[#7895A3]" />
                  {pat.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#636E72]">
                  <Mail className="w-4 h-4 text-[#7895A3]" />
                  {pat.email}
                </div>
              </div>
              <button onClick={() => setActivePatient(pat.id)} className="w-full mt-6 py-2 border border-[#7895A3] text-[#7895A3] rounded-xl font-bold hover:bg-[#D9E6DF] transition-colors text-sm">
                Ver Historial
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMensajes = () => {
    const chatDetails = messages.find(m => m.id === activeChat);
    return (
      <div className="bg-white rounded-[32px] border border-[#7895A3]/10 shadow-sm overflow-hidden flex h-[70vh] animate-in fade-in duration-500">
        {/* Lista de chats */}
        <div className={`w-full md:w-1/3 border-r border-gray-100 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-gray-100 bg-[#F7F5F0]">
            <h2 className="font-bold text-[#37454A] text-lg">Bandeja de Entrada</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                onClick={() => openChat(msg.id)}
                className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${activeChat === msg.id ? 'bg-[#D9E6DF]' : 'hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-bold truncate ${msg.unread ? 'text-[#37454A]' : 'text-[#636E72]'}`}>{getPatientName(msg.patientId)}</span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <p className="text-sm text-[#636E72] truncate">{msg.msg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vista de chat */}
        <div className={`w-full md:w-2/3 flex flex-col bg-[#F7F5F0] ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
          {activeChat && chatDetails ? (
            <>
              <div className="p-4 border-b border-gray-100 bg-white flex items-center gap-3">
                <button onClick={() => setActiveChat(null)} className="md:hidden p-2 -ml-2 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full bg-[#D9E6DF] flex items-center justify-center text-[#37454A] font-serif text-lg">
                  {getPatientName(chatDetails.patientId).charAt(0)}
                </div>
                <h3 className="font-bold text-[#37454A]">{getPatientName(chatDetails.patientId)}</h3>
              </div>
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div className="flex flex-col gap-1 max-w-[80%]">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-gray-100 text-[#37454A] shadow-sm">
                    {chatDetails.msg}
                  </div>
                  <span className="text-xs text-gray-400 ml-1">{chatDetails.time}</span>
                </div>
              </div>
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                  <input type="text" placeholder="Escribe un mensaje..." className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#7895A3] focus:ring-1 focus:ring-[#7895A3]" />
                  <button className="w-12 h-12 bg-[#7895A3] text-white rounded-full flex items-center justify-center hover:bg-[#8FAF9D] transition-colors shadow-md">
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
              <MessageSquare className="w-16 h-16 text-gray-200 mb-4" />
              <p>Selecciona un mensaje para leerlo y responder</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderConfig = () => (
    <div className="bg-white rounded-[32px] border border-[#7895A3]/10 shadow-sm p-6 md:p-8 animate-in fade-in duration-500 max-w-2xl">
      <h2 className="text-2xl font-serif font-medium text-[#37454A] mb-8">Configuración del Panel</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-[#636E72] mb-2">Nombre del Profesional</label>
          <input type="text" defaultValue="Dra. Jazmin" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7895A3] focus:border-transparent outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#636E72] mb-2">Notificaciones por Email</label>
          <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7895A3] outline-none">
            <option>Activadas (Para cada nueva cita)</option>
            <option>Solo un resumen diario</option>
            <option>Desactivadas</option>
          </select>
        </div>
        <button className="px-6 py-3 bg-[#7895A3] text-white rounded-xl font-bold hover:bg-[#8FAF9D] transition-all">
          Guardar Cambios
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#F7F5F0] overflow-hidden font-sans text-[#37454A]">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#37454A]/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#7895A3]/10 flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7895A3] flex items-center justify-center text-white shadow-md">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#37454A]">Panel Privado</span>
          </div>
          <button className="md:hidden text-gray-500" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link, i) => {
            const isActive = activeTab === link.label;
            return (
              <button 
                key={i} 
                onClick={() => { setActiveTab(link.label); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all ${isActive ? 'bg-[#7895A3] text-white shadow-md shadow-[#7895A3]/20' : 'text-[#636E72] hover:bg-[#D9E6DF] hover:text-[#37454A]'}`}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  {link.label}
                </div>
                {link.label === 'Mensajes' && getUnreadCount() > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white text-[#7895A3]' : 'bg-red-500 text-white'}`}>
                    {getUnreadCount()}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#7895A3]/10 bg-gray-50/50">
          <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-[#636E72] hover:bg-white hover:text-red-500 transition-all shadow-sm border border-transparent hover:border-red-100">
            <LogOut className="w-5 h-5" />
            Salir al sitio web
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 px-4 md:px-8 bg-white/50 backdrop-blur-md border-b border-[#7895A3]/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-serif font-medium text-[#37454A] hidden sm:block">
              {activeTab === 'Inicio' ? 'Hola, Jazmin 👋' : activeTab}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Buscar pacientes..." className="pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#7895A3] focus:border-transparent outline-none text-sm w-64 bg-white" />
            </div>
            <button className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#636E72] hover:bg-[#D9E6DF] hover:text-[#37454A] transition-all relative">
              <Bell className="w-5 h-5" />
              {getUnreadCount() > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>}
            </button>
            <div className="w-11 h-11 rounded-full bg-[#7895A3] text-white flex items-center justify-center font-bold shadow-md">
              J
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'Inicio' && renderInicio()}
            {activeTab === 'Calendario y Citas' && renderCitas()}
            {activeTab === 'Pacientes' && renderPacientes()}
            {activeTab === 'Mensajes' && renderMensajes()}
            {activeTab === 'Configuración' && renderConfig()}
          </div>
        </main>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {isAptModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#37454A]/40 backdrop-blur-sm" onClick={() => setIsAptModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-[32px] p-6 md:p-8 w-full max-w-md relative z-10 shadow-2xl">
              <button onClick={() => setIsAptModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"><X className="w-6 h-6"/></button>
              <h3 className="text-2xl font-serif text-[#37454A] mb-6">Programar Nueva Cita</h3>
              <form onSubmit={handleAddAppointment} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#636E72] mb-1">Paciente</label>
                  <select required value={newApt.patientId} onChange={e => setNewApt({...newApt, patientId: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7895A3] outline-none">
                    <option value="">Selecciona un paciente</option>
                    {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#636E72] mb-1">Fecha</label>
                    <input required type="date" value={newApt.date} onChange={e => setNewApt({...newApt, date: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7895A3] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#636E72] mb-1">Hora</label>
                    <select value={newApt.time} onChange={e => setNewApt({...newApt, time: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7895A3] outline-none">
                      <option>09:00 AM</option><option>10:00 AM</option><option>11:00 AM</option>
                      <option>12:00 PM</option><option>04:00 PM</option><option>05:00 PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#636E72] mb-1">Tipo de Servicio</label>
                  <select value={newApt.type} onChange={e => setNewApt({...newApt, type: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7895A3] outline-none">
                    <option>Terapia Individual</option><option>Terapia de Pareja</option><option>Medicina Natural</option><option>Primera Sesión</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#636E72] mb-1">Modalidad</label>
                  <select value={newApt.mode} onChange={e => setNewApt({...newApt, mode: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7895A3] outline-none">
                    <option>En línea</option><option>Presencial</option>
                  </select>
                </div>
                <button type="submit" className="w-full mt-4 py-3.5 bg-[#7895A3] text-white font-bold rounded-xl hover:bg-[#8FAF9D] transition-all shadow-md">
                  Guardar Cita
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {isPatModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#37454A]/40 backdrop-blur-sm" onClick={() => setIsPatModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-[32px] p-6 md:p-8 w-full max-w-md relative z-10 shadow-2xl">
              <button onClick={() => setIsPatModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"><X className="w-6 h-6"/></button>
              <h3 className="text-2xl font-serif text-[#37454A] mb-6">Registrar Paciente</h3>
              <form onSubmit={handleAddPatient} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#636E72] mb-1">Nombre Completo</label>
                  <input required type="text" placeholder="Ej. Juan Pérez" value={newPat.name} onChange={e => setNewPat({...newPat, name: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7895A3] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#636E72] mb-1">Teléfono</label>
                  <input required type="tel" placeholder="Ej. 555 123 4567" value={newPat.phone} onChange={e => setNewPat({...newPat, phone: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7895A3] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#636E72] mb-1">Correo Electrónico</label>
                  <input required type="email" placeholder="Ej. juan@correo.com" value={newPat.email} onChange={e => setNewPat({...newPat, email: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#7895A3] outline-none" />
                </div>
                <button type="submit" className="w-full mt-4 py-3.5 bg-[#7895A3] text-white font-bold rounded-xl hover:bg-[#8FAF9D] transition-all shadow-md">
                  Crear Expediente
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
