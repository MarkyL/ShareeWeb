import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React, { Component, Fragment } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';

import store from './store';
import Router from './Router';
import ScrollToTop from './ScrollToTop';

import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss';

import { openSession } from '../../utilities/authentication';

if (localStorage.getItem("user")) {
  openSession();
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loaded: false,
    };
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      setTimeout(() => this.setState({ loaded: true }), 3000);
    });
  }

  render() {
    const { loaded, loading } = this.state;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <Fragment>
              {!loaded &&
                <div className={`load${loading ? '' : ' loaded'}`}>
                  <div className="load__icon-wrap">
                    <svg className="load__icon">
                      <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                    </svg>
                  </div>
                </div>
              }
              <div>
                <Router />
              </div>
            </Fragment>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default hot(module)(App);
