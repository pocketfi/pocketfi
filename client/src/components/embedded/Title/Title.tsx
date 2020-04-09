import React from 'react';
import './Title.sass'
import {TextProps} from '../Text/Text';

export const Title = ({value = '', className = ''}: TextProps) => (
  <p className={'title ' + className}>{value}</p>
);
