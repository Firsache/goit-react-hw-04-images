import { Component } from 'react';
import { Header, Form, Input, Btn, Icon } from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    searchedValue: '',
  };

  handleSearch = evt => {
    this.setState({ searchedValue: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const query = this.state.searchedValue.trim().toLowerCase();
    if (!query) return;

    this.props.onSubmit(query);
    this.setState({ searchedValue: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Btn>
            <Icon>Search</Icon>
          </Btn>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchedValue}
            onChange={this.handleSearch}
          />
        </Form>
      </Header>
    );
  }
}
