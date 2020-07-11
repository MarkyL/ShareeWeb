/* eslint-disable no-return-assign */
import PropTypes from 'prop-types';
import classNames from 'classnames';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NotificationSystem from 'rc-notification';

import Topbar from './topbar/Topbar';
import TopbarWithNavigation from './topbar_with_navigation/TopbarWithNavigation';

import Sidebar from './sidebar/Sidebar';
import SidebarMobile from './topbar_with_navigation/sidebar_mobile/SidebarMobile';

import { changeThemeToDark, changeThemeToLight } from '../../redux/actions/themeActions';
import { CustomizerProps, SidebarProps } from '../../shared/prop-types/ReducerProps';
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '../../redux/actions/sidebarActions';
import { changeBorderRadius, toggleBoxShadow, toggleTopNavigation } from '../../redux/actions/customizerActions';

window.notification = null;

class Layout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebar: SidebarProps.isRequired,
    customizer: CustomizerProps.isRequired,
  };

  componentDidMount() {
    NotificationSystem.newInstance({}, n => window.notification = n);
  }

  changeSidebarVisibility = () => {
    this.props.dispatch(changeSidebarVisibility());
  };

  changeMobileSidebarVisibility = () => {
    this.props.dispatch(changeMobileSidebarVisibility());
  };

  changeToDark = () => {
    this.props.dispatch(changeThemeToDark());
  };

  changeToLight = () => {
    this.props.dispatch(changeThemeToLight());
  };

  toggleTopNavigation = () => {
    this.props.dispatch(toggleTopNavigation());
  };

  changeBorderRadius = () => {
    this.props.dispatch(changeBorderRadius());
  };

  toggleBoxShadow = () => {
    this.props.dispatch(toggleBoxShadow());
  };

  render() {
    const { customizer, sidebar } = this.props;
    const layoutClass = classNames({
      layout: true,
      'layout--collapse': sidebar.collapse,
      'layout--top-navigation': customizer.topNavigation,
    });

    return (
      <div className={layoutClass}>
        {this.props.customizer.topNavigation ?
          <TopbarWithNavigation
            changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          /> :
          <Topbar
            changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
            changeSidebarVisibility={this.changeSidebarVisibility}
          />
        }
        {this.props.customizer.topNavigation ?
          <SidebarMobile
            sidebar={sidebar}
            changeToDark={this.changeToDark}
            changeToLight={this.changeToLight}
            changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          /> :
          <Sidebar
            sidebar={sidebar}
            changeToDark={this.changeToDark}
            changeToLight={this.changeToLight}
            changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          />
        }
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  customizer: state.customizer,
  sidebar: state.sidebar,
}))(Layout));
