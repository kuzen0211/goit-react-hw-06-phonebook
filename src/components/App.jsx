import { useState, useEffect, useMemo } from 'react';
import { Title } from './Title/Title';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import Notiflix from 'notiflix';
import shortid from 'shortid';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts || [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const addContact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    contacts.find(contact => contact.name === data.name)
      ? Notiflix.Notify.info(`${data.name} is already in contacts`)
      : setContacts(prev => [addContact, ...prev]);
  };

  const filterContact = text => {
    const normalized = text.target.value.trim().toLowerCase();
    setFilter(normalized);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const upperCaseWord = data => {
    return data[0].toUpperCase() + data.substring(1);
  };

  const sortedContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  }, [contacts, filter]);

  return (
    <div>
      <Title title="Phonebook" />
      <Form onSubmit={formSubmitHandler} />

      <Title title="Contacts" />
      <Filter filterContact={filterContact} />

      <Contacts
        contacts={sortedContacts}
        deleteContact={deleteContact}
        upperCaseWord={upperCaseWord}
      />
    </div>
  );
};
