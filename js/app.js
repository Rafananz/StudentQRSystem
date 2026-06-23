import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const table = document.getElementById("studentTable");

// LOAD STUDENTS
async function loadStudents() {

    table.innerHTML = "";

    const snapshot = await getDocs(collection(db, "students"));

    snapshot.forEach((docSnap) => {

        const s = docSnap.data();

        table.innerHTML += `
            <tr>
                <td>${s.studentId}</td>
                <td>${s.firstName} ${s.lastName}</td>
                <td>${s.year} - ${s.section}</td>
                <td>
                    <button onclick="editStudent('${s.studentId}')">Edit</button>
                    <button onclick="deleteStudent('${s.studentId}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

loadStudents();

// DELETE
window.deleteStudent = async function (id) {

    await deleteDoc(doc(db, "students", id));

    location.reload();
};

// EDIT (ONLY NAVIGATION)
window.editStudent = function (id) {
    window.location = `add.html?edit=${id}`;
};