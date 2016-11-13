import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

export default class NavItem extends Component {
  closeNavigation = () => $('#navbarResponsive').collapse('hide');

  render() {
    const { to, activeOnlyWhenExact, ...restProps } = this.props;
    return (
      <Link to={to} activeOnlyWhenExact={activeOnlyWhenExact}>
        {
          ({ isActive, location, href, onClick, transition }) => (
            <li className={classNames('nav-item', { active: isActive })} onClick={this.closeNavigation}>
              <Link {...restProps} to={to} className="nav-link">{this.props.children}</Link>
            </li>
          )
        }
      </Link>
    );
  }
}
NavItem.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  activeOnlyWhenExact: PropTypes.bool,
};
NavItem.defaultProps = {
  activeOnlyWhenExact: false
};
