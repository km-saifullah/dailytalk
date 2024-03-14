const config = {
  apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECTID),
  storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_ID),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
};

export default config;
