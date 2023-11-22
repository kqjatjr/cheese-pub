import { useAccountList } from '$hooks/useAccountList';
import AddServerFab from '$routes/home/components/AddServerFab';
import { Avatar } from '@nextui-org/react';
import React, { FC } from 'react';

interface ISidebarProps {
  focusInstanceId?: string;
  onChangeFocusInstance: (id: string) => void;
}

const Sidebar: FC<ISidebarProps> = ({ focusInstanceId, onChangeFocusInstance }) => {
  const { accountList } = useAccountList();
  return (
    <div className="bg-darkColor w-[58px] flex items-center flex-col gap-[15px] p-[15px]">
      {accountList?.map((account) => {
        return (
          <Avatar
            isBordered={focusInstanceId === account.instanceId}
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
