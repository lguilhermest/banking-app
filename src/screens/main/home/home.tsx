import { Dialog, Screen } from '@components';
import { useHome } from './home.hook';

export function HomeScreen() {
  const home = useHome();

  return (
    <Screen>
      <Dialog
        visible={home.showAskBiometric}
        onConfirm={home.enableBiometric}
        onCancel={home.disableBiometric}
        title="Ativar Biometria?"
        message={`Deseja usar o ${home.biometricType} para entrar mais rápido no app?`}
        confirmText="Ativar"
        cancelText="Agora não"
      />
    </Screen>
  );
}
