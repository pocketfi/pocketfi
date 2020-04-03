import React from 'react';
import './Title.sass'

export class TextProps {
  value: string = ''
}

export const Title = (props: TextProps) => (
  <p className='title'>
    {props.value}
  </p>
);
