import React from 'react'
import './OverviewBanner.sass'
import {ListDots} from '../ListDots/ListDots';
import {OverviewCard} from '../OverviewCard/OverviewCard';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/all';

export interface OverviewPriceBannerProps {
  activeCard?: number;
  cards: any[]
}

interface OverviewPriceBannerState {
  activeCard: number;
}

export class OverviewBanner extends React.Component<OverviewPriceBannerProps> {

  static defaultProps = {
    activeCard: 0
  };

  state: OverviewPriceBannerState = {
    activeCard: this.props.activeCard || 0
  };

  handleChangeCard(e: React.WheelEvent<HTMLDivElement>) {
    this.setState({
      activeCard: this.getNextCardIndex(e.deltaY)
    })
  }

  render() {
    return (
      <div className='banner' onWheel={e => this.handleChangeCard(e)}>
        <div className='card-container'>
          <div className='previous button' onClick={() => this.setState({activeCard: this.getNextCardIndex(-1)})}>
            <MdKeyboardArrowLeft/>
          </div>
          <OverviewCard
            card={this.props.cards[this.state.activeCard]}
          />
          <div className='next button' onClick={() => this.setState({activeCard: this.getNextCardIndex(1)})}>
            <MdKeyboardArrowRight/>
          </div>
        </div>
        <ListDots
          active={this.state.activeCard}
          size={this.props.cards.length}
          onClick={i => this.setState({activeCard: i})}
        />
      </div>
    )
  }

  private getNextCardIndex(direction: number) {
    const nextUnbounded = this.state.activeCard + (direction > 0 ? 1 : -1);
    return nextUnbounded < 0
      ? this.props.cards.length - 1
      : nextUnbounded % this.props.cards.length;
  }

}
