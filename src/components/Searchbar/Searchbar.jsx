import { useState } from 'react';
import PropTypes from 'prop-types';

import { Header, Form, Input, Btn, Icon } from './Searchbar.styled';

export function SearchBar({ onSubmit }) {
  const [searchedValue, setSearchedValue] = useState('');

  const handleSearch = evt => {
    setSearchedValue(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const query = searchedValue.trim().toLowerCase();
    if (!query) return;

    onSubmit(query);
    setSearchedValue('');
  };

  return (
    <Header id="header">
      <Form onSubmit={handleSubmit}>
        <Btn>
          <Icon>Search</Icon>
        </Btn>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchedValue}
          onChange={handleSearch}
        />
      </Form>
    </Header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
