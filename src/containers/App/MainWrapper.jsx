import PropTypes from 'prop-types';
import classNames from 'classnames';

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';

import AccountProps from '../../shared/prop-types/AccountProps';
import { ThemeProps, RTLProps } from '../../shared/prop-types/ReducerProps';

class MainWrapper extends PureComponent {
  static propTypes = {
    rtl: RTLProps.isRequired,
    theme: ThemeProps.isRequired,
    account: AccountProps.isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };

  render() {
    const { theme, rtl } = this.props;
    const wrapperClass = classNames({ wrapper: true });

    return (
      <div className={`${theme.className} ${rtl.direction}-support`} dir={rtl.direction}>
        <div className={wrapperClass}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const statesForConnection = state => ({
  rtl: state.rtl,
  theme: state.theme,
  account: state.account,
});

export default connect(statesForConnection)(MainWrapper);
