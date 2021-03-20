import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import {SearchBar} from '../SearchBar/SearchBar'
import './Filters.sass'
import {IoMdCalendar, MdExpandLess, MdExpandMore} from 'react-icons/all'
import {DropdownMenu} from '../DropdownMenu/DropdownMenu'
import {Category} from '../../../types/Category'
import {DropdownOptions} from '../../../types/DropdownOptions'
import {CategoryColor} from '../../../types/CategoryColor'
import {TransactionType} from '../../../types/TransactionType'
import DatePicker from 'react-datepicker'
import {components} from 'react-select'
import {CategoryColorName} from '../../../types/CategoryColorName'

interface FiltersProps {
  categories: Category[]
  places: string[]
  search: (searchText?: string, transactionType?: string, category?: string, place?: string, startDate?: Date, endDate?: Date) => void
}

class Filters extends React.Component<FiltersProps> {

  state: any = {
    expanded: false,
    transactionType: '',
    category: '',
    place: '',
    categoryColor: '',
    typeColor: '',
    startDate: '',
    endDate: '',
    searchText: ''
  }

  handleClickOutside(): void {
    this.setState({expanded: false})
  }

  handleSearch(value?: string) {
    this.setState({searchText: value}, () => {
      this.props.search(this.state.searchText, this.state.transactionType, this.state.category.name, this.state.place, this.state.startDate, this.state.endDate)
    })
  }

  handleTypeChange(value: string) {
    this.setState({transactionType: value}, () => {
      value === 'income' ?
        this.setState({typeColor: '#52E071'}) :
        this.setState({typeColor: '#E05252'})
      this.props.search(this.state.searchText, this.state.transactionType.toLocaleUpperCase(), this.state.category.name, this.state.place, this.state.startDate, this.state.endDate)
    })
  }

  handleCategoryChange(value: string) {
    this.props.categories.forEach((category: Category) => {
      if (category.name === value) {
        this.setState({category: category})
        type CategoryColorType = keyof typeof CategoryColor
        this.setState({
          categoryColor: CategoryColor[category.color as CategoryColorType]
        }, () => {
          this.props.search(this.state.searchText, this.state.transactionType, this.state.category.name, this.state.place, this.state.startDate, this.state.endDate)
        })
      }
    })
  }

  handlePlaceChange(value: string) {
    this.setState({place: value}, () => {
      this.props.search(this.state.searchText, this.state.transactionType, this.state.category.name, this.state.place, this.state.startDate, this.state.endDate)
    })
  }

  handleSetStartDate(date: Date | [Date, Date] | null) {
    this.setState({startDate: date}, () => {
      this.props.search(this.state.searchText, this.state.transactionType, this.state.category.name, this.state.place, this.state.startDate, this.state.endDate)
    })
  }

  handleSetEndDate(date: Date | [Date, Date] | null) {
    this.setState({endDate: date}, () => {
      this.props.search(this.state.searchText, this.state.transactionType, this.state.category.name, this.state.place, this.state.startDate, this.state.endDate)
    })
  }

  render() {
    console.log(this.state.startDate)
    const transactionTypeOptions: DropdownOptions[] = [
      {label: TransactionType.INCOME.toLocaleLowerCase(), value: TransactionType.INCOME.toLocaleLowerCase()},
      {label: TransactionType.EXPENSE.toLocaleLowerCase(), value: TransactionType.EXPENSE.toLocaleLowerCase()}
    ]

    const categoryOptions: DropdownOptions[] = this.props.categories.map((category: Category) => {
      return {label: category.name, value: category.name}
    })

    const placeOptions: DropdownOptions[] = this.props.places.map((place: string) => {
      return {label: place, value: place}
    })

    const categoryCustomStyles = {
      option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isSelected ? this.state.categoryColor : 'none',
      }),
      control: (base: any) => ({
        ...base,
        borderRadius: '8px',
        borderStyle: 'none',
        boxShadow: 'none',
        borderColor: 'none',
        flexDirection: 'row-reverse'
      }),
      valueContainer: (base: any) => ({
        ...base,
        position: 'initial',
        padding: 0
      }),
      dropdownIndicator: (base: any) => ({
        ...base,
        padding: 0
      }),
      singleValue: (base: any) => ({
        ...base,
        color: this.state.categoryColor
      }),
      menuList: (base: any) => ({
        ...base,
        fontSize: 18,
        maxHeight: 280,
      }),
      menu: (base: any) => ({
        ...base,
        whiteSpace: 'nowrap',
        width: 'auto'
      }),
      input: (base: any) => ({
        ...base,
        margin: 0,
        padding: 0,
        width: 80,
        height: 30
      })
    }

    const typeCustomStyles = {
      option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isSelected ? this.state.typeColor : 'none',
      }),
      control: (base: any) => ({
        ...base,
        borderRadius: '8px',
        borderStyle: 'none',
        boxShadow: 'none',
        borderColor: 'none',
        flexDirection: 'row-reverse'

      }),
      valueContainer: (base: any) => ({
        ...base,
        position: 'initial',
        padding: 0
      }),
      dropdownIndicator: (base: any) => ({
        ...base,
        padding: 0
      }),
      singleValue: (base: any) => ({
        ...base,
        color: this.state.typeColor
      }),
      menuList: (base: any) => ({
        ...base,
        fontSize: 18,
        maxHeight: 280
      }),
      input: (base: any) => ({
        ...base,
        margin: 0,
        padding: 0,
        width: 80,
        height: 30
      })
    }

    const placeCustomStyles = {
      option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isSelected ? '#8052E0' : 'none',
      }),
      control: (base: any) => ({
        ...base,
        borderRadius: '8px',
        borderStyle: 'none',
        boxShadow: 'none',
        borderColor: 'none',
        flexDirection: 'row-reverse'
      }),
      valueContainer: (base: any) => ({
        ...base,
        position: 'initial',
        padding: 0
      }),
      dropdownIndicator: (base: any) => ({
        ...base,
        padding: 0
      }),
      singleValue: (base: any) => ({
        ...base,
        color: '#8052E0'
      }),
      menuList: (base: any) => ({
        ...base,
        fontSize: 18,
        maxHeight: 280
      }),
      menu: (base: any) => ({
        ...base,
        whiteSpace: 'nowrap',
        width: 'auto'
      }),
      input: (base: any) => ({
        ...base,
        margin: 0,
        padding: 0,
        width: 80,
        height: 30
      })
    }

    const typeDropdownIndicator = (props: any) => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            {this.state.transactionType === '' ? <MdExpandMore/> : <MdExpandLess/>}
          </components.DropdownIndicator>
        )
      )
    }

    const categoryDropdownIndicator = (props: any) => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            {this.state.category === '' ? <MdExpandMore/> : <MdExpandLess/>}
          </components.DropdownIndicator>
        )
      )
    }

    const placeDropdownIndicator = (props: any) => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            {this.state.place === '' ? <MdExpandMore/> : <MdExpandLess/>}
          </components.DropdownIndicator>
        )
      )
    }

    return (
      <div
        className={'filters' + (this.state.expanded ? ' expanded' : '')}
        onClick={() => this.setState({expanded: true})}
      >
        <div className='search-bar'>
          <SearchBar changeSearch={value => this.handleSearch(value)}/>
        </div>

        <div className={'filter type ' + this.state.transactionType}>
          <DropdownMenu
            placeholder='type'
            dropdownIndicator={typeDropdownIndicator}
            options={transactionTypeOptions}
            onChange={value => this.handleTypeChange(value)}
            customStyles={typeCustomStyles}
          />
        </div>

        <div className={'filter category ' + this.getCategoryColorClass()}>
          <DropdownMenu
            placeholder='category'
            dropdownIndicator={categoryDropdownIndicator}
            options={categoryOptions}
            onChange={value => this.handleCategoryChange(value)}
            customStyles={categoryCustomStyles}
          />
        </div>

        <div className={'filter place ' + this.getPurpleColorClass()}>
          <DropdownMenu
            placeholder='place'
            dropdownIndicator={placeDropdownIndicator}
            options={placeOptions}
            onChange={value => this.handlePlaceChange(value)}
            customStyles={placeCustomStyles}
          />
        </div>

        <div className={'filter from ' + (this.state.startDate ? 'category-color3' : '')}>
          <label>
            <IoMdCalendar/>
            <DatePicker
              selected={this.state.startDate}
              dateFormat="MMM d"
              maxDate={this.state.endDate}
              closeOnScroll={true}
              placeholderText={'from'}
              onChange={date => this.handleSetStartDate(date)}
              popperPlacement={'auto'}
            />
          </label>
        </div>

        <div className={'filter to ' + (this.state.endDate ? 'category-color3' : '')}>
          <label>
            <IoMdCalendar/>
            <DatePicker
              selected={this.state.endDate}
              dateFormat="MMM d"
              minDate={this.state.startDate}
              closeOnScroll={true}
              placeholderText='to'
              onChange={date => this.handleSetEndDate(date)}
              popperPlacement={'auto-end'}
            />
          </label>
        </div>
      </div>
    )
  }

  private getCategoryColorClass() {
    if (this.state.category) {
      return 'category-color' + CategoryColorName[this.state.category.color]
    }
    return ''
  }

  private getPurpleColorClass() {
    if (this.state.place) {
      return 'category-color3'
    }
    return ''
  }
}

export default enhanceWithClickOutside(Filters)
