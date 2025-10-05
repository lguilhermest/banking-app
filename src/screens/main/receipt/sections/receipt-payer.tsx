import { ReceiptItem, ReceiptSection } from '../components';
import { useTranslation } from 'react-i18next';
import { formatDocument } from '@utils';
import { PixPayment } from '@types';

export const ReceiptPayer = (props: { data: PixPayment }) => {
  const { t } = useTranslation();
  return (
    <ReceiptSection label={t('main.receipt.payer.label')}>
      <ReceiptItem
        label={t('main.receipt.payer.name')}
        value={props.data?.payer_name}
      />
      <ReceiptItem
        label={t('main.receipt.payer.document')}
        value={formatDocument(props.data?.payer_document_number)}
      />
      <ReceiptItem
        label={t('main.receipt.payer.bank')}
        value={props.data?.payer_participant?.name}
      />
      <ReceiptItem
        label={t('main.receipt.payer.branch')}
        value={props.data?.payer_account_branch}
      />
      <ReceiptItem
        label={t('main.receipt.payer.account')}
        value={props.data?.payer_account_number}
      />
    </ReceiptSection>
  );
};
