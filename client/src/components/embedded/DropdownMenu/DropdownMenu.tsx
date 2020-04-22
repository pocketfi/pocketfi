import React from 'react';
import Select from "react-select";

interface DropdownMenuProps {
  options: [];
  onChange(value: any): void;
  placeholder: string;
}

export class DropdownMenu extends React.Component<DropdownMenuProps> {

  handleChange = (selection: any) => {
    this.props.onChange(selection.value);
  };

  render() {
    const customStyles = {
      control: (base: any) => ({
        ...base,
        'background-color': '#f1f1f1',
        'border-radius': '8px',
        'border-style': 'none'
      }),
      valueContainer: (base: any) => ({
        ...base,
        position: 'initial'
      }),
      menuList: (base: any) => ({
        ...base,
        'font-size': 14,
        height: 200
      }),
      input: (base: any) => ({
        ...base,
        margin: 0,
        padding: 0,
        width: 50,
        height: 30
      })
    };
    return (
      <div>
        <Select
          styles={customStyles}
          placeholder={this.props.placeholder}
          options={this.props.options}
          components={{DropdownIndicator: () => null, IndicatorSeparator:() => null}}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}