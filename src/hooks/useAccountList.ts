import { Instance, accountsAtom } from '$atoms/accounts';
import { useAtomValue } from 'jotai';
import generator from 'megalodon';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '$queryKey/keys';

const getAccountData = async (instances: Instance[]) => {
  const accountList = await Promise.all(
    instances.map(async (instance) => {
      const client = generator(instance.type, instance.url, instance.accessToken);
      const { data } = await client.verifyAccountCredentials();
      return { ...data, instanceId: instance.id };
    }),
  );
  return accountList;
};

export const useAccountList = () => {
  const instances = useAtomValue(accountsAtom);
  const { data } = useQuery([QUERY_KEY.GET_ACCOUNT], () => getAccountData(instances), {
    suspense: true,
  });

  return {
    accountList: data,
    getAccount: (instance: Instance) => data?.find((item) => item.instanceId === instance.id),
  };
};
