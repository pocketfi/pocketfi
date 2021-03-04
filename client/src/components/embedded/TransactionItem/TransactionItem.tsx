import React from 'react'
import './TransactionItem.sass'
import {TransactionType} from '../../../types/TransactionType'
import {Transaction} from '../../../types/Transaction'
import enhanceWithClickOutside from 'react-click-outside'
import TextareaAutosize from 'react-textarea-autosize'
import {FaCalendar, FaTrash, GoPrimitiveDot, MdExpandLess, MdExpandMore} from 'react-icons/all'
import {Text} from '../Text/Text'
import {CategoryColorName} from '../../../types/CategoryColorName'


interface TransactionItemProps {
  transaction: Transaction;
  onDelete?: () => void;
  onChange?: (transaction: Transaction) => void;
}

interface TransactionItemState {
  transactionType: string;
  expanded: boolean;
  price: number;
  description: string;
  currency: string;
  place: string;
  categoryName: string
}

class TransactionItem extends React.Component<TransactionItemProps> {
  static defaultProps = {
    onDelete: () => {},
    onChange: () => {}
  }

  state: TransactionItemState = {
    expanded: false,
    transactionType: this.props.transaction.transactionType,
    categoryName: this.props.transaction.category ? this.props.transaction.category.name : 'Other',
    place: this.props.transaction.place,
    price: this.props.transaction.price,
    currency: this.props.transaction.currency,
    description: this.props.transaction.description || '',
  }

  handleClickOutside(): void {
    this.setState({expanded: false})
  }

  changeTransaction(transactionChange: {}): void {
    const category = this.props.transaction.category
    if (category) {
      category.name = this.state.categoryName
    }
    this.setState(transactionChange, () => {
      const transaction = new Transaction(
        this.props.transaction.id,
        this.state.transactionType,
        category,
        this.state.place,
        this.state.price,
        this.state.currency,
        this.props.transaction.created,
        this.state.description
      )
      this.props.onChange!(transaction)
    })
  }

  render() {
    const colorClass = this.getCategoryColorClass()

    return (
      <div className='transaction'>
        <div className={(this.state.expanded ? 'transaction-preview' : 'transaction-item')}
             onClick={() => this.setState({expanded: true})}
        >
          <div className={'color-dot'}>
            <GoPrimitiveDot className={colorClass || 'other-dot'}/>
          </div>

          <div className='category-wrapper'>
            <Text
              className={'category ' + (colorClass || 'other-category')}
              editable={this.state.expanded}
              value={this.state.categoryName}
              onChange={categoryName => this.changeTransaction({categoryName: categoryName})}
            />
          </div>

          <Text
            className='place'
            editable={this.state.expanded}
            value={this.state.place}
            onChange={place => this.changeTransaction({place: place})}
          />

          <div className={'price-container ' + this.state.transactionType.toLowerCase()}>
            {this.state.transactionType === TransactionType.INCOME ? <MdExpandLess/> : <MdExpandMore/>}
            <Text
              className='price'
              editable={this.state.expanded}
              value={this.state.price.toString()}
              onChange={price => this.changeTransaction({price: +price})}
            />
            <Text
              className='currency'
              editable={this.state.expanded}
              value={this.state.currency}
              onChange={currency => this.changeTransaction({currency: currency})}
            />
          </div>

          <TextareaAutosize
            className='description'
            placeholder='Description'
            value={this.state.description}
            onChange={e => this.changeTransaction({description: e.target.value})}
          />

          <div className='actions'>
            <FaTrash className='delete' onClick={() => this.props.onDelete!()}/>
            <FaCalendar className='move'/>
          </div>
        </div>
      </div>
    )
  }

  private getCategoryColorClass() {
    if (this.props.transaction.category) {
      return 'color' + CategoryColorName[this.props.transaction.category.color as any]
    }
    if (this.state.transactionType === TransactionType.INCOME) {
      return 'color' + CategoryColorName['GREEN']
    }
    return ''
  }
}

export default enhanceWithClickOutside(TransactionItem)
