import { isEmail, isPhoneNumber } from './validators';
import { PixKeyType } from '@types';

export function onlyNumbers(value: string = '') {
  return value.replace(/\D/g, '');
}

export function formatDocument(document?: string): string {
  if (!document) {
    return '';
  }

  const text = onlyNumbers(document);

  return text.length > 11 ? formatCNPJ(text) : formatCPF(text);
}

export function formatCPF(text = '') {
  return text
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function formatCNPJ(text = '') {
  return text
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

export function formatPhone(phone = '') {
  const value = onlyNumbers(phone);

  if (value.length > 11) {
    return (
      '+' +
      value
        .replace(/(\d{2})(\d{2})(\d)/, '$1 ($2) $3')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})(\d+?)$/, '$1')
    );
  }

  return value
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)$/, '$1');
}

export function formatZipCode(value: string = '') {
  return value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, '$1-$2');
}

export function formatPixKey(value: string, type?: PixKeyType) {
  if (type === 'EMAIL') {
    return value;
  }

  if (type === 'CPF') {
    return formatCPF(value);
  }

  if (type === 'CNPJ') {
    return formatCNPJ(value);
  }

  if (type === 'PHONE') {
    return formatPhone(value);
  }

  return value;
}
