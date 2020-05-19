import React from 'react';
import './TransactionItem.sass'
import {CategoryColor} from "../../../types/CategoryColor";
import {GoPrimitiveDot, MdExpandLess, MdExpandMore} from "react-icons/all";
import {TransactionType} from "../../../types/TransactionType";
import {Transaction} from "../../../types/Transaction";
import {AppState} from "../../../store";
import {connect} from "react-redux";
import {Rate} from "../../../types/Rate";

interface TransactionItemProps {
  rates: Rate[]
  className?: string;
  transaction: Transaction;
}

class TransactionItem extends React.Component<TransactionItemProps> {
  static defaultProps = {
    className: ''
  };

  render() {
    console.log(this.props.transaction)
    const USD = this.props.rates.find(rate => {
      return rate.code === 'USD'
    })
    const currency = this.props.rates.find(rate => rate.code === this.props.transaction.currency)
    return (
      <div className={this.props.className}>
        <div className={(this.props.transaction.category) ? ('color' +
        // @ts-ignore
        CategoryColor[this.props.transaction.category.color]): ''}><GoPrimitiveDot/></div>
        {(this.props.transaction.category) ? this.props.transaction.category.name : ''}
        <div
          className={(this.props.transaction.transactionType === TransactionType.EXPENSE) ? 'expense' : 'income'}>{(this.props.transaction.transactionType === TransactionType.INCOME) ?
          <MdExpandLess/> : <MdExpandMore/>}
          {(this.props.transaction.currency === 'USD') ? this.props.transaction.price + '$' : (
            (USD && currency) ? ((this.props.transaction.price * USD.value /
              currency.value).toFixed(2) + '$') : '')}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state: AppState) => ({
  // @ts-ignore
  rates: state.rate.rates
});

export default connect(mapStateToProps)(TransactionItem);