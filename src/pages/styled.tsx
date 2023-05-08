import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

// Login-Page
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #9ca3af;
  justify-self: end;
  font-size: 0.75rem;
  line-height: 1rem;
`;

export const Label = styled.label`
  font-size: 0.75em;
  line-height: 1em;
  color: lightgray;
`;

// Todo-Page
export const TodoBox = styled.div`
  border: 2px solid;
  border-radius: 0.75rem;
  padding: 1.25rem;
  width: 18rem;
`;

export const TodoContainer = styled.div`
  display: grid;
  gap: 1.25rem;
`;

export const TodoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

// Form
export const StyledFrom = styled.form`
  display: inherit;
  gap: 0.6em;
`;

export const FormWrapper = styled.div`
  display: grid;
  gap: 0.6em;
  width: 20rem;
  padding: 1.25rem;
  border: 2px solid gray;
  border-radius: 0.75em;
  margin-top: 7em;
`;

export const Button = styled.button`
  font-weight: bold;
  border: 1px solid;
  width: 7rem;
  justify-self: center;
  background-color: #cbd5e1;
`;

// input
export const StyledInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 2px solid;
  border-radius: 0.75rem;
  padding: 0.2rem 0.75rem;
  font-size: 16px;
`;

export const ValidationAlert = styled.p`
  color: #f05650;
  font-size: 12px;
`;

// text-area
export const StyledTextArea = styled.textarea`
  width: 19rem;
  border: 2px solid;
  border-radius: 0.75rem;
  padding: 0.2rem 0.75rem;
  height: 3.6rem;
  font-size: 14px;
  resize: none;
`;
