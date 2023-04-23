
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
export const app = initializeApp({
    apiKey: "AIzaSyCGqYkypNBsj3-D05-7CiDZQd-eHmjuksg",
    authDomain: "project-escape-23.firebaseapp.com",
    projectId: "project-escape-23",
    storageBucket: "project-escape-23.appspot.com",
    messagingSenderId: "346453512843",
    appId: "1:346453512843:web:e00ababbff8e43f820fa8e",
});

export {
    getDatabase,
    set,
    ref,
    update,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";