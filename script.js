let selectedRole = "student";

function showLogin(role) {

    selectedRole = role;

    const modal = document.getElementById("loginModal");
    const title = document.getElementById("loginTitle");

    if (role === "student") {
        title.innerText = "🎓 Student Login";
    }

    if (role === "teacher") {
        title.innerText = "👨‍🏫 Teacher Login";
    }

    if (role === "br") {
        title.innerText = "🏢 BR Login";
    }

    if (role === "admin") {
        title.innerText = "⚙️ Admin Login";
    }

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("loginMessage").innerText = "";

    modal.style.display = "flex";
}


function closeLogin() {

    document.getElementById("loginModal").style.display = "none";

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


    message.innerText =
        selectedRole.toUpperCase() +
        " portal will be activated next.";

}


window.onclick = function(event) {

    const modal =
        document.getElementById("loginModal");

    if (event.target === modal) {

        closeLogin();

    }

};