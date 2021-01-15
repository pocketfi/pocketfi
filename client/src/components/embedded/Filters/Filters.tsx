import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import {SearchBar} from '../SearchBar/SearchBar'
import {Text} from '../Text/Text'
import './Filters.sass'
import {IoMdCalendar, MdExpandMore} from 'react-icons/all'
import {DropdownMenu} from '../DropdownMenu/DropdownMenu'

interface FiltersProps {

  search(searchText: string): void
}

class Filters extends React.Component<FiltersProps> {

  state: any = {
    expanded: false,
    transactionTypes: [{label: 'income', value: 'INCOME'}, {label: 'expense', value: 'EXPENSE'}],
    transactionType: '',
    customStyles: {
      control: (base: any) => ({
        ...base,
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
        width: 100,
        height: 30
      })
    }
  }

  handleClickOutside(): void {
    this.setState({expanded: false})
  }

  handleSearch(searchText: string) {
    this.props.search(searchText)
  }

  render() {

    return (
      <div className='filters'>

        <div className={(this.state.expanded ? 'filters-preview' : 'filters-item')}
             onClick={() => this.setState({expanded: true})}
        >
          <div className='search-bar'>
            <SearchBar
              changeSearch={searchText => this.handleSearch(searchText)}
            />
          </div>

          <div className={'type'}>
            <MdExpandMore/>
            <DropdownMenu
              placeholder='type'
              options={this.state.transactionTypes}
              onChange={value => this.setState({transactionType: value})}
              customStyles={this.state.customStyles}/>
          </div>

          <div className='category'>
            <MdExpandMore/>
            <Text value='category'/>
          </div>

          <div className='place'>
            <MdExpandMore/>
            <Text value='place'/>
          </div>

          <div className='from'>
            <IoMdCalendar/>
            <Text value='from'/>
          </div>

          <div className='to'>
            <IoMdCalendar/>
            <Text value='to'/>
          </div>
        </div>
      </div>
    )
  }

}


export default enhanceWithClickOutside(Filters)