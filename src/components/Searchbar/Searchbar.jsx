import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { Header, Form, Input, Btn, Icon } from './Searchbar.styled';
import { useEffect } from 'react';

export function SearchBar({ onSubmit, setHeaderHeight }) {
  const [searchedValue, setSearchedValue] = useState('');

  const headerRef = useRef(null);
  useEffect(() => {
    if (!headerRef.current) return;

    const headerHeight = headerRef.current.offsetHeight;
    setHeaderHeight(headerHeight);
  }, [setHeaderHeight]);

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
    <Header ref={headerRef}>
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
