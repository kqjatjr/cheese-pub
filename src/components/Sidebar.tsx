import AddServerFab from '$routes/home/components/AddServerFab';
import { Avatar } from '@nextui-org/react';
import React, { FC } from 'react';

interface ISidebarProps {
  accountList: Entity.Account[];
}

const Sidebar: FC<ISidebarProps> = ({ accountList }) => {
  return (
    <div className="bg-darkColor w-[58px] flex items-center flex-col gap-[15px] p-[15px]">
      {accountList.map((account) => {
        return <Avatar isBordered radius="md" key={account.id} color="success" src={account.avatar} />;
      })}
      <AddServerFab />
    </div>
  );
};

export default Sidebar;
