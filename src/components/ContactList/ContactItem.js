import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const ContactItem = (props) => {
  const { id, name, number, onDeleteContact } = props;
  return (
    <li className={styles.contactsItem} id={id}>
      <p className={styles.contactsName}>{name}:</p>
      <p className={styles.contactsNumber}>{number}</p>
      <button
        className={styles.contactsButton}
        type="button"
        onClick={onDeleteContact}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  onDeleteContact: PropTypes.func,
};

export default ContactItem;
