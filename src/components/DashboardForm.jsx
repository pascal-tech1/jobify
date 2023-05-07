import styled from 'styled-components';

export const DashboardForm = styled.div`
  background-color: var(--white);
  margin-top: 2rem;
  box-shadow: var(--shadow-2);

  h3 {
    font-size: 3.2rem;
    font-weight: 100;
    padding-left: 3rem;
    padding-top: 2rem;
    @media screen and (max-width: 600px) {
      padding-left: 2.7rem;
    }
    @media screen and (max-width: 400px) {
      padding-top: 0rem;
    }
  }
  form {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 4rem;
    padding: 2rem 4rem;

    @media screen and (max-width: 600px) {
      padding: 0.5rem 2.7rem;
      place-items: stretch;
      gap: 2rem;
    }
    @media screen and (max-width: 400px) {
      gap: 1rem;
      padding-top: 1rem;
    }
  }
  .field-container {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    @media screen and (max-width: 400px) {
      gap: 0.4rem;
    }
  }
  label {
    font-size: 1.6rem;
    font-weight: 200;
  }
  input {
    all: unset;
    padding: 0.7rem 1rem;
    border-radius: 5px;
    background-color: var(--grey-50);
    border: 1px solid var(--primary-200);
    font-size: 1.3rem;
    text-align: center;
    :focus {
      border: 1px solid var(--primary-500);
    }
    @media screen and (max-width: 400px) {
      padding: 0.5rem 6rem;
    }
  }
  button {
    all: unset;
    background-color: var(--primary-500);
    padding: 1rem 4rem;
    border-radius: 5px;
    margin-top: 1rem;
    color: var(--white);
    text-align: center;
    align-self: flex-end;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    transition: var(--transition);
    :disabled {
      cursor: progress;
      background-color: var(--primary-400);
    }
    div {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
    :hover {
      cursor: pointer;
      background-color: var(--primary-400);
    }
  }
`;
