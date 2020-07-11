const handleResponse = async (response, callback) => {
  if (localStorage.getItem("user")) {
    localStorage.setItem("last-action", Date.now());
  }

  if ([200, 201].includes(response.status)) {
    try {
      callback(null, await response.json());
    } catch (error) {
      // there's no response, for example in "DELETE" method.
      callback(null, true);
    }
  } else if (response.status === 400) {
    callback('One of the parameters is wrong or missing.', null);
  } else {
    callback(await response.json(), null);
  }
};

export {
  handleResponse
}
