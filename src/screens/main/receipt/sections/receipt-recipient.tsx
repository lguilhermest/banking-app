import { ReceiptItem, ReceiptSection } from '../components';
import { useTranslation } from 'react-i18next';
import { formatDocument } from '@utils';
import { PixPayment } from '@types';

export const ReceiptRecipient = (props: { data: PixPayment }) => {
  const { t } = useTranslation();
  return (
    <ReceiptSection label={t('main.receipt.recipient.label')}>
      <ReceiptItem
        label={t('main.receipt.recipient.name')}
        value={props.data?.recipient_name}
      />
      <ReceiptItem
        label={t('main.receipt.recipient.document')}
        value={formatDocument(props.data?.recipient_document_number)}
      />
      <ReceiptItem
        label={t('main.receipt.recipient.bank')}
        value={props.data?.recipient_participant?.name}
      />
      <ReceiptItem
        label={t('main.receipt.recipient.branch')}
        value={props.data?.recipient_account_branch}
      />
      <ReceiptItem
        label={t('main.receipt.recipient.account')}
        value={props.data?.recipient_account_number}
      />
    </ReceiptSection>
  );
};
