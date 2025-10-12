export function isEmail(value: string): boolean {
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value);
}

export function isPhoneNumber(value: string): boolean {
  return /^55\d{9,12}$/.test(value);
}

export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11) {
    return false;
  }
  // Check if all digits are equal
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }
  // Check first verifier digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let digit = 11 - (sum % 11);

  if (digit > 9) {
    digit = 0;
  }

  if (parseInt(cpf.charAt(9)) !== digit) {
    return false;
  }

  // Check second verifier digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  digit = 11 - (sum % 11);

  if (digit > 9) {
    digit = 0;
  }

  if (parseInt(cpf.charAt(10)) !== digit) {
    return false;
  }

  return true;
}

export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, "");
  if (cnpj.length !== 14) {
    return false;
  }
  // Check if all digits are equal
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }
  // Check first verifier digit
  let sum = 0;
  let weight = 5;

  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }

  let digit = 11 - (sum % 11);

  if (digit > 9) {
    digit = 0;
  }

  if (parseInt(cnpj.charAt(12)) !== digit) {
    return false;
  }

  // Check second verifier digit
  sum = 0;
  weight = 6;

  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }

  digit = 11 - (sum % 11);

  if (digit > 9) {
    digit = 0;
  }

  if (parseInt(cnpj.charAt(13)) !== digit) {
    return false;
  }

  return true;
}
