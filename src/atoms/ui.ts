import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';
import { SetStateAction } from 'react';
import { LocalStorageKey } from '$constants/localStorage';

type StorageUiState = {
  defaultAccountId?: string;
};

type InMemoryUiState = {
  selectedAccountId?: string;
};

type GlobalUi = StorageUiState & InMemoryUiState;

const storageUiAtom = atomWithStorage<StorageUiState>(LocalStorageKey.StorageUiState, { defaultAccountId: undefined });
const inMemoryUiAtom = atom<InMemoryUiState>({ selectedAccountId: undefined });

export const globalUiAtom = atom(
  (get) => ({
    ...get(storageUiAtom),
    ...get(inMemoryUiAtom),
  }),
  (get, set, update: SetStateAction<GlobalUi>) => {
    const prevValue = get(globalUiAtom);

    const newValue = typeof update === 'function' ? update(prevValue) : update;

    const { defaultAccountId, ...rest } = newValue;
    set(storageUiAtom, { defaultAccountId });
    set(inMemoryUiAtom, rest);
  },
);
