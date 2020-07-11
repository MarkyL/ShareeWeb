const { handleResponse } = require('../utilities/express/response');

const API_PORT = process.env.REACT_APP_API_PORT || '2304';
const API_HOST = process.env.REACT_APP_API_HOST || 'http://23.21.185.104';
const API_URL = `${API_HOST}:${API_PORT}`;

const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

 const createExerciseCategory = async (data, callback) => {
    const response = await fetch(`${API_URL}/medicalStaff/createExerciseCategory`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    });

    handleResponse(response, callback);
 }

 const createExerciseCategoryType = async (data, callback) => {
     const response = await fetch(`${API_URL}/medicalStaff/createExerciseCategoryType`, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify(data),
     });

     handleResponse(response, callback);
  }

 const getAllExercisesTypes = async (callback) => {
      const response = await fetch(`${API_URL}/medicalStaff/getAllExerciseCategoryTypes`, { method: 'GET' });

      handleResponse(response, callback);
 }

 const getAllExerciseCategoriesByUserId = async (userId, callback) => {
       const response = await fetch(`${API_URL}/medicalStaff/getAllExerciseCategoriesByUserId/id/${userId}`, { method: 'GET' });

       handleResponse(response, callback);
  }

 const updateExerciseCategory = async (id, data, callback) => {
     const response = await fetch(`${API_URL}/medicalStaff/updateExerciseCategory/id/${id}`, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify(data),
     });

     handleResponse(response, callback)
 }

 const deleteExerciseCategoryById = async (id, callback) => {
      const response = await fetch(`${API_URL}/medicalStaff/deleteExerciseCategoryById/id/${id}`, { method: 'DELETE' });

      handleResponse(response, callback)
 }

export {
    createExerciseCategory,
    createExerciseCategoryType,
    getAllExercisesTypes,
    getAllExerciseCategoriesByUserId,
    updateExerciseCategory,
    deleteExerciseCategoryById
};
