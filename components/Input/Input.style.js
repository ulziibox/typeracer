import styled from "styled-components";

const RacingInput = styled.input`
  height: 45px;
  border-radius: 10px;
  width: 100%;
  margin-top: 20px;
  border: 2px solid #c4c4c4;
  outline: none;
  font-size: 20px;
  padding: 10px;
  transition: 100ms ease-in;
  &:focus {
    border: 2px solid #fbcc83;
    background-color: #f4f3f4;
  }
`;

export default RacingInput;
