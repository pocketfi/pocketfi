import React from 'react'
import './Transactions.sass'
import {connect} from 'react-redux';
import {AppState} from '../../../store';
import {Transaction} from '../../../types/Transaction';
import {TransactionList} from '../../embedded/TransactionList/TransactionList';
import {SearchBar} from '../../embedded/SearchBar/SearchBar';
import {deleteTransaction, getTransactions} from '../../../actions/transactionAction';

export interface TransactionsProps {
  transactions: Transaction[]

  getTransactions(): void

  deleteTransaction(id: string): void
}

class Transactions extends React.Component<TransactionsProps> {
  constructor(props: TransactionsProps) {
    super(props);
    this.props.getTransactions()
  }

  handleDeleteTransaction(id: string) {
    this.props.deleteTransaction(id)
  }

  render() {
    return (
      <div className='transactions'>
        <SearchBar/>
        <TransactionList
          transactions={this.props.transactions}
          onDelete={id => this.handleDeleteTransaction(id)}
        />
      </div>
    )
  }

}

const mapStateToProps = (state: AppState) => ({
  // @ts-ignore
  transactions: state.transaction.transactions
});

export default connect(mapStateToProps, {getTransactions, deleteTransaction})(Transactions);
