const ENV = process.env;

const config = {
  firebase: {
    apiKey: ENV.VUE_APP_FIREBASE_API_KEY,
    authDomain: ENV.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: ENV.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: ENV.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: ENV.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: ENV.VUE_APP_FIREBASE_APP_ID,
    //  baseURL: ENV.REACT_APP_BASE_URL,
    //  sessionKEY: ENV.REACT_APP_SESSION_KEY,
  },
};

export default config;
