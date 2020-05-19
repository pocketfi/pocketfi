import React from 'react'
import './TransactionsList.sass'
import {connect} from "react-redux";
import {getTransactions} from "../../../actions/transactionAction";
import {AppState} from "../../../store";
import {Transaction} from "../../../types/Transaction";
import {SeparatorWithDate} from "../../embedded/SeparatorWithDate/SeparatorWithDate";
import moment from "moment";
import {Rate} from "../../../types/Rate";
import TransactionItem from "../../embedded/TransactionItem/TransactionItem";

export interface TransactionListProps {
  getTransactions(): void
  rates: Rate[]
  transactions: Transaction[]
}

class Overview extends React.Component<TransactionListProps> {
  constructor(props: TransactionListProps) {
    super(props);
    this.getTransactions()
  }

  state: any = {
    transactionDates: [],
    USD: ''
  }

  getTransactions() {
    this.props.getTransactions();

  }

  render() {
    console.log(this.props.rates)
    if (this.props.transactions.length>8) this.props.transactions.splice(0,this.props.transactions.length-6)

    const transactionDates = this.props.transactions.map((transaction: Transaction, i: number) =>
      moment(transaction.created).format("MMM DD")
    )
    return (
      <div className='transaction-list'>
        <SeparatorWithDate value={transactionDates.reverse()[0]}/>
        {
          this.props.transactions.reverse().map((transaction: Transaction, i: number) =>
            (i + 1 < transactionDates.length && transactionDates[i + 1] !== transactionDates[i]) ?
              [<TransactionItem className={'category'} transaction={transaction}/>,
                <SeparatorWithDate value={transactionDates[i + 1]}/>
              ] :
              // @ts-ignore
              <TransactionItem className={'category'} transaction={transaction}/>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  // @ts-ignore
  transactions: state.transaction.transactions,
  // @ts-ignore
  rates: state.rate.rates
});

export default connect(mapStateToProps, {getTransactions})(Overview);
