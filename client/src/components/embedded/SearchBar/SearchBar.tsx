import React from 'react';
import './SearchBar.sass'
import {Input} from 'reactstrap';
import {debounce} from 'lodash'

interface SearchBarProps {
  changeSearch: (searchText: string) => void
}

export class SearchBar extends React.Component<SearchBarProps> {

  state: any = {
    query: ''
  }

  handleChange(searchText: string) {
    this.setState({query: searchText})
      this.debouncedSearch();
  }

  debouncedSearch = debounce(() => this.props.changeSearch(this.state.query), 250)

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
