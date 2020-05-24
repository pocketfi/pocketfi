import React from 'react'
import './Transactions.sass'
import {connect} from 'react-redux';
import {getTransactions} from '../../../actions/transactionAction';
import {AppState} from '../../../store';
import {Transaction} from '../../../types/Transaction';
import {TransactionList} from '../../embedded/TransactionList/TransactionList';
import {SearchBar} from '../../embedded/SearchBar/SearchBar';

export interface TransactionsProps {
  transactions: Transaction[]

  getTransactions(): void
}

class Transactions extends React.Component<TransactionsProps> {
  constructor(props: TransactionsProps) {
    super(props);
    this.getTransactions()
  }

  getTransactions() {
    this.props.getTransactions();
  }

  render() {
    return (
      <div className='transactions'>
        <SearchBar/>
        <TransactionList
          transactions={this.props.transactions}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  // @ts-ignore
  transactions: state.transaction.transactions
});

export default connect(mapStateToProps, {getTransactions})(Transactions);
