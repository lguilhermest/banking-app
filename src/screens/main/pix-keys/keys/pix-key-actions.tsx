import { StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal, Icon, Text } from '@components';
import { useTheme } from '@hooks';
import { ThemeType } from '@theme';
import { useTranslation } from 'react-i18next';

export const PixKeyActions = (props: {
  visible?: boolean;
  onDismiss?: () => void;
  title?: string;
  onShare?: () => void;
  onDelete?: () => void;
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <BottomSheetModal
      visible={props.visible}
      onDismiss={props.onDismiss}
      title={props.title}
    >
      <TouchableOpacity
        style={styles.action}
        activeOpacity={0.8}
        onPress={props.onShare}
      >
        <Icon name="share_fat" />
        <Text>{t('common.share')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.action}
        activeOpacity={0.8}
        onPress={props.onDelete}
      >
        <Icon color="danger" name="trash" />
        <Text color="danger">{t('common.delete')}</Text>
      </TouchableOpacity>
    </BottomSheetModal>
  );
};

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.sizes.lg,
      borderColor: theme.colors.border,
      padding: theme.sizes.md,
    },
    cardContent: {
      flex: 1,
      justifyContent: 'space-between',
      gap: theme.sizes.xs,
    },
    action: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.sizes.lg,
      paddingVertical: theme.sizes.md,
    },
  });
