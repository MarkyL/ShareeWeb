import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../Layout';
import MainWrapper from './MainWrapper';

import SignIn from '../Account/SignIn';
import SignUp from '../Account/SignUp';
import SignOut from '../Account/SignOut';

import Polls from '../Pages/Polls/Polls';
import PollsResults from '../Pages/Polls/PollsResults';
import PollsTypes from '../Pages/Polls/PollsTypes';
import PollsTypeCreate from '../Pages/Polls/PollsTypeCreate';

import GenericQuestionTypes from '../Pages/GenericQuestions/GenericQuestionTypes';

import Routines from '../Pages/Routines/Routines';
import Patients from '../Pages/Patients/Patients';
import ScheduledNotifications from '../Pages/Notifications/ScheduledNotifications';

import ExercisesTypes from '../Pages/Exercises/ExercisesTypes';

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route exact path="/dash/polls" component={Polls} />
      <Route exact path="/dash/polls/types" component={PollsTypes} />
      <Route exact path="/dash/polls/types/create" component={PollsTypeCreate} />
      <Route exact path="/dash/polls/results/:pollSubType/:pollId/:pollName" component={PollsResults} />

      <Route exact path="/dash/GenericQuestions/GenericQuestionTypes" component={GenericQuestionTypes} />

      <Route exact path="/dash/routines" component={Routines} />
      <Route exact path="/dash/patients" component={Patients} />
      <Route exact path="/dash/notifications" component={ScheduledNotifications} />
      <Route exact path="/dash/exercises/types" component={ExercisesTypes} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/sign_in" component={SignIn} />
        <Route exact path="/sign_up" component={SignUp} />
        <Route exact path="/sign_out" component={SignOut} />

        <Route path="/dash/" component={wrappedRoutes} />

        <Route component={SignIn} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
