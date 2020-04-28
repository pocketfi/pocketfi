import React from 'react'
import {OverviewBanner} from '../../embedded/OverviewBanner/OverviewBanner';
import './Overview.sass'
import {Separator} from '../../embedded/Separator/Separator';
import {IoIosCalendar, MdAdd, MdAttachMoney, MdNotInterested, MdSettings, MdShowChart} from 'react-icons/all';
import {Button} from 'reactstrap';
import {RouteComponentProps} from 'react-router-dom';
import MenuItem from '../../embedded/MenuItem/MenuItem';
import {connect} from "react-redux";
import {getTransactions} from "../../../actions/transactionAction";
import {AppState} from "../../../store";
import {Transaction} from "../../../types/Transaction";
import {Rate} from "../../../types/Rate";

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

export interface OverviewProps extends RouteComponentProps {
  getTransactions(): void
  transactions: Transaction[]
  rates: Rate[]
}

class Overview extends React.Component<OverviewProps> {
  constructor(props:OverviewProps) {
    super(props);
    this.getTransactions()
  }
  state: any = {
    spentDay: 0,
    spentWeek: 0,
    spentMonth: 0
  }

  getTransactions(){
    this.props.getTransactions();
  }

  render() {
    const transactions = this.props.transactions;
    const USD = this.props.rates.find(rate => {
      return rate.key === 'USD'
    })
    let spentDay = 0;
    let spentWeek = 0;
    let spentMonth = 0;
    let today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    transactions.forEach(transaction => {
      let price = transaction.price;
      if (transaction.currency !== 'USD'){
        const currency = this.props.rates.find(rate => {
          return rate.key === transaction.currency
        })
        if (currency && USD ){
        price = transaction.price * USD.value / currency.value
        }
      }
      const transactionCreated = new Date(transaction.created);
      console.log(transaction.price)
      if (transactionCreated.getFullYear() === today.getFullYear() && transactionCreated.getMonth() === today.getMonth() && transactionCreated.getDate() === today.getDate()){
        spentDay += price;
      }
      if (transactionCreated > lastWeek){
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
          <MenuItem className='transactions' icon={<MdAttachMoney/>} title='Transactions' route='/transactions'/>
          <MenuItem className='limits' icon={<MdNotInterested/>} title='Limits' route='/limits'/>
          <MenuItem className='analytics' icon={<MdShowChart/>} title='Analytics' route='/analytics'/>
          <MenuItem className='calendar' icon={<IoIosCalendar/>} title='Calendar' route='/calendar'/>
          <MenuItem className='settings' icon={<MdSettings/>} title='Settings' route='/settings'/>
        </div>
        <div className='button-wrapper'>
          <Button
            children={<MdAdd/>}
            title='New transaction'
            onClick={() => {
              console.log('new!');
              this.props.history.push('/new');
            }}
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
  rates: state.rate.rates
});

export default connect(mapStateToProps,{getTransactions})(Overview);
