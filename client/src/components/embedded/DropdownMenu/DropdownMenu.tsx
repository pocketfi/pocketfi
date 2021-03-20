import React from 'react'
import Select from 'react-select'
import {DropdownOptions} from '../../../types/DropdownOptions'

interface DropdownMenuProps {
  options: DropdownOptions[]
  onChange: (value: any) => void
  placeholder: string
  customStyles: any
  dropdownIndicator?: any
}

export class DropdownMenu extends React.Component<DropdownMenuProps> {

  handleChange = (selection: any) => {
    this.props.onChange(selection.value)
  }

  render() {
    return (
      <Select
        styles={this.props.customStyles}
        placeholder={this.props.placeholder}
        options={this.props.options}
        components={{
          DropdownIndicator: this.props.dropdownIndicator ? this.props.dropdownIndicator : () => null,
          IndicatorSeparator: () => null
        }}
        onChange={this.handleChange}
      />
    )
  }
}
