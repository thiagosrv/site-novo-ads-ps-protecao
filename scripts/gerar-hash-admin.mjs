// Gera o valor de ADMIN_PASSWORD_HASH localmente — a senha em texto puro
// nunca sai da sua máquina nem é enviada para o Claude.
//
// Uso:
//   node scripts/gerar-hash-admin.mjs "seu-email@exemplo.com" "sua-senha-aqui"
//
// Copie as duas linhas impressas para dentro de .env.local (e depois para
// as Environment Variables da Vercel, quando for para produção).

import { randomBytes, scryptSync } from "crypto";

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error('Uso: node scripts/gerar-hash-admin.mjs "email@exemplo.com" "senha"');
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");

console.log(`ADMIN_EMAIL=${email}`);
console.log(`ADMIN_PASSWORD_HASH=${salt}:${hash}`);
