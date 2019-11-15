import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import logo from '../../images/y18.gif';
import Button from '../../components/Button/Button';

const Header = (props) => {
  const {
    onClick,
  } = props;

  return (<header className="app-header">
            <img src={logo} alt="logo" className="app-header-logo" />
            <Button variant="other" onClick={onClick} title="top" className="app-section-top" />
            <span className="app-header-new">| new </span>
          </header>);
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Header;
