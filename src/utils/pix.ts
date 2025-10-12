import { isEmail, isPhoneNumber, isValidCNPJ, isValidCPF } from './validators';
import { PixKeyType } from '@types';

export function getPixKeyType(key: string): PixKeyType | undefined {
  if (isEmail(key)) {
    return 'EMAIL';
  }

  if (isValidCPF(key)) {
    return 'CPF';
  }

  if (isValidCNPJ(key)) {
    return 'CNPJ';
  }

  if ((key.length === 11 && !key.includes('@')) || isPhoneNumber(key)) {
    return 'PHONE';
  }

  return undefined;
}
