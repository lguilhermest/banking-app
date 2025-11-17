import { IconName } from '@components';
import { PixKeyType } from '@types';
import { t } from 'i18next';

export const PIX_KEY_TYPE_ICONS: Record<PixKeyType, IconName> = {
  EVP: 'key',
  EMAIL: 'mail',
  DOCUMENT: 'document',
  PHONE: 'phone',
  CPF: 'user',
  CNPJ: 'building',
};

export const PIX_KEY_TYPES: Array<{ label: string; value: PixKeyType }> = [
  {
    label: t('common.pix_key_type.EVP'),
    value: 'EVP',
  },
  {
    label: t('common.pix_key_type.EMAIL'),
    value: 'EMAIL',
  },
  {
    label: t('common.pix_key_type.DOCUMENT'),
    value: 'DOCUMENT',
  },
  {
    label: t('common.pix_key_type.PHONE'),
    value: 'PHONE',
  },
  {
    label: 'CPF',
    value: 'CPF',
  },
  {
    label: 'CNPJ',
    value: 'CNPJ',
  },
];
