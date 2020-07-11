const { handleResponse } = require('../utilities/express/response');

const API_PORT = process.env.REACT_APP_API_PORT || '2304';
const API_HOST = process.env.REACT_APP_API_HOST || 'http://23.21.185.104';
const API_URL = `${API_HOST}:${API_PORT}`;

const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

const createPoll = async (data, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/createPoll`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  handleResponse(response, callback);
};

const editPoll = async (pollId, data, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/updatePoll/id/${pollId}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  handleResponse(response, callback);
};

const createPollType = async (data, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/createPollType`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  handleResponse(response, callback);
};

const togglePollActivity = async (pollId, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/togglePollActivity/id/${pollId}`, { method: 'GET' });

  handleResponse(response, callback);
};

const getAllPolls = async (callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/getAllPolls`, { method: 'GET' });

  handleResponse(response, callback);
};

const getAllPollTypes = async (callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/getAllPollTypes`, { method: 'GET' });

  handleResponse(response, callback);
};

const getGeneralPollResultsById = async (pollId, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/getGeneralPollResultsById/id/${pollId}`, { method: 'GET' });

  handleResponse(response, callback);
};

const getMedicalPollResultsById = async (pollId, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/getMedicalPollResultsById/id/${pollId}`, { method: 'GET' });

  handleResponse(response, callback);
};

export {
  createPoll,
  editPoll,
  createPollType,
  togglePollActivity,
  getAllPolls,
  getAllPollTypes,
  getGeneralPollResultsById,
  getMedicalPollResultsById
};
