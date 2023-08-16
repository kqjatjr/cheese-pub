import { atomWithStorage, selectAtom } from 'jotai/utils';
import { atom, useAtom, useAtomValue } from 'jotai';
import { ServiceType } from '$constants/activityPub';
import { LocalStorageKey } from '$constants/localStorage';
import { useCallback } from 'react';

export type Instance = {
  id: string;
  type: ServiceType;
  url: string;
  accessToken: string;
};

export const accountsAtom = atomWithStorage<Instance[]>(LocalStorageKey.Account, []);

export const addAccountAtom = atom(null, (get, set, instance: Instance) => {
  const accounts = get(accountsAtom);
  set(accountsAtom, [...accounts, instance]);
});

export const useAccountAtom = (id?: string) => {
  return id
    ? useAtomValue(
        selectAtom(
          accountsAtom,
          useCallback((instance) => instance.find((v) => v.id === id), [id]),
        ),
      )
    : undefined;
};
