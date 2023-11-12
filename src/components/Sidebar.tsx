import { Instance } from '$atoms/accounts';
import { Avatar } from '@nextui-org/react';
import React, { FC } from 'react';

interface ISidebarProps {
  instances: Instance[];
}

const Sidebar: FC<ISidebarProps> = ({ instances }) => {
  console.log(instances);
  return (
    <div className="bg-darkColor w-[58px] flex items-center flex-col gap-[15px] p-[15px]">
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
    </div>
  );
};

export default Sidebar;
