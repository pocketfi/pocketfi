import React from 'react'
import {Button, Form, Input} from 'reactstrap'
import {connect} from 'react-redux'
import './NewTransaction.sass'
import {Switcher} from '../../embedded/Switcher/Switcher'
import {DropdownMenu} from '../../embedded/DropdownMenu/DropdownMenu'
import {AppState} from '../../../store'
import {newTransaction} from '../../../actions/transactionAction'
import {CreateTransaction} from '../../../types/CreateTransaction'
import {TransactionType} from '../../../types/TransactionType'
import {RouteComponentProps} from 'react-router-dom'

export interface NewTransactionProps extends RouteComponentProps {
  newTransaction(transaction: CreateTransaction): void;

  codeRates: [];
}

class NewTransaction extends React.Component<NewTransactionProps> {

  state: any = {
    transactionType: TransactionType.EXPENSE,
    category: '',
    place: '',
    price: '0.00',
    currency: 'USD',
    placeholder: 'USD',
    customStyles: {
      control: (base: any) => ({
        ...base,
        backgroundColor: '#f1f1f1',
        borderRadius: '8px',
        borderStyle: 'none'
      }),
      valueContainer: (base: any) => ({
        ...base,
        position: 'initial'
      }),
      menuList: (base: any) => ({
        ...base,
        fontSize: 14,
        height: 200
      }),
      input: (base: any) => ({
        ...base,
        margin: 0,
        padding: 0,
        width: 50,
        height: 30
      })
    }
  }


  handleSubmit() {
    const transaction = new CreateTransaction(
      this.state.transactionType,
      this.state.category,
      this.state.place,
      this.state.price,
      this.state.currency)
    this.props.newTransaction(transaction)
    this.props.history.push('/overview')
  }

  render() {
    return (
      <div className='new-transaction'>
        {/*TODO: back button*/}
        <Form>
          <Switcher
            switched={this.state.transactionType === TransactionType.INCOME}
            onChange={(switched) => this.setState({transactionType: switched ? TransactionType.EXPENSE : TransactionType.INCOME})}
            option1='Expense'
            option2='Income'
          />
          <Input
            value={this.state.category}
            onChange={e => this.setState({category: e.target.value})}
            id='category'
            className={this.state.transactionType === TransactionType.INCOME ? 'hidden' : ''}
            placeholder="Category"
          />
          <Input
            value={this.state.place}
            onChange={e => this.setState({place: e.target.value})}
            placeholder="Place"
          />
          <div className='price-container'>
            {/*TODO: better price input handling (regex?)*/}
            <Input
              className='price'
              value={this.state.price}
              onChange={e => this.setState({price: e.target.value})}
              placeholder="0.00"
            />
            <DropdownMenu
              placeholder={this.state.placeholder}
              options={this.props.codeRates}
              onChange={value => this.setState({currency: value})}
              customStyles={this.state.customStyles}
            />
          </div>
          <Button
            className={this.state.transactionType.toLowerCase()}
            onClick={() => this.handleSubmit()}>
            Add
          </Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  // @ts-ignore
  codeRates: state.rate.codeRates
})

export default connect(mapStateToProps, {newTransaction})(NewTransaction)
