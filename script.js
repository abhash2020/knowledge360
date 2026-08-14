let selectedRole = "student";


// =========================
// OPEN LOGIN
// =========================

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


// =========================
// CLOSE LOGIN
// =========================

function closeLogin() {

    document.getElementById("loginModal").style.display = "none";

}


// =========================
// LOGIN
// =========================

function loginUser() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const message =
        document.getElementById("loginMessage");


    // Check empty fields

    if (username === "" || password === "") {

        message.innerText =
            "Please enter Login ID and Password.";

        return;
    }


    // Close login popup

    document.getElementById("loginModal").style.display = "none";


    // Show dashboard

    const dashboard =
        document.getElementById("dashboard");

    dashboard.style.display = "block";


    // Allow scrolling

    document.body.style.overflow = "auto";


    // Change dashboard

    showDashboard(selectedRole, username);


    // Move to top

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


// =========================
// DASHBOARD
// =========================

function showDashboard(role, username) {

    const dashboard =
        document.getElementById("dashboard");


    let title = "";
    let subtitle = "";
    let modules = [];


    // STUDENT

    if (role === "student") {

        title = "🎓 Student Dashboard";

        subtitle =
            "Welcome " + username +
            " | Your Academic Portal";

        modules = [

            ["👤", "My Profile"],
            ["🕒", "Attendance"],
            ["📚", "Study Material"],
            ["📝", "DPP / Homework"],
            ["📋", "Tests"],
            ["🏆", "Results"],
            ["💰", "Fees"],
            ["📢", "Notices"]

        ];
    }


    // TEACHER

    else if (role === "teacher") {

        title = "👨‍🏫 Teacher Dashboard";

        subtitle =
            "Welcome " + username +
            " | Teacher Portal";

        modules = [

            ["👤", "My Profile"],
            ["🏫", "My Classes"],
            ["🕒", "Attendance"],
            ["📊", "Enter Marks"],
            ["📚", "Upload DPP"],
            ["📄", "Worksheets"],
            ["📝", "Tests"],
            ["📈", "Performance"]

        ];
    }


    // BR

    else if (role === "br") {

        title = "🏢 BR Dashboard";

        subtitle =
            "Welcome " + username +
            " | Branch Management";

        modules = [

            ["📞", "Enquiries"],
            ["🎓", "Admissions"],
            ["👥", "Students"],
            ["💰", "Fees"],
            ["🕒", "Attendance"],
            ["📅", "Timetable"],
            ["📝", "Tests"],
            ["📊", "Reports"]

        ];
    }


    // ADMIN

    else if (role === "admin") {

        title = "⚙️ Admin Dashboard";

        subtitle =
            "Welcome " + username +
            " | Knowledge 360 Administration";

        modules = [

            ["🎓", "Students"],
            ["👨‍🏫", "Teachers"],
            ["🏢", "BR Staff"],
            ["🏫", "Branches"],
            ["📚", "Classes & Batches"],
            ["🕒", "Attendance"],
            ["📝", "Tests & Results"],
            ["💰", "Fees"],
            ["📢", "Notices"],
            ["📊", "Reports"],
            ["⚙️", "Settings"]

        ];
    }


    // Create module cards

    let cards = "";


    for (let i = 0; i < modules.length; i++) {

        cards += `

            <div class="dashboard-card">

                <div class="dashboard-card-icon">
                    ${modules[i][0]}
                </div>

                <h3>
                    ${modules[i][1]}
                </h3>

                <p>
                    Open ${modules[i][1]}
                </p>

                <button
                    onclick="moduleMessage('${modules[i][1]}')">

                    Open →

                </button>

            </div>

        `;
    }


    // Put dashboard content

    dashboard.innerHTML = `

        <div class="dashboard-header">

            <div>

                <h2>
                    KNOWLEDGE 360
                </h2>

                <small>
                    ${role.toUpperCase()} PORTAL
                </small>

            </div>

            <button
                class="logout-button"
                onclick="logout()">

                Logout

            </button>

        </div>


        <div class="dashboard-content">

            <div class="welcome-area">

                <h1>
                    ${title}
                </h1>

                <p>
                    ${subtitle}
                </p>

            </div>


            <div class="dashboard-grid">

                ${cards}

            </div>

        </div>

    `;
}


// =========================
// MODULE BUTTON
// =========================

function moduleMessage(module) {

    alert(
        module +
        " will be connected to the Knowledge 360 database."
    );

}


// =========================
// LOGOUT
// =========================

function logout() {

    const dashboard =
        document.getElementById("dashboard");

    dashboard.style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


// =========================
// CLOSE POPUP WHEN OUTSIDE
// =========================

window.onclick = function(event) {

    const modal =
        document.getElementById("loginModal");

    if (event.target === modal) {

        closeLogin();

    }

};