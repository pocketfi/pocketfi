import React from 'react'
import {Input, InputProps} from 'reactstrap'
import '../Input.sass'

export const EmailInput = (props: InputProps) => (
  <Input
    value={props.value}
    onChange={props.onChange}
    type='email'
    name='email'
    placeholder='Email'
  />
)
