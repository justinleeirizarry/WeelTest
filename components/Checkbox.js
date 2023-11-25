import React from "react";
import styled from "styled-components";

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 15px;
  height: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;

 
`;

const Checkbox = ({ checked, readOnly, ...props }) => (
    <StyledCheckbox
        type="checkbox"
        checked={checked}
        disabled={readOnly}
        {...props}
    />
);

export default Checkbox;
