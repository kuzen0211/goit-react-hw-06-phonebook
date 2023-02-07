import { Title } from './App.styled';

import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export const App = () => {
  return (
    <>
      <Title>Phonebook</Title>
      <Form />
      <Title>Contacts</Title>
      <Filter />
      <Contacts />
    </>
  );
};
