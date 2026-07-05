import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const studentId = params.get("id");

if (!studentId) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("error").textContent = "No student ID provided.";
} else {
    const docSnap = await getDoc(doc(db, "students", studentId));

    document.getElementById("loading").style.display = "none";

    if (docSnap.exists()) {
        const s = docSnap.data();
        const mid = s.middleName ? ` ${s.middleName} ` : " ";
        document.getElementById("fullName").textContent = `${s.firstName}${mid}${s.lastName}`;
        document.getElementById("badgeId").textContent = `ID: ${s.studentId}`;
        document.getElementById("year").textContent = s.year;
        document.getElementById("section").textContent = s.section;
        document.getElementById("email").textContent = s.email || "N/A";
        document.getElementById("emergencycontact").textContent = s.emergency_contact || "N/A";
        document.getElementById("studentCard").style.display = "block";
        document.getElementById("adviser").textContent = s.adviser || "N/A";
    } else {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").textContent = "Student not found.";
    }
}