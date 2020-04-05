import React from 'react';
import _ from 'lodash';
import {FaCircle} from 'react-icons/all';
import './ListDots.sass'

export interface ActiveDotsProps {
  size: number;
  active?: number;
  onClick?: (index: number) => void
}

export const ListDots = ({
                           active = 0,
                           onClick = () => {},
                           ...props
                         }: ActiveDotsProps) => (
  <div className='dots'>
    {_.range(0, props.size).map(i =>
      <FaCircle
        className={'dot ' + (i === active ? 'active' : '')}
        onClick={() => onClick(i)}
        key={i}
      />
    )}
  </div>
);

