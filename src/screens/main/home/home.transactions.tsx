import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Icon, Text } from '@components';
import { StyleSheet, View } from 'react-native';
import { Theme } from '@theme';
import { useTranslation } from 'react-i18next';

export interface HomeTransactionsProps {
  data: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
}

export const HomeTransactions = (props: HomeTransactionsProps) => {
  const inset = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: inset.bottom + Theme.sizes.lg },
      ]}
    >
      <View style={styles.header} />
      <Text variant="subheading">{t('main.home.transactions.title')}</Text>

      {props.data.length > 0 ? (
        <View style={styles.content}>
          {props.data.map(transaction => (
            <View key={transaction.id}>
              <Text>{transaction.amount}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View
          style={[
            styles.content,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
        >
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
    flex: 1,
    backgroundColor: Theme.colors.foreground,
    padding: Theme.sizes.lg,
    paddingTop: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    flex: 1,
  },
  header: {
    alignSelf: 'center',
    height: 6,
    width: 60,
    borderRadius: Theme.sizes.md,
    backgroundColor: Theme.colors.border,
    marginVertical: Theme.sizes.md,
  },
});
