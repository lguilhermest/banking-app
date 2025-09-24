import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, Text } from '@components';
import { formatCurrency } from '@utils';
import { Theme } from '@theme';
import { useTranslation } from 'react-i18next';

export const HomeBalance = (
  props: {
    isVisible: boolean;
    value: number;
    onToggle: () => void;
  },
) => {
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <View>
        <Text variant="footnote">{t('main.home.balance')}</Text>
        <Text variant="heading">
          {props.isVisible ? formatCurrency(props.value) : '••••••••'}
        </Text>
      </View>

      <Pressable onPress={props.onToggle}>
        <Icon name={props.isVisible ? 'eye' : 'eye_slash'} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 12,
    padding: 16,
  },
});
