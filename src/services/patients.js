const { handleResponse } = require('../utilities/express/response');

const API_PORT = process.env.REACT_APP_API_PORT || '2304';
const API_HOST = process.env.REACT_APP_API_HOST || 'http://23.21.185.104';
const API_URL = `${API_HOST}:${API_PORT}`;

const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

const createPatient = async (data, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/createPatient`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  handleResponse(response, callback);
};

const sendPushToPatient = async (data, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/sendPushToPatient`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  handleResponse(response, callback);
};

const getAllPatients = async (callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/patients`, { method: 'GET' });

  handleResponse(response, callback);
};

const togglePatientHospitalization = async (patientId, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/togglePatientHospitalization/id/${patientId}`, { method: 'GET' });

  handleResponse(response, callback);
};

const getMedicalPollResultsForUser = async (patientId, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/getMedicalPollResultsForUser/userId/${patientId}`, { method: 'GET' });

  handleResponse(response, callback);
};

const getAllPushNotificationsByUserId = async (patientId, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/getAllPushNotificationsByUserId/id/${patientId}`, { method: 'GET' });

  handleResponse(response, callback);
};

export {
  createPatient,
  getAllPatients,
  sendPushToPatient,
  togglePatientHospitalization,
  getMedicalPollResultsForUser,
  getAllPushNotificationsByUserId,
};
