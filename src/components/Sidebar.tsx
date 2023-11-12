import { Instance } from '$atoms/accounts';
import { Avatar } from '@nextui-org/react';
import generator from 'megalodon';
import React, { FC, useEffect, useState } from 'react';

interface ISidebarProps {
  instances: Instance[];
}

const Sidebar: FC<ISidebarProps> = ({ instances }) => {
  const [accountList, setAccountList] = useState<Entity.Account[]>([]);

  const getAccountData = async (instance: Instance) => {
    const client = generator(instance.type, instance.url, instance.accessToken);
    const { data } = await client.verifyAccountCredentials();
    setAccountList((prev) => [...prev, data]);
  };

  useEffect(() => {
    instances.forEach((instance) => {
      getAccountData(instance);
    });
  }, [instances]);

  return (
    <div className="bg-darkColor w-[58px] flex items-center flex-col gap-[15px] p-[15px]">
      {accountList.length
        ? accountList.map((account) => {
            return <Avatar isBordered radius="md" key={account.id} src={account.avatar} />;
          })
        : instances.map((instance) => {
            return <Avatar isBordered radius="md" key={instance.id} />;
          })}
    </div>
  );
};

export default Sidebar;
