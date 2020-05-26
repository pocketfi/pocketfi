import React from 'react';
import './TransactionItem.sass'
import {CategoryColor} from '../../../types/CategoryColor';
import {TransactionType} from '../../../types/TransactionType';
import {Transaction} from '../../../types/Transaction';
import enhanceWithClickOutside from 'react-click-outside';
import TextareaAutosize from 'react-textarea-autosize';
import {FaCalendar, FaTrash, GoPrimitiveDot, MdExpandLess, MdExpandMore} from 'react-icons/all';


interface TransactionItemProps {
  expanded?: boolean;
  transaction: Transaction;
  onDelete: () => void;
}

class TransactionItem extends React.Component<TransactionItemProps> {
  static defaultProps = {
    expanded: false
  };

  state = {
    expanded: this.props.expanded,
    description: ''
  }

  handleClickOutside() {
    this.setState({expanded: false})
  }

  render() {
    let color = ''

    if (this.props.transaction.category) {
      // @ts-ignore
      color = 'color' + CategoryColor[this.props.transaction.category.color]
    }

    if (this.props.transaction.transactionType === TransactionType.INCOME) {
      color = 'color' + CategoryColor['GREEN'];
    }

    return (
      <div className='transaction'>
        <div className={(this.state.expanded ? 'transaction-preview' : 'transaction-item')}
             onClick={() => this.setState({expanded: true})}
        >
          <div className={'color-dot'}><GoPrimitiveDot className={color || 'other-dot'}/></div>
          <p className='place'>{this.props.transaction.place}</p>
          <div className={'price-container ' + this.props.transaction.transactionType.toLowerCase()}>
            {this.props.transaction.transactionType === TransactionType.INCOME ? <MdExpandLess/> : <MdExpandMore/>}
            <p className='price'>{this.props.transaction.price}</p>
            <p className='currency'>{this.props.transaction.currency}</p>
          </div>
          <div className={'category ' + (color || 'other-category')}>
            {
              this.props.transaction.category
                ? this.props.transaction.category.name
                : 'Other'
            }
          </div>
          <TextareaAutosize
            className='description'
            placeholder='Description'
            value={this.state.description}
            onChange={e => this.setState({description: e.target.value})}
          />
          <div className='actions'>
            <FaTrash className='delete' onClick={() => this.props.onDelete()}/>
            <FaCalendar className='move'/>
          </div>
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(TransactionItem);