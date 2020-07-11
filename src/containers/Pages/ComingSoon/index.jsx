/* eslint-disable react/forbid-prop-types */
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Container } from 'reactstrap';

import ComingSoon from './components/ComingSoon';
import AccountProps from '../../..//shared/prop-types/AccountProps';

class PageComingSoon extends PureComponent {
  static propTypes = {
    account: AccountProps.isRequired,
  };

  render() {
    const { account } = this.props;

    if (account.sessionValid === true) {
      return (
        <Container>
          <Row>
            <ComingSoon />
          </Row>
        </Container>
      );
    }

    return (<Redirect to="/sign_in" />);
  }
}

const statesForConnection = state => ({ account: state.account });

export default (connect(statesForConnection)(PageComingSoon));
