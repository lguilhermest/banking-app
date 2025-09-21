export function formatCurrency(
  value: number = 0,
  digits: number = 2,
  withPrefix: boolean = true,
  locale: string = 'pt-BR',
) {
  if (isNaN(value)) {
    value = 0;
  }

  let formatedValue = '';

  if (withPrefix) {
    formatedValue += locale !== 'pt-BR' ? 'BRL ' : 'R$ ';
  }

  formatedValue += Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);

  return formatedValue;
}

export function formatNumber(value: number = 0, locale: string = 'pt-BR') {
  return value.toLocaleString(locale);
}
