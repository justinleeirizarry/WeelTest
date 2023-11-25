import React from "react";
import styled from "styled-components";

import magnifyingGlass from "../assets/magnifying-glass.svg";

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  background-image: url(${magnifyingGlass});
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 15px 15px;
  padding-right: 40px;
`;
const SearchBar = ({ value, onChange }) => (
  <StyledInput
    type="text"
    value={value}
    onChange={onChange}
    placeholder="Search..."
  />
);

export default SearchBar;
