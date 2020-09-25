import React from 'react'
import {OverviewBanner} from '../../embedded/OverviewBanner/OverviewBanner';
import './Overview.sass'
import {Separator} from '../../embedded/Separator/Separator';
import {IoIosCalendar, MdAdd, MdAttachMoney, MdNotInterested, MdSettings, MdShowChart} from 'react-icons/all';
import {Button} from 'reactstrap';
import MenuItem from '../../embedded/MenuItem/MenuItem';
import {connect} from 'react-redux';
import {getTransactions} from '../../../actions/transactionAction';
import {AppState} from '../../../store';
import {Transaction} from '../../../types/Transaction';
import {Rate} from '../../../types/Rate';
import {TransactionType} from '../../../types/TransactionType';
import {RouteComponentProps} from 'react-router-dom';
import {AuthState} from "../../../types/AuthState";

export enum OverviewCardType {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month'
}

export interface Card {
  type: OverviewCardType;
  total: number;
  averageDelta?: number;
}

export interface OverviewProps extends RouteComponentProps, AuthState {
  getTransactions(): void

  transactions: Transaction[]
  rates: Rate[]
}

class Overview extends React.Component<OverviewProps> {
  constructor(props: OverviewProps) {
    super(props);
    this.getTransactions()
  }

  state: any = {
    spentDay: 0,
    spentWeek: 0,
    spentMonth: 0
  }

  getTransactions() {
    this.props.getTransactions();
  }

  render() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login')
    }
    // TODO: refactor. Move cards calculation to separate method
    const transactions = this.props.transactions.filter(transaction => transaction.transactionType === TransactionType.EXPENSE);
    const USD = this.props.rates.find(rate => {
      return rate.code === 'USD'
    })
    let spentDay = 0;
    let spentWeek = 0;
    let spentMonth = 0;
    let today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    transactions.forEach((transaction: Transaction) => {
      let price = transaction.price;
      if (transaction.currency !== 'USD') {
        const currency = this.props.rates.find(rate => {
          return rate.code === transaction.currency
        })
        if (currency && USD) {
          price = transaction.price * USD.value / currency.value
        }
      }
      const transactionCreated = new Date(transaction.created);
      if (transactionCreated.getFullYear() === today.getFullYear() && transactionCreated.getMonth() === today.getMonth() && transactionCreated.getDate() === today.getDate()) {
        spentDay += price;
      }
      if (transactionCreated > lastWeek) {
        spentWeek += price;
      }
      spentMonth += price;
    })

    const cards = [
      {
        type: OverviewCardType.DAY,
        total: spentDay,
        averageDelta: 0
      },
      {
        type: OverviewCardType.WEEK,
        total: spentWeek,
        averageDelta: -30
      },
      {
        type: OverviewCardType.MONTH,
        total: spentMonth,
        averageDelta: 12
      }
    ];

    return (
      <div className='overview'>
        <OverviewBanner
          cards={cards}
        />
        <Separator/>
        <div className='menu'>
          <MenuItem className='transactions-item' icon={<MdAttachMoney/>} title='Transactions' route='/transactions'/>
          <MenuItem className='limits-item' icon={<MdNotInterested/>} title='Limits' route='/limits'/>
          <MenuItem className='analytics-item' icon={<MdShowChart/>} title='Analytics' route='/analytics'/>
          <MenuItem className='calendar-item' icon={<IoIosCalendar/>} title='Calendar' route='/calendar'/>
          <MenuItem className='settings-item' icon={<MdSettings/>} title='Settings' route='/settings'/>
        </div>
        <div className='button-wrapper'>
          <Button
            children={<MdAdd/>}
            title='New transaction'
            onClick={() => { this.props.history.push('/new');}}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  // @ts-ignore
  transactions: state.transaction.transactions,
  // @ts-ignore
  rates: state.rate.rates,
  // @ts-ignore
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getTransactions})(Overview);
