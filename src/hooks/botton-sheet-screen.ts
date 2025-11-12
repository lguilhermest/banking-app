import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';

export function useBottomSheetScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function getRef(ref: BottomSheetModal) {
    bottomSheetRef.current = ref;
  }

  function close() {
    bottomSheetRef.current?.close();
  }

  return {
    getRef,
    close,
  };
}
