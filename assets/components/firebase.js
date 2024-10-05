import { initializeApp } from '../../node_modules/firebase/app';
import { getFirestore } from '../../node_modules/firebase/firestore';
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
    export const db = getFirestore(app);

