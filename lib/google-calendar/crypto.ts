import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";

const ALGORITHM = "aes-256-gcm";

function getEncryptionKey(): Buffer {
  const key = process.env.GOOGLE_TOKEN_ENCRYPTION_KEY;

  if (!key || !/^[a-fA-F0-9]{64}$/.test(key)) {
    throw new Error(
      "GOOGLE_TOKEN_ENCRYPTION_KEY debe contener 64 caracteres hexadecimales.",
    );
  }

  return Buffer.from(key, "hex");
}

export function encryptToken(value: string): string {
  const iv = randomBytes(12);

  const cipher = createCipheriv(
    ALGORITHM,
    getEncryptionKey(),
    iv,
  );

  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted.toString("hex"),
  ].join(":");
}

export function decryptToken(value: string): string {
  const [ivHex, authTagHex, encryptedHex] = value.split(":");

  if (!ivHex || !authTagHex || !encryptedHex) {
    throw new Error("Formato de token cifrado inválido.");
  }

  const decipher = createDecipheriv(
    ALGORITHM,
    getEncryptionKey(),
    Buffer.from(ivHex, "hex"),
  );

  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]).toString("utf8");
}