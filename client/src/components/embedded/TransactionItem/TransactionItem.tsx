import React from 'react';
import './TransactionItem.sass'
import {CategoryColor} from '../../../types/CategoryColor';
import {GoPrimitiveDot, MdExpandLess, MdExpandMore} from 'react-icons/all';
import {TransactionType} from '../../../types/TransactionType';
import {Transaction} from '../../../types/Transaction';

interface TransactionItemProps {
  className?: string;
  transaction: Transaction;
}

class TransactionItem extends React.Component<TransactionItemProps> {
  static defaultProps = {
    className: ''
  };

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
      <div className={this.props.className}>
        <div className={'color-dot ' + color}>
          <GoPrimitiveDot/>
        </div>
        <p className='place'>{this.props.transaction.place || ''}</p>
        <div className={'price-container ' + this.props.transaction.transactionType.toLowerCase()}>
          {this.props.transaction.transactionType === TransactionType.INCOME ? <MdExpandLess/> : <MdExpandMore/>}
          <p className='price'>{this.props.transaction.price}</p>
          <p className='currency'>{this.props.transaction.currency}</p>
        </div>
      </div>
    );
  }
}

export default TransactionItem;