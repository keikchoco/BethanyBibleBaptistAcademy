import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, getDocs, collection, getCountFromServer } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { query, where } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQrgbw4TlLtLbex-BiEk58nA4l_zoDAmo",
  authDomain: "bbba-96d01.firebaseapp.com",
  projectId: "bbba-96d01",
  storageBucket: "bbba-96d01.firebasestorage.app",
  messagingSenderId: "9762028958",
  appId: "1:9762028958:web:4b10cd0c5458b098e56a8f",
  measurementId: "G-8YJS0ZTJ4C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);

    const uid = user.uid;
  } else {

  }
});

const db = getFirestore(app);
const collectionRef = collection(db, "students");
const querySnapshot = await getDocs(collectionRef);

let studentDetails = [];
const tableTemplate = document.querySelector('[student-template]');
const tableST = document.getElementById("tableST");

async function getStudentDetails() {
  try {
    studentDetails = querySnapshot.docs.map((doc) => {
      const student = tableTemplate.content.cloneNode(true).children[0];
      student.querySelector("#STID").innerHTML = doc.data()["studentID"];
      student.querySelector("#STName").innerHTML = doc.data()["lastName"] + ", " + doc.data()["firstName"];
      student.querySelector("#STGrade").innerHTML = doc.data()["gradeLevel"];
      student.classList.remove("hidden");
      tableST.append(student);
      return {
        studentID: doc.data()["studentID"] || "",
        Name: doc.data()["lastName"] + ", " + doc.data()["firstName"] || "",
        gradeLevel: doc.data()["gradeLevel"] || "",
        element: student
      };
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

getStudentDetails();
