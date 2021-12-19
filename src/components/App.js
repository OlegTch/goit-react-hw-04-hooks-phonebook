import React from 'react';
import PropTypes from 'prop-types';
import styles from './Phonebook.module.css';
import ContactForm from './ContactForm/ContactForm ';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import dataContacts from '../data/contacts.json';

class App extends React.Component {
  state = {
    contacts: dataContacts,
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const checkContacts = this.state.contacts.find(
      contact => name.toLowerCase() === contact.name.toLowerCase(),
    );

    const checkContactsNumber = this.state.contacts.find(
      contact => number.toLowerCase() === contact.number.toLowerCase(),
    );

    if (checkContacts) {
      return this.onError(`${checkContacts.name}`);
    }

    if (checkContactsNumber) {
      return this.onError(`${checkContactsNumber.number}`);
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onError = checkContacts => {
    const message = `${checkContacts} is already in contacts`;
    alert(message);
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
      console.log(parsedContacts, 'parsedContacts');
      if (parsedContacts.length === 0) {
        console.log('phonebook was empty, returned base contacts');
        this.setState({ contacts: dataContacts });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter
          filterValue={this.state.filter}
          onChangeFilter={this.changeFilter}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

ContactForm.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};

export default App;
