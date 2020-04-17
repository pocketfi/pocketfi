import React from 'react';
import {Button, Form, Input} from 'reactstrap';
import {connect} from 'react-redux';
import './NewTransaction.sass'
import {Switcher} from '../../embedded/Switcher/Switcher';
import {Transaction} from "../../../types/Transaction";
import * as actions from '../../../actions/transactionAction';

export interface NewTransactionProps {
  getRate(): void;
  newTransaction(transaction: Transaction): void;
}

enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME'
}

class NewTransaction extends React.Component<NewTransactionProps> {
  constructor(props: NewTransactionProps) {
    super(props);
    this.getRate();
  }

  state: any = {
    transactionType: TransactionType.EXPENSE,
    category: '',
    place: '',
    price: '0.00',
    currency: '$',
    currencyRate: {}
  };

  getRate = () => {
    fetch('https://api.exchangeratesapi.io/latest')
      .then(res => {
        res.json().then(data => {
          console.log('rates', data.rates);
          this.setState({currencyRate: data.rates})
        })
      })
  };

  handleSubmit() {
    console.log(this.state);
    const transaction = new Transaction(
      this.state.transactionType,
      this.state.category,
      this.state.place,
      this.state.price,
      this.state.currency);
    console.log(transaction);
    this.props.newTransaction(transaction)
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
            <Input
              className='currency'
              value={this.state.currency}
              onChange={e => this.setState({currency: e.target.value})}
              placeholder="$"
            />
          </div>
          <Button
            className={this.state.transactionType.toLowerCase()}
            onClick={() => this.handleSubmit()}>
            Add
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps, actions)(NewTransaction);
