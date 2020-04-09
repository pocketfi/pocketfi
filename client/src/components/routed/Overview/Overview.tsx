import React from 'react'
import {OverviewBanner} from '../../embedded/OverviewBanner/OverviewBanner';
import './Overview.sass'
import {Separator} from '../../embedded/Separator/Separator';
import {IoIosCalendar, MdAdd, MdAttachMoney, MdNotInterested, MdSettings, MdShowChart} from 'react-icons/all';
import {Button} from 'reactstrap';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import MenuItem from '../../embedded/MenuItem/MenuItem';

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

export default withRouter(Overview);
