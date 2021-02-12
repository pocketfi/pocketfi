import React from 'react'
import './Transactions.sass'
import {connect} from 'react-redux'
import {AppState} from '../../../store'
import {Transaction} from '../../../types/Transaction'
import {TransactionList} from '../../embedded/TransactionList/TransactionList'
import {
  deleteTransaction,
  getPlaces,
  getTransactions,
  search,
  updateTransaction
} from '../../../actions/transactionAction'
import {EmptyTransactionList} from '../../embedded/EmptyTransactionList/EmptyTransactionList'
import {getCategories} from '../../../actions/categoryActions'
import {Category} from '../../../types/Category'

export interface TransactionsProps {
  transactions: Transaction[]
  foundTransactions: Transaction[] | null
  transactionsFoundByCategory: Transaction[]
  getCategories: (categoryName: string) => void
  getPlaces: (place: string) => void
  getTransactions: () => void
  deleteTransaction: (id: string) => void
  updateTransaction: (transaction: Transaction) => void
  search: (searchText?: string, transactionType?: string, category?: string, place?: string, startDate?: Date, endDate?: Date) => void
  categories: Category[]
  places: string[]
}

class Transactions extends React.Component<TransactionsProps> {
  constructor(props: TransactionsProps) {
    super(props)
    this.props.getTransactions()
    this.props.getCategories(this.state.categoryName)
    this.props.getPlaces(this.state.place)
  }

  state: any = {
    categoryName: '',
    place: ''
  }

  handleDeleteTransaction(id: string) {
    this.props.deleteTransaction(id)
  }

  handleEditTransaction(transaction: Transaction) {
    this.props.updateTransaction(transaction)
  }

  handleGetCategories(categoryName: string) {
    this.props.getCategories(categoryName)
  }

  render() {
    const transactions = this.props.foundTransactions || this.props.transactions
    const isSearchActive = !!this.props.foundTransactions
    return (
      <div className='transactions'>
        {
          transactions.length !== 0 ?
            <TransactionList
              categories={this.props.categories}
              places={this.props.places}
              transactions={transactions}
              search={this.props.search}
              onDelete={id => this.handleDeleteTransaction(id)}
              onChange={transaction => this.handleEditTransaction(transaction)}
            /> :
            <EmptyTransactionList bySearch={isSearchActive}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  transactions: state.transaction.transactions,
  foundTransactions: state.transaction.foundTransactions,
  transactionsFoundByCategory: state.transaction.transactionsFoundByCategory,
  categories: state.category.categories,
  places: state.transaction.places
})

export default connect(mapStateToProps, {
  getTransactions,
  deleteTransaction,
  updateTransaction,
  search,
  getCategories,
  getPlaces
})(Transactions)
