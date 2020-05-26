import React from 'react';
import './TransactionItem.sass'
import {CategoryColor} from "../../../types/CategoryColor";
import {GoPrimitiveDot, MdExpandLess, MdExpandMore} from "react-icons/all";
import {TransactionType} from "../../../types/TransactionType";
import {Transaction} from "../../../types/Transaction";

interface TransactionItemProps {
  className?: string;
  transaction: Transaction;
}

class TransactionItem extends React.Component<TransactionItemProps> {
  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <div className={this.props.className}>
        <div className={(this.props.transaction.category) ? ('color' +
          // @ts-ignore
          CategoryColor[this.props.transaction.category.color]) : ''}><GoPrimitiveDot/></div>
        {(this.props.transaction.category) ? this.props.transaction.category.name : ''}
        <div className={(this.props.transaction.transactionType === TransactionType.EXPENSE) ?
          TransactionType.EXPENSE.toLowerCase() :
          TransactionType.INCOME.toLowerCase()}>
          {(this.props.transaction.transactionType === TransactionType.INCOME) ?
            <MdExpandLess/> : <MdExpandMore/>}
          {this.props.transaction.price + ' ' + this.props.transaction.currency}
        </div>
      </div>
    );
  }
}

export default TransactionItem;