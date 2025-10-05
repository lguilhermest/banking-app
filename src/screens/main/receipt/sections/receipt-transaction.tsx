import { ReceiptItem, ReceiptSection } from '../components';
import { useTranslation } from 'react-i18next';
import { Transaction } from '@types';
import { formatDate } from '@utils';

export const ReceiptTransaction = (props: { data: Transaction }) => {
  const { t } = useTranslation();
  return (
    <ReceiptSection label={t('main.receipt.transaction.label')}>
      <ReceiptItem
        label={t('main.receipt.transaction.date')}
        value={formatDate(props.data.datetime)}
      />
      <ReceiptItem
        label={t('main.receipt.transaction.id')}
        value={props.data.owner.end_to_end_id}
      />
    </ReceiptSection>
  );
};
