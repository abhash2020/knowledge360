let selectedRole = "";

function showLogin(role) {

    selectedRole = role;

    const modal = document.getElementById("loginModal");
    const title = document.getElementById("loginTitle");

    if (!modal || !title) {
        alert("Login system error: login popup not found.");
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
        title.innerText = "⚙️ Admin Login";
    }

    modal.style.display = "flex";
}


function closeLogin() {

    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.style.display = "none";
    }
}


function loginUser() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const message =
        document.getElementById("loginMessage");


    if (username === "" || password === "") {

        message.innerText =
            "Please enter Login ID and Password.";

        return;
    }


    if (selectedRole === "student") {

        window.location.href = "student.html";

        return;
    }

if (selectedRole === "teacher") {

    window.location.href = "teacher.html";

    return;
}


if (selectedRole === "br") {

    window.location.href = "br.html";

    return;
}


if (selectedRole === "admin") {

    window.location.href = "admin.html";

    return;
}

    message.innerText =
        selectedRole.toUpperCase() +
        " portal will be activated soon.";
}


window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("loginModal");

    if (event.target === modal) {
        closeLogin();
    }

});