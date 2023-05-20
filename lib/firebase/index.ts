
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/storage';

const firebaseConfig = {
    // Votre configuration Firebase
    apiKey: "AIzaSyDe_KtuCfbCh0_rxMz1RtLMRuag2zsYsio",
    authDomain: "agro-app-6f98c.firebaseapp.com",
    databaseURL: "https://agro-app-6f98c-default-rtdb.firebaseio.com",
    projectId: "agro-app-6f98c",
    storageBucket: "agro-app-6f98c.appspot.com",
    messagingSenderId: "932172823286",
    appId: "1:932172823286:web:b1c2fefec3e61ce72acad7"
};

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app);