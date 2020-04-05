import React from 'react'
import {OverviewBanner} from '../../embedded/OverviewBanner/OverviewBanner';
import './Overview.sass'
import {Separator} from '../../embedded/Separator/Separator';
import {MenuItem} from '../../embedded/MenuItem/MenuItem';
import {IoIosCalendar, MdAttachMoney, MdNotInterested, MdShowChart} from 'react-icons/all';

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

export class OverviewProps {
}

class Overview extends React.Component<OverviewProps> {

  render() {
    const cards = [
      {
        type: OverviewCardType.DAY,
        total: 8.72,
        averageDelta: 0
      },
      {
        type: OverviewCardType.WEEK,
        total: 123.03,
        averageDelta: -30
      },
      {
        type: OverviewCardType.MONTH,
        total: 283.10,
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
          <MenuItem className='transactions' icon={<MdAttachMoney/>} title='Transactions'/>
          <MenuItem className='limits' icon={<MdNotInterested/>} title='Limits'/>
          <MenuItem className='analytics' icon={<MdShowChart/>} title='Analytics'/>
          <MenuItem className='calendar' icon={<IoIosCalendar/>} title='Calendar'/>
        </div>
      </div>
    );
  }
}

export default Overview;
