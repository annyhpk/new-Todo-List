import styled from '@emotion/styled';

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
