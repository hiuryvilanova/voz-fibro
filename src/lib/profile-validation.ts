import { createHmac } from "crypto";

export const BRAZIL_STATES = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function isValidCpf(value: string) {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  for (let digit = 9; digit < 11; digit++) {
    let sum = 0;
    for (let index = 0; index < digit; index++) sum += Number(cpf[index]) * (digit + 1 - index);
    const check = ((sum * 10) % 11) % 10;
    if (check !== Number(cpf[digit])) return false;
  }
  return true;
}

export function isStrongPassword(password: string) {
  return password.length >= 10 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password) && !/\s/.test(password);
}

export function cpfHash(cpf: string) {
  const secret = process.env.CPF_HASH_SECRET ?? process.env.SESSION_SECRET;
  if (!secret) throw new Error("CPF_HASH_SECRET não configurado");
  return createHmac("sha256", secret).update(onlyDigits(cpf)).digest("hex");
}

export function validateProfile(input: Record<string, unknown>) {
  const name = String(input.name ?? "").trim();
  const state = String(input.state ?? "").toUpperCase();
  const city = String(input.city ?? "").trim();
  const phone = onlyDigits(String(input.phone ?? ""));
  const profession = String(input.profession ?? "").trim();
  const cpf = onlyDigits(String(input.cpf ?? ""));

  if (name.length < 3) return { error: "Informe seu nome completo." };
  if (!BRAZIL_STATES.includes(state)) return { error: "Selecione um estado válido." };
  if (city.length < 2) return { error: "Informe sua cidade." };
  if (phone.length < 10 || phone.length > 11) return { error: "Informe um telefone válido com DDD." };
  if (profession.length < 2) return { error: "Informe sua profissão ou ocupação." };
  if (!isValidCpf(cpf)) return { error: "CPF inválido." };

  return { data: { name, state, city, phone, profession, cpf, cpfHash: cpfHash(cpf), cpfLast4: cpf.slice(-4) } };
}

export function validateEditableProfile(input: Record<string, unknown>) {
  const name = String(input.name ?? "").trim();
  const state = String(input.state ?? "").toUpperCase();
  const city = String(input.city ?? "").trim();
  const phone = onlyDigits(String(input.phone ?? ""));
  const profession = String(input.profession ?? "").trim();

  if (name.length < 3) return { error: "Informe seu nome completo." };
  if (!BRAZIL_STATES.includes(state)) return { error: "Selecione um estado válido." };
  if (city.length < 2) return { error: "Informe sua cidade." };
  if (phone.length < 10 || phone.length > 11) return { error: "Informe um telefone válido com DDD." };
  if (profession.length < 2) return { error: "Informe sua profissão ou ocupação." };

  return { data: { name, state, city, phone, profession } };
}
