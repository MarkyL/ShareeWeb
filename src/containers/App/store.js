import { combineReducers, createStore } from 'redux';

import {
  rtlReducer,
  themeReducer,
  sidebarReducer,
  customizerReducer,
  newOrderTableReducer,
} from '../../redux/reducers/index';

const reducer = combineReducers({
  rtl: rtlReducer,
  theme: themeReducer,
  sidebar: sidebarReducer,
  customizer: customizerReducer,
  newOrder: newOrderTableReducer,
});
const store = createStore(reducer);

export default store;
