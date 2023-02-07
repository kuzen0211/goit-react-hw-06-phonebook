import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Wraper, Label, Input, Button } from './Form.styled';

import { addContact, getContacts } from '../redux/contact.slice';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

export const Form = () => {
  const contactList = useSelector(getContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;
      default:
    }
  };
  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    const check = contactList.map(contact => contact.name);
    if (check.includes(name)) {
      Notiflix.Notify.info(`${name} is already in contacts`);
    }
    const addToContact = {
      name,
      id: nanoid(),
      number,
    };
    dispatch(addContact(addToContact));
    resetForm();
  };

  return (
    <Wraper onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </Label>
      <Button type="submit" disabled={!name || !number}>
        Add contact
      </Button>
    </Wraper>
  );
};
