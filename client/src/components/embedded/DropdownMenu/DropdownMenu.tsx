import React from 'react'
import Select from 'react-select'

interface DropdownMenuProps {
  options: []

  onChange(value: any): void

  placeholder: string

  customStyles: any
}

export class DropdownMenu extends React.Component<DropdownMenuProps> {

  handleChange = (selection: any) => {
    this.props.onChange(selection.value)
  }

  render() {
    return (
      <div>
        <Select
          styles={this.props.customStyles}
          placeholder={this.props.placeholder}
          options={this.props.options}
          components={{DropdownIndicator: () => null, IndicatorSeparator: () => null}}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
