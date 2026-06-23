import { db } from "./firebase-config.js";
import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("studentForm");
const qrModal = document.getElementById("qrModal");
const closeBtn = document.getElementById("closeBtn");

const params = new URLSearchParams(window.location.search);
const editId = params.get("edit");

// LOAD DATA IF EDITING
if (editId) {
    const docSnap = await getDoc(doc(db, "students", editId));

    if (docSnap.exists()) {
        const s = docSnap.data();
        document.getElementById("id").value = s.studentId;
        document.getElementById("fname").value = s.firstName;
        document.getElementById("mname").value = s.middleName;
        document.getElementById("lname").value = s.lastName;
        document.getElementById("year").value = s.year;
        document.getElementById("section").value = s.section;
        document.getElementById("email").value = s.email;
        document.getElementById("contact").value = s.contact;
    }

    // 🔒 Lock the Student ID field when editing
    document.getElementById("id").setAttribute("readonly", true);
    document.getElementById("id").style.backgroundColor = "#f0f0f0";
    document.getElementById("id").style.cursor = "not-allowed";

    // Update page title to reflect edit mode
    document.querySelector(".page-title").textContent = "Edit Student";
    document.querySelector(".page-subtitle").textContent = "Update the student information below.";
}

// SAVE (ADD OR UPDATE)
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const student = {
        studentId: document.getElementById("id").value,
        firstName: document.getElementById("fname").value,
        middleName: document.getElementById("mname").value,
        lastName: document.getElementById("lname").value,
        year: document.getElementById("year").value,
        section: document.getElementById("section").value,
        email: document.getElementById("email").value,
        contact: document.getElementById("contact").value
    };

    // ✅ Use editId (original) when editing, student.studentId when adding
    const docId = editId ? editId : student.studentId;
    await setDoc(doc(db, "students", docId), student);

    // Generate QR instead of redirecting immediately
    generateQR(student.studentId);
});

// GENERATE QR
function generateQR(studentId) {
    document.getElementById("qrcode").innerHTML = "";

    const studentURL = `https://rafananz.github.io/StudentQRSystem/student.html?id=${studentId}`;

    new QRCode(document.getElementById("qrcode"), {
        text: studentURL,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    qrModal.classList.add("show");
}

// CLOSE MODAL
closeBtn.addEventListener("click", () => {
    window.location = "index.html";
});