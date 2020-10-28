import React from 'react'
import './Transactions.sass'
import {connect} from 'react-redux';
import {AppState} from '../../../store';
import {Transaction} from '../../../types/Transaction';
import {TransactionList} from '../../embedded/TransactionList/TransactionList';
import {SearchBar} from '../../embedded/SearchBar/SearchBar';
import {deleteTransaction, getTransactions, search, updateTransaction} from '../../../actions/transactionAction';

export interface TransactionsProps {
  transactions: Transaction[]
  foundTransactions: Transaction[]
  transactionsFoundByCategory: Transaction[]

  getTransactions(): void

  deleteTransaction(id: string): void

  updateTransaction(transaction: Transaction): void

  search(searchText: string): void
}

class Transactions extends React.Component<TransactionsProps> {
  constructor(props: TransactionsProps) {
    super(props)
    this.props.getTransactions()
  }

  handleDeleteTransaction(id: string) {
    this.props.deleteTransaction(id);
  }

  handleEditTransaction(transaction: Transaction) {
    this.props.updateTransaction(transaction);
  }

  handleSearch(searchText: string) {
    this.props.search(searchText)
  }

  render() {
    let transactions = this.props.transactions
    let foundTransactions = this.props.foundTransactions
    let transactionsFoundByCategory = this.props.transactionsFoundByCategory

    if (foundTransactions.length && transactionsFoundByCategory.length) {
      transactions = []
      foundTransactions.forEach(transaction => transactions.push(transaction))
      transactionsFoundByCategory.forEach(transaction => {
        if (!transactions.find(t => t.id === transaction.id))
          transactions.push(transaction)
      })
    } else if (transactionsFoundByCategory.length && foundTransactions.length === 0)
      transactions = transactionsFoundByCategory
    else if (transactionsFoundByCategory.length === 0 && foundTransactions.length)
      transactions = foundTransactions
    return (
      <div className='transactions'>
        <SearchBar
          changeSearch={searchText => this.handleSearch(searchText)}
        />
        <TransactionList
          transactions={transactions}
          onDelete={id => this.handleDeleteTransaction(id)}
          onChange={transaction => this.handleEditTransaction(transaction)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  transactions: state.transaction.transactions,
  foundTransactions: state.transaction.foundTransactions,
  transactionsFoundByCategory: state.transaction.transactionsFoundByCategory
});

export default connect(mapStateToProps, {getTransactions, deleteTransaction, updateTransaction, search})(Transactions);
