import React from 'react';
import {Button, Form, Input} from 'reactstrap';
import {connect} from 'react-redux';
import './NewTransaction.sass'
import {Switcher} from '../../embedded/Switcher/Switcher';
import {DropdownMenu} from '../../embedded/DropdownMenu/DropdownMenu';
import {Transaction} from "../../../types/Transaction";
import * as actions from '../../../actions/transactionAction';
import store from "../../../store";

export interface NewTransactionProps {
  newTransaction(transaction: Transaction): void;
}

enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME'
}

class NewTransaction extends React.Component<NewTransactionProps> {

  state: any = {
    transactionType: TransactionType.EXPENSE,
    category: '',
    place: '',
    price: '0.00',
    currency: '$',
    placeholder: 'USD',
    // @ts-ignore
    codeRates: store.getState().rate.codeRates
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
            <DropdownMenu placeholder={this.state.placeholder} options={this.state.codeRates} onChange={value => this.setState({currency: value})}/>
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
