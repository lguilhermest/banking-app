import { formatCurrency, formatDate, getTransactionType } from '@utils';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Icon, Text } from '@components';
import { Transaction } from '@types';
import { ThemeType } from '@theme';
import { useTheme } from '@hooks';

export interface HomeTransactionsProps {
  data: Transaction[];
  onTransactionPress?: (transaction: Transaction) => void;
}

export const HomeTransactions = (props: HomeTransactionsProps) => {
  const { t } = useTranslation();
  const inset = useSafeAreaInsets();
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Text align="center" variant="subheading" style={styles.title}>
        {t('main.home.transactions.title')}
      </Text>

      {props.data.length > 0 ? (
        <View>
          {props.data.map(transaction => (
            <TouchableHighlight
              key={transaction.id}
              underlayColor={theme.colors.secondaryLight}
              onPress={() => props.onTransactionPress?.(transaction)}
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
                      ? 'success'
                      : 'danger'
                  }
                  size={16}
                />

                <Text style={{ flex: 1 }}>
                  {t(
                    `common.transaction.${getTransactionType(transaction)}`,
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

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: theme.colors.foreground,
      borderRadius: 20,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      paddingHorizontal: theme.sizes.lg,
      paddingVertical: theme.sizes.md,
    },
    transaction: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.sizes.lg,
      paddingVertical: theme.sizes.sm,
      gap: theme.sizes.md,
    },
    description: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  });
