import PropTypes from 'prop-types';
import s from './Container.module.css';

const Container = ({ children }) => (
  <div className={s.container}>{children}</div>
);

export default Container;

Container.propTypes = {
  children: PropTypes.PropTypes.arrayOf(PropTypes.node).isRequired,
};
