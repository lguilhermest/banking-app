import { useAsyncAction, useAuth } from '@hooks';
import { Share } from 'react-native';
import { useState } from 'react';
import { PixKey } from '@types';
import api from '@api';

export function usePixKeys() {
  const auth = useAuth();
  const [selectedKey, setSelectedKey] = useState<PixKey>();
  const [showDelete, setShowDelete] = useState(false);

  const deleteKey = useAsyncAction(async (key: PixKey) => {
    await api.delete(`/pix_keys/${key.value}`);
    await auth.fetchAccountData();
    setShowDelete(false);
    setSelectedKey(undefined);
  });

  function handleShareKey(key: PixKey) {
    Share.share({
      message: key.value,
    });
  }

  return {
    loadingAction: deleteKey.loading,
    keys: auth.state.account.pix_keys,
    handleShareKey,
    deleteKey: () => deleteKey.execute(selectedKey as PixKey),
    isDeleting: deleteKey.loading,
    showDelete,
    setShowDelete,
    selectedKey,
    setSelectedKey,
  };
}
