import React, {ReactNode} from 'react';
import {Title} from '../Title/Title';
import './MenuItem.sass'

interface MenuItemProps {
  icon: ReactNode;
  title: string;
  className?: string;
}

export const MenuItem = ({
                           icon,
                           title,
                           className = ''
                         }: MenuItemProps) => (
  <div className={'menu-item ' + className}>
    {icon}
    <Title value={title}/>
  </div>
);
