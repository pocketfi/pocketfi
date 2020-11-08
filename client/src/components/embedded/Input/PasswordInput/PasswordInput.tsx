import React from 'react'
import {Input, InputProps} from 'reactstrap'
import '../Input.sass'

export const PasswordInput = (props: InputProps) => (
  <Input
    value={props.value}
    onChange={props.onChange}
    type='password'
    name='password'
    placeholder={props.placeholder || 'Password'}
  />
)
