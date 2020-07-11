let INTERVAL = null;

//(1000 Milliseconds = 1 second)
// 10M 60,000
// 12H 43,200,000
let SESSION_TIME = 90000; // 15 minutes session

const openSession = () => {
  console.log("OPEN SESSION FOR", localStorage.getItem("user"));

  INTERVAL = setInterval(() => {
    if (Date.now() - Number(localStorage.getItem("last-action")) > SESSION_TIME) {
      localStorage.removeItem("user");
      localStorage.removeItem("last-action");

      clearInterval(INTERVAL);
    }
  }, SESSION_TIME);
}

export {
  openSession
}
