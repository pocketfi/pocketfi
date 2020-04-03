import React from 'react';
import './Text.sass'

export class TextProps {
  value: string = ''
}

export const Text = (props: TextProps) => (
  <p className='text'>
    {props.value}
  </p>
);
