import React from 'react';
import {Button, Form, Input} from 'reactstrap';
import {connect} from 'react-redux';
import './NewTransaction.sass'
import {Switcher} from '../../embedded/Switcher/Switcher';

export interface NewTransactionProps {
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
    currency: '$'
  };

  handleSubmit() {
    console.log(this.state);
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

export default connect(mapStateToProps)(NewTransaction);
