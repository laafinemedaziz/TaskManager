import { initializeApp } from '../../node_modules/firebase/app';
import { getFirestore,collection } from '../../node_modules/firebase/firestore';
import { getAuth } from '../../node_modules/firebase/auth';
    const firebaseConfig = {
        apiKey: "AIzaSyDMDzajfBrAa66F9reZipV3e7oIWPCO2PQ",
        authDomain: "task-manager-2630c.firebaseapp.com",
        projectId: "task-manager-2630c",
        storageBucket: "task-manager-2630c.appspot.com",
        messagingSenderId: "989011003579",
        appId: "1:989011003579:web:7a3bf431ba235a1253019e",
        measurementId: "G-V0CTCGEH9P"
    };
    const app = initializeApp(firebaseConfig);

    //Firestore
    export const db = getFirestore(app);
    //Firestore Collections
    export const usersCol = collection(db,"users");
    export const tasksCol = collection(db,"tasks")



    //firebase auth
    export const auth = getAuth();

