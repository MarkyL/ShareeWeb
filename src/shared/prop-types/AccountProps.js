import PropTypes from 'prop-types';

const { shape } = PropTypes;

const AccountProps = shape({
  userEmail: PropTypes.string,
  userName: PropTypes.string,
  accessToken: PropTypes.string,
  confirmed: PropTypes.bool,
});

export default AccountProps;
