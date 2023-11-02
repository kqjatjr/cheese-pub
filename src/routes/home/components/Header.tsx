import React, { FC } from 'react';

interface IHeaderProps {
  title: string;
}

const Header: FC<IHeaderProps> = ({ title }) => {
  return (
    <div className="bg-mainColor h-[48px] w-screen pl-[20px] pr-[20px] flex items-center">
      <span className="text-cheese text-[24px] leading-[48px] font-title">{title}</span>
    </div>
  );
};

export default Header;
