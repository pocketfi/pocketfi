import React from 'react';
import './SearchBar.sass'
import {Input} from 'reactstrap';

interface SearchBarProps {
  changeSearch: (searchText: string) => void
}

export class SearchBar extends React.Component<SearchBarProps> {

  state: any = {
    query: ''
  }

  handleChange(searchText: string) {
    this.setState({query: searchText})
      this.props.changeSearch(searchText);
  }

  render() {
    return (
      <div className='search-bar'>
        <Input
          placeholder='Search'
          value={this.state.query}
          onChange={e => this.handleChange(e.target.value)}
        />
      </div>
    );
  }

}
