import PropTypes from 'prop-types';

const { shape } = PropTypes;

const PollsProps = shape({
  list: PropTypes.array.isRequired,
});

export default PollsProps;
