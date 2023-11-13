import { Instance } from '$atoms/accounts';
import { Avatar } from '@nextui-org/react';
import generator from 'megalodon';
import React, { FC, useEffect, useState } from 'react';

interface ISidebarProps {
  accountList: Entity.Account[];
}

const Sidebar: FC<ISidebarProps> = ({ accountList }) => {
  return (
    <div className="bg-darkColor w-[58px] flex items-center flex-col gap-[15px] p-[15px]">
      {accountList.map((account) => {
        return <Avatar isBordered radius="md" key={account.id} color="success" src={account.avatar} />;
      })}
    </div>
  );
};

export default Sidebar;
