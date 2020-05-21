import React from 'react'
import './TransactionsList.sass'
import {connect} from 'react-redux';
import {getTransactions} from '../../../actions/transactionAction';
import {AppState} from '../../../store';
import {Transaction} from '../../../types/Transaction';
import {SeparatorWithDate} from '../../embedded/SeparatorWithDate/SeparatorWithDate';
import moment from 'moment';
import TransactionItem from '../../embedded/TransactionItem/TransactionItem';

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
    const transactionDates = this.props.transactions
      .map((transaction: Transaction, i: number) =>
        moment(transaction.created).format('MMM D')
      )
      .reverse()
    return (
      <div className='transaction-list'>
        {
          this.props.transactions.reverse().map((transaction: Transaction, i: number) => {
              const transactionItem = <TransactionItem className='transaction-item' transaction={transaction}/>;

              if (i === 0) {
                return <>
                  <SeparatorWithDate value={transactionDates[i]}/>
                  {transactionItem}
                </>
              }

              if (i !== transactionDates.length - 1 && transactionDates[i + 1] !== transactionDates[i]) {
                return <>
                  {transactionItem}
                  <SeparatorWithDate value={transactionDates[i + 1]}/>
                </>
              }

              return transactionItem;
            }
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
