import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import React from 'react';
import Notiflix from 'notiflix';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  onAddContact = contactData => {
    const { name } = contactData;
    const { contacts } = this.state;

    // Перевірка наявності контакту

    const isDuplicateName = contacts.some(
      contact =>
        String(contact.name).toLowerCase() === String(name).toLowerCase()
    );

    if (isDuplicateName) {
      Notiflix.Notify.failure(`${name} is already in contacts!`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contactData],
      }));

      //     this.setState({
      //  contacts: [...this.state.contacts, contactData],
      // });
    }
  };

  onRemoveContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
      filter: '',
    });
  };

  handleFilterChange = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 25,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 30,
        }}
      >
        <div>
          <h1>Phonebook</h1>
          <ContactForm onAddContact={this.onAddContact} />
          <h2>Contacts</h2>
          <Filter
            filter={this.state.filter}
            onFilterChange={this.handleFilterChange}
          />
          <ContactList
            contacts={this.state.contacts}
            filter={this.state.filter}
            onRemoveContact={this.onRemoveContact}
          />
        </div>
      </div>
    );
  }
}
