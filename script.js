let selectedRole = "";


// ===============================
// OPEN LOGIN POPUP
// ===============================

function showLogin(role) {

    selectedRole = role;

    const modal = document.getElementById("loginModal");
    const title = document.getElementById("loginTitle");

    if (!modal || !title) {
        alert("Login popup not found.");
        return;
    }

    if (role === "student") {
        title.innerText = "🎓 Student Login";
    }

    else if (role === "teacher") {
        title.innerText = "👨‍🏫 Teacher Login";
    }

    else if (role === "br") {
        title.innerText = "🏢 BR Login";
    }

    else if (role === "admin") {
        title.innerText = "👑 Admin Login";
    }

    modal.style.display = "flex";
}


// ===============================
// CLOSE LOGIN POPUP
// ===============================

function closeLogin() {

    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// ===============================
// LOGIN USER
// ===============================

function loginUser() {

    const usernameElement =
        document.getElementById("username");

    const passwordElement =
        document.getElementById("password");

    const messageElement =
        document.getElementById("loginMessage");


    if (!usernameElement || !passwordElement) {

        alert("Login fields not found.");

        return;
    }


    const username =
        usernameElement.value.trim();

    const password =
        passwordElement.value.trim();


    // Check empty fields

    if (username === "" || password === "") {

        if (messageElement) {

            messageElement.innerText =
                "Please enter Login ID and Password.";

        }

        return;
    }


    // ===============================
    // STUDENT
    // ===============================

    if (selectedRole === "student") {

        window.location.href = "student.html";

        return;
    }


    // ===============================
    // TEACHER
    // ===============================

    if (selectedRole === "teacher") {

        window.location.href = "teacher.html";

        return;
    }


    // ===============================
    // BR
    // ===============================

    if (selectedRole === "br") {

        window.location.href = "br.html";

        return;
    }


    // ===============================
    // ADMIN
    // ===============================

    if (selectedRole === "admin") {

        window.location.href = "admin.html";

        return;
    }


    // Unknown role

    if (messageElement) {

        messageElement.innerText =
            "Please select a valid login type.";

    }

}


// ===============================
// CLOSE POPUP WHEN CLICKING OUTSIDE
// ===============================

window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("loginModal");

    if (event.target === modal) {

        closeLogin();

    }

});