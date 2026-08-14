let selectedRole = "student";


function showLogin(role) {

    selectedRole = role;

    const modal =
        document.getElementById("loginModal");

    const title =
        document.getElementById("loginTitle");


    const titles = {

        student: "🎓 Student Login",

        teacher: "👨‍🏫 Teacher Login",

        br: "🏢 BR Login",

        admin: "⚙️ Admin Login"

    };


    title.innerText = titles[role];


    document.getElementById("loginMessage")
        .innerText = "";


    modal.style.display = "flex";
}


function closeLogin() {

    document.getElementById("loginModal")
        .style.display = "none";
}


function loginUser() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;


    if (username === "" || password === "") {

        document.getElementById("loginMessage")
            .innerText =
            "Please enter Login ID and Password.";

        return;
    }


    /*
       DEMO LOGIN

       This is only a frontend demonstration.

       Later we will connect this
       to a real database.
    */


    document.getElementById("loginModal")
        .style.display = "none";


    document.getElementById("dashboard")
        .style.display = "block";


    document.getElementById("dashboardTitle")
        .innerText =
        "Welcome " +
        selectedRole.toUpperCase();


    window.scrollTo(0,0);
}


function logout() {

    document.getElementById("dashboard")
        .style.display = "none";


    document.getElementById("username")
        .value = "";


    document.getElementById("password")
        .value = "";


    window.scrollTo(0,0);
}


window.onclick = function(event) {

    const modal =
        document.getElementById("loginModal");


    if (event.target === modal) {

        closeLogin();

    }

};