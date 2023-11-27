import { focusInstance } from '$atoms/accounts';
import { useAccountList } from '$hooks/useAccountList';
import AddServerFab from '$routes/home/components/AddServerFab';
import { Avatar } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import React, { FC } from 'react';

interface ISidebarProps {
  onChangeFocusInstance: (id: string) => void;
}

const Sidebar: FC<ISidebarProps> = ({ onChangeFocusInstance }) => {
  const { accountList } = useAccountList();
  const instance = useAtomValue(focusInstance);

  return (
    <div className="bg-darkColor w-[58px] flex items-center flex-col gap-[15px] p-[15px]">
      {accountList?.map((account) => {
        return (
          <Avatar
            isBordered={instance.id === account.instanceId}
            radius="md"
            key={account.id}
            className="cursor-pointer"
            color="success"
            onClick={() => onChangeFocusInstance(account.instanceId)}
            src={account.avatar}
          />
        );
      })}
      <AddServerFab />
    </div>
  );
};

export default Sidebar;
