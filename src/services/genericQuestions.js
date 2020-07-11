const { handleResponse } = require('../utilities/express/response');

const API_PORT = process.env.API_PORT || '2304';
const API_HOST = process.env.API_HOST || 'http://localhost';
const API_URL = `${API_HOST}:${API_PORT}`;

const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

 const getAllGenericQuestions = async (callback) => {
      const response = await fetch(`${API_URL}/medicalStaff/getAllGenericQuestions`, { method: 'GET' });

      handleResponse(response, callback);
 }

 const createGenericQuestion = async (data, callback) => {
       const response = await fetch(`${API_URL}/medicalStaff/createGenericQuestion`, {
       method: 'POST',
       headers: headers,
       body: JSON.stringify(data),
       });

       handleResponse(response, callback);
  }

 const updateGenericQuestion = async (id, data, callback) => {
     const response = await fetch(`${API_URL}/medicalStaff/updateGenericQuestion/id/${id}`, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify(data),
     });

     handleResponse(response, callback)
 }

export {
    getAllGenericQuestions,
    createGenericQuestion,
    updateGenericQuestion,
};
