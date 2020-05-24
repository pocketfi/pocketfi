import React from 'react'
import './TransactionList.sass'
import {Transaction} from '../../../types/Transaction';
import {SeparatorWithDate} from '../SeparatorWithDate/SeparatorWithDate';
import moment from 'moment';
import TransactionItem from '../../embedded/TransactionItem/TransactionItem';

export interface TransactionListProps {
  transactions: Transaction[]
}

export class TransactionList extends React.Component<TransactionListProps> {
  render() {
    const transactionDates = this.props.transactions
      .map((transaction: Transaction) =>
        moment(transaction.created).format('MMM D')
      )
      .reverse()
    return (
      <div className='transaction-list'>
        {
          this.props.transactions.reverse().map((transaction: Transaction, i: number) => {
              const transactionItem = <TransactionItem transaction={transaction} key={i}/>;

              if (i === 0 || transactionDates[i] !== transactionDates[i - 1]) {
                return <>
                  <SeparatorWithDate value={transactionDates[i]} key={`sep${i}`}/>
                  {transactionItem}
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

