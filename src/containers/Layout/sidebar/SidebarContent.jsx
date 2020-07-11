import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';

class SidebarContent extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    this.props.onClick();
  };

  render() {
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink
            title="רשימת סוגי סקרים"
            icon="book"
            route="/dash/polls/types"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="רשימת הסקרים"
            icon="layers"
            route="/dash/polls"
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="שאלות גנריות"
            icon="layers"
            route="/dash/GenericQuestions/GenericQuestionTypes"
            onClick={this.hideSidebar}
          />
        </ul>

        <ul className="sidebar__block">
          <SidebarLink
            title="מטופלים"
            icon="users"
            route="/dash/patients"
            onClick={this.hideSidebar}
          />
        </ul>

        <ul className="sidebar__block">
          <SidebarLink
            title="לוז שבועי"
            icon="calendar-full"
            route="/dash/routines"
            onClick={this.hideSidebar}
          />
        </ul>

        <ul className="sidebar__block">
          <SidebarLink
            title="הודעות מתוזמנות"
            icon="redo"
            route="/dash/notifications"
            onClick={this.hideSidebar}
          />
        </ul>

        <ul className="sidebar__block">
          <SidebarLink
            title="רשימת סוגי פעילויות"
            icon="layers"
            route="/dash/exercises/types"
            onClick={this.hideSidebar}
          />
        </ul>

        <ul className="sidebar__block">
          <SidebarLink title="התנתק" icon="exit" route="/sign_out" />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
