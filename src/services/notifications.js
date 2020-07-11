const { handleResponse } = require('../utilities/express/response');

const API_PORT = process.env.REACT_APP_API_PORT || '2304';
const API_HOST = process.env.REACT_APP_API_HOST || 'http://23.21.185.104';
const API_URL = `${API_HOST}:${API_PORT}`;

const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

const createScheduledNotification = async (data, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/createScheduledNotification`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  handleResponse(response, callback);
};

const editScheduledNotification = async (data, callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/updateScheduledNotification/id/${data.id}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    handleResponse(response, callback);
};

const getAllScheduledNotifications = async (callback) => {
  const response = await fetch(`${API_URL}/medicalStaff/getAllScheduledNotifications`, { method: 'GET' });

  handleResponse(response, callback);
};

const toggleScheduledNotification = async (notificationId, callback) => {
  const response = await fetch(
    `${API_URL}/medicalStaff/toggleScheduledNotificationActivity/id/${notificationId}`, { method: 'GET' }
  );

  handleResponse(response, callback);
};

export {
  createScheduledNotification,
  editScheduledNotification,
  getAllScheduledNotifications,
  toggleScheduledNotification
};
