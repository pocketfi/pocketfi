import React from 'react'
import './Text.sass'
import ContentEditable from 'react-contenteditable'

export interface TextProps {
  editable?: boolean;
  value?: string;
  className?: string;
  onChange?: (value: string) => void
}

export class Text extends React.Component<TextProps> {
  static defaultProps = {
    editable: false,
    value: '',
    className: '',
    onChange: () => {}
  }

  state = {
    value: this.props.value
  }

  handleValueChange(value: string) {
    this.props.onChange!(value)
    this.setState({value: value})
  }

  render() {
    return (
      this.props.editable
        ? <ContentEditable
          className={this.props.className + ' editable-text'}
          html={(this.state.value as string)}
          onChange={e => this.handleValueChange(e.target.value)}
        />
        : <p className={this.props.className}>{this.props.value}</p>
    )
  }
}
