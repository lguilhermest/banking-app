import { formatCurrency, formatDate, getTransactionType } from '@utils';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TransactionsWithOwners } from '@types';
import { useTranslation } from 'react-i18next';
import { Icon, Text } from '@components';
import { Theme } from '@theme';
import { useTheme } from '@hooks';

export interface HomeTransactionsProps {
  data: TransactionsWithOwners[];
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
}

export const HomeTransactions = (props: HomeTransactionsProps) => {
  const { t } = useTranslation();
  const inset = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Text align="center" variant="subheading">
        {t('main.home.transactions.title')}
      </Text>

      {props.data.length > 0 ? (
        <View>
          {props.data.map(transaction => (
            <TouchableHighlight
              key={transaction.id}
              underlayColor={Theme.colors.secondary}
            >
              <View style={styles.transaction}>
                <Icon
                  name={
                    transaction.amount > 0
                      ? 'arrow_circle_down'
                      : 'arrow_circle_up'
                  }
                  color={
                    transaction.amount > 0
                      ? Theme.colors.danger
                      : Theme.colors.success
                  }
                  size={16}
                />

                <Text style={{ flex: 1 }}>
                  {t(
                    `main.common.transaction.${getTransactionType(transaction)}`,
                  )}
                </Text>

                <View style={styles.description}>
                  <Text>{formatCurrency(transaction.amount)}</Text>
                  <Text variant="caption" color="secondary">
                    {formatDate(transaction.datetime, 'dd/MM')}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      ) : (
        <View style={[styles.content]}>
          <Text align="center" variant="subheading" color="secondary">
            {t('main.home.transactions.empty')}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Theme.colors.foreground,
    padding: Theme.sizes.lg,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignSelf: 'center',
    height: 6,
    width: 60,
    borderRadius: Theme.sizes.md,
    backgroundColor: Theme.colors.border,
    marginVertical: Theme.sizes.md,
  },
  group: {
    paddingVertical: Theme.sizes.md,
    gap: Theme.sizes.xs,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.sizes.md,
    gap: Theme.sizes.md,
  },
  description: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});
