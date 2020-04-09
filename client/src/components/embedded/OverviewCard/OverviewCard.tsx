import React from 'react';
import './OverviewCard.sass'
import {Card, OverviewCardType} from '../../routed/Overview/Overview';
import {Text} from '../Text/Text';
import {Title} from '../Title/Title';

export interface OverviewCardProps {
  card: Card
}

export class OverviewCard extends React.Component<OverviewCardProps> {
  render() {
    const {card} = this.props;
    return (
      <div className='card'>
        <Text
          className='type'
          value={`spent ${card.type === OverviewCardType.DAY ? 'today' : 'this ' + card.type}`}
        />
        <Title
          className='total'
          value={card.total.toFixed(2) + '$'}
        />
        {(card.averageDelta != null && card.averageDelta !== 0) && <Text
          className={`average ${card.averageDelta > 0 ? 'spent-more' : 'spent-less'}`}
          value={`${Math.abs(card.averageDelta)}% ${card.averageDelta > 0 ? 'more' : 'less'} than average`}
        />}
      </div>
    );
  }
}

