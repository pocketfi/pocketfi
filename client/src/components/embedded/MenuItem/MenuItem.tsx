import React, {ReactNode} from 'react'
import './MenuItem.sass'
import {Title} from '../Title/Title'
import {RouteComponentProps, withRouter} from 'react-router-dom'

interface MenuItemProps extends RouteComponentProps {
  icon: ReactNode;
  title: string;
  className?: string;
  route?: string;
}

class MenuItem extends React.Component<MenuItemProps> {
  static defaultProps = {
    className: ''
  }

  render() {
    return (
      <div
        className={'menu-item ' + this.props.className}
        onClick={() => this.props.route && this.props.history.push(this.props.route)}
      >
        {this.props.icon}
        <Title value={this.props.title}/>
      </div>
    )
  }
}

export default withRouter(MenuItem)
