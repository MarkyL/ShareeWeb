import React, { PureComponent } from 'react';

import { Collapse } from 'reactstrap';
import DownIcon from 'mdi-react/ChevronDownIcon';

import TopbarMenuLink from './TopbarMenuLink';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

class TopbarProfile extends PureComponent {
  constructor() {
    super();
    this.state = {
      collapse: false
    };
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
      <div className="topbar__profile">
        <button className="topbar__avatar" onClick={this.toggle}>
          <img className="topbar__avatar-img" src={Ava} alt="avatar" />
          <p className="topbar__avatar-name">{user.username}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {this.state.collapse && <button className="topbar__back" onClick={this.toggle} />}
        <Collapse isOpen={this.state.collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            { user.role === "ADMIN" && (
              <div>
                <TopbarMenuLink title="הוספת משתמש חדש" icon="user" path="/sign_up" />
                <div className="topbar__menu-divider" />
              </div>
            )}
            <TopbarMenuLink title="התנתק" icon="exit" path="/sign_out" />
          </div>
        </Collapse>
      </div>
    );
  }
}

export default TopbarProfile;
