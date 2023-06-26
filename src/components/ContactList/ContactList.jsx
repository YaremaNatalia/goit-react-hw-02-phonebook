import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, filter, onRemoveContact }) => {
  const filteredContacts = contacts.filter(contact => {
    const name = contact.name.toString().toLowerCase();
    const number = contact.number.toString();
    const filterText = filter.toLowerCase();

    return name.includes(filterText) || number.includes(filter);
  });

  const contactsToRender = filter ? filteredContacts : contacts;

  return (
    <ul className={css.contactList}>
      {contactsToRender.map(({ id, name, number }) => (
        <li key={id} className={css.contactItem}>
          <p className={css.contactName}>{name}:</p>
          <span className={css.contactNumber}>{number}</span>
          <button
            type="button"
            className={css.removeBtn}
            onClick={() => {
              onRemoveContact(id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
  filter: PropTypes.string.isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};
