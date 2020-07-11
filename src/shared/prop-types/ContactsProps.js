import PropTypes from 'prop-types';

const { shape } = PropTypes;

const ContactsProps = shape({
  contactBooks: PropTypes.array.isRequired,
});

export default ContactsProps;
