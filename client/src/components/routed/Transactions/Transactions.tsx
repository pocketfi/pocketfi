import React from 'react'
import './Transactions.sass'
import {connect} from 'react-redux';
import {AppState} from '../../../store';
import {Transaction} from '../../../types/Transaction';
import {TransactionList} from '../../embedded/TransactionList/TransactionList';
import {SearchBar} from '../../embedded/SearchBar/SearchBar';
import {deleteTransaction, getTransactions, updateTransaction} from '../../../actions/transactionAction';
import {AuthState} from "../../../types/AuthState";
import {RouteComponentProps} from "react-router-dom";

export interface TransactionsProps extends RouteComponentProps, AuthState {
  transactions: Transaction[]

  getTransactions(): void

  deleteTransaction(id: string): void

  updateTransaction(transaction: Transaction): void
}

class Transactions extends React.Component<TransactionsProps> {
  constructor(props: TransactionsProps) {
    super(props);
    this.props.getTransactions();
  }

  handleDeleteTransaction(id: string) {
    this.props.deleteTransaction(id);
  }

  handleEditTransaction(transaction: Transaction) {
    this.props.updateTransaction(transaction);
  }

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login')
    }
    return (
      <div className='transactions'>
        <SearchBar/>
        <TransactionList
          transactions={this.props.transactions}
          onDelete={id => this.handleDeleteTransaction(id)}
          onChange={transaction => this.handleEditTransaction(transaction)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  // @ts-ignore
  transactions: state.transaction.transactions,
  // @ts-ignore
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getTransactions, deleteTransaction, updateTransaction})(Transactions);
