import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';

// redux stuff
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// set as default
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: '',
  showSideBar: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: '',
  jobType: 'full-time',
  status: 'pending',
};

const store = createStore(reducer, initialState, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
