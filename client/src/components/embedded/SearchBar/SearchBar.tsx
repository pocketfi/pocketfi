import React from 'react';
import './SearchBar.sass'
import {Input} from 'reactstrap';

export class SearchBar extends React.Component {

  render() {
    return (
      <div className='search-bar'>
        <Input placeholder='Search'/>
      </div>
    );
  }

}
