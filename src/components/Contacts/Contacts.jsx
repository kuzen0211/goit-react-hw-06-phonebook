import { useDispatch, useSelector } from 'react-redux';

import { DeleteBtn, List, Item } from './Contacts.styled';

import { deleteContact } from '../redux/contact.slice';
import { getFilter } from '../redux/filter.slice';
import { getContacts } from '../redux/contact.slice';

export const Contacts = () => {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const delContact = id => {
    dispatch(deleteContact(id));
  };

  const upperCaseWord = data => {
    return data[0].toUpperCase() + data.substring(1);
  };

  const sortedContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  return (
    <List>
      {sortedContacts()?.map(contact => {
        return (
          <Item key={contact.id}>
            {upperCaseWord(contact.name)}: {contact.number}
            <DeleteBtn type="button" onClick={() => delContact(contact.id)}>
              Delete
            </DeleteBtn>
          </Item>
        );
      })}
    </List>
  );
};
