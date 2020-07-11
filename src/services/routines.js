const { handleResponse } = require('../utilities/express/response');

const API_PORT = process.env.REACT_APP_API_PORT || '2304';
const API_HOST = process.env.REACT_APP_API_HOST || 'http://23.21.185.104';
const API_URL = `${API_HOST}:${API_PORT}`;

const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

 const createDailyRoutine = async (data, callback) => {
    const response = await fetch(`${API_URL}/medicalStaff/createDailyRoutine`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    });

    handleResponse(response, callback);
 }

 const getAllDailyRoutines = async (callback) => {
      const response = await fetch(`${API_URL}/medicalStaff/getAllDailyRoutines`, { method: 'GET' });

      handleResponse(response, callback);
 }

 const updateDailyRoutineById = async (id, data, callback) => {
     const response = await fetch(`${API_URL}/medicalStaff/updateDailyRoutine/id/${id}`, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify(data),
     });

     handleResponse(response, callback);
  }

  const toggleRoutineActivity = async (pollId, callback) => {
    const response = await fetch(`${API_URL}/medicalStaff/toggleDailyRoutineActivity/id/${pollId}`, { method: 'GET' });

    handleResponse(response, callback);
  };

export {
    createDailyRoutine,
    getAllDailyRoutines,
    updateDailyRoutineById,
    toggleRoutineActivity
};
