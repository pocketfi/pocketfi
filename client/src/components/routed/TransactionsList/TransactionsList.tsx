import React from 'react'
import './TransactionsList.sass'
import {connect} from "react-redux";
import {getTransactions} from "../../../actions/transactionAction";
import {AppState} from "../../../store";
import {Transaction} from "../../../types/Transaction";
import {SeparatorWithDate} from "../../embedded/SeparatorWithDate/SeparatorWithDate";
import moment from "moment";
import TransactionItem from "../../embedded/TransactionItem/TransactionItem";

export interface TransactionListProps {
  getTransactions(): void
  transactions: Transaction[]
}

class Overview extends React.Component<TransactionListProps> {
  constructor(props: TransactionListProps) {
    super(props);
    this.getTransactions()
  }

  getTransactions() {
    this.props.getTransactions();
  }

  render() {
    const transactionDates = this.props.transactions.map((transaction: Transaction) =>
      moment(transaction.created).format("MMM D")
    ).reverse()
    return (
      <div className='transaction-list'>
        {
          this.props.transactions.reverse().map((transaction: Transaction, i: number) =>
            (i === 0) ? [
                <SeparatorWithDate value={transactionDates[i]}/>,
                <TransactionItem className={'category'} transaction={transaction}/>] :
              (i !== transactionDates.length - 1 && transactionDates[i + 1] !== transactionDates[i]) ?
                [<TransactionItem className={'category'} transaction={transaction}/>,
                  <SeparatorWithDate value={transactionDates[i + 1]}/>] :
                <TransactionItem className={'category'} transaction={transaction}/>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  // @ts-ignore
  transactions: state.transaction.transactions
});

export default connect(mapStateToProps, {getTransactions})(Overview);
