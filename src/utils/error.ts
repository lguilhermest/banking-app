export function getErrorMessage(e: any): string {
  if (typeof e === 'string') {
    return e;
  }

  return (
    e?.response?.data?.message ||
    e.code ||
    e.message ||
    'unexpected error'
  );
}

export function getErrorCode(error: any): string {
  if (error?.response?.data?.errorCode) {
    return error.response.data.errorCode;
  }

  const message = getErrorMessage(error).toLowerCase();

  const codes: Record<string, string> = {
    'invalid credentials': 'AUT001',
    'invalid pix key': 'PIX001',
    'pix key already registered': 'PIX002',
    'max allowed pix keys': 'PIX003',
    'maximum login attempts reached': 'MAX001',
    'invalid mfa code': 'MFA001',
    'mfa not registered': 'MFA002',
    'multifactor authentication not configured': 'MFA002',
    'invalid ip address': 'AKY001',
    'an existing onboarding is already in progress': 'ONB002',
    'server error': 'SRV000',
  };

  const found = Object.entries(codes).find(([key]) =>
    message.includes(key.toLowerCase()),
  );

  return found ? found[1] : 'APP000';
}
