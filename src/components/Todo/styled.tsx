import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  border: 2px solid gray;
  border-radius: 0.5rem;
  height: 1.6rem;
`;

export const UpdateButton = styled(StyledButton)`
  :hover {
    background-color: #86efac;
  }
`;

export const DeleteButton = styled(StyledButton)`
  :hover {
    background-color: #fca5a5;
  }
`;

export const UpdateInput = styled(StyledButton.withComponent('input'))`
  width: 15rem;
  height: 1.2rem;
`;

export const Title = styled(UpdateInput.withComponent('p'))`
  font-weight: bold;
  margin-bottom: 0.5rem;
  border: 0;
`;

export const Content = styled.pre`
  border: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 15rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 3.6rem;
`;
