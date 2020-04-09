import React from 'react';
import './Switcher.sass'

interface SwitcherProps {
  switched: boolean;
  option1: string;
  option2: string;
  onChange: (switched: boolean) => void;
}

export class Switcher extends React.Component<SwitcherProps> {
  render() {
    return (
      <div
        className='switch'
        onClick={() => this.props.onChange(this.props.switched)}
      >
        <div className={'option1 option ' + (!this.props.switched ? 'active' : '')}>{this.props.option1}</div>
        <div className={'option2 option ' + (this.props.switched ? 'active' : '')}>{this.props.option2}</div>
        <div className={'slider ' + (this.props.switched ? 'position2' : 'position1')}/>
      </div>
    );
  }
}
