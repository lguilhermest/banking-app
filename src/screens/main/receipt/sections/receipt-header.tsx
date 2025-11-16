import { formatCurrency, getTransactionType } from '@utils';
import { useTranslation } from 'react-i18next';
import { ReceiptStatus } from '../components';
import { Transaction } from '@types';
import { View } from 'react-native';
import { Text } from '@components';

export const ReceiptHeader = (props: { data: Transaction }) => {
  const { t } = useTranslation();
  return (
    <>
      <View style={{ gap: 6 }}>
        <Text variant="heading">
          {t(`common.transaction.${getTransactionType(props.data)}`)}
        </Text>
        <ReceiptStatus
          type={props.data?.owner?.status}
          value={t(`common.status.${props.data?.owner?.status}`)}
        />
      </View>

      <View style={{ gap: 4 }}>
        <Text variant="footnote">{t('receipt.amount')}</Text>
        <Text variant="heading">
          {formatCurrency(Math.abs(props.data?.amount))}
        </Text>
      </View>
    </>
  );
};
