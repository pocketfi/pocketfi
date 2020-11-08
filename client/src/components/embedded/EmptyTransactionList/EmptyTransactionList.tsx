import React from 'react'
import './EmptyTransactionList.sass'
import {FaWallet} from 'react-icons/all'

export interface EmptyTransactionListProps {
  bySearch: boolean
}

export class EmptyTransactionList extends React.Component<EmptyTransactionListProps> {

  render() {
    return (
      <div className='empty-transaction-list'>
        <FaWallet/>
        {this.props.bySearch ?
          <p>No transactions match the search</p> :
          <p>No transactions</p>
        }
      </div>
    )
  }

}

