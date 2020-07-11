const { handleResponse } = require('../utilities/express/response');

const API_PORT = process.env.REACT_APP_API_PORT || '2304';
const API_HOST = process.env.REACT_APP_API_HOST || 'http://23.21.185.104';
const API_URL = `${API_HOST}:${API_PORT}`;

const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

const signIn = async (data, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/loginMedicalStaffUser`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  handleResponse(response, callback);
};

const signUp = async (data, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/registerMedicalStaffUser`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  handleResponse(response, callback);
};

export {
  signIn,
  signUp
};
