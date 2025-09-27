import { TransactionsWithOwners } from '@types';

export function getTransactionType(transaction: TransactionsWithOwners) {
  if (transaction.owner_type === 'Core\\Models\\PixPayment') {
    if (transaction.fee > 0) {
      return 'pix_out_refund';
    }

    if (transaction.amount > 0) {
      return 'pix_in';
    }

    return 'pix_out';
  }

  if (transaction.owner_type === 'Core\\Models\\PixRefund') {
    return 'pix_refund';
  }

  return 'pix_in';
}
