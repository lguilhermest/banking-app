import { PixConfirmPaymentSchemaT } from './pix-confirm-payment.schema';
import { useState } from 'react';

export function usePixConfirm() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(data: PixConfirmPaymentSchemaT) {
    console.log(data);
  }

  return { handleSubmit, loading };
}
