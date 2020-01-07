const API_URL = window.location.host.includes("localhost")
    ? "http://localhost:8080/"
    : "http://nodejs-mongo-persistent-tuhlari.rahtiapp.fi/";

export default API_URL;
