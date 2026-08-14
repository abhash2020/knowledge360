let selectedRole = "student";


// ================= LOGIN =================

function showLogin(role) {

    selectedRole = role;

    const modal = document.getElementById("loginModal");
    const title = document.getElementById("loginTitle");

    const titles = {
        student: "🎓 Student Login",
        teacher: "👨‍🏫 Teacher Login",
        br: "🏢 BR Login",
        admin: "⚙️ Admin Login"
    };

    title.innerText = titles[role];

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    document.getElementById("loginMessage").innerText = "";

    modal.style.display = "flex";
}


function closeLogin() {

    document.getElementById("loginModal").style.display = "none";

}


// ================= LOGIN USER =================

function loginUser() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (username === "" || password === "") {

        document.getElementById("loginMessage").innerText =
            "Please enter Login ID and Password.";

        return;
    }


    // Close login window

    document.getElementById("loginModal").style.display = "none";


    // Hide homepage

    document.querySelector("body").style.overflow = "hidden";


    // Show dashboard

    const dashboard =
        document.getElementById("dashboard");

    dashboard.style.display = "block";


    // Create dashboard according to role

    createDashboard(selectedRole, username);


    window.scrollTo(0, 0);
}


// ================= CREATE DASHBOARD =================

function createDashboard(role, username) {

    const dashboard =
        document.getElementById("dashboard");


    let title = "";
    let subtitle = "";
    let cards = [];


    // ================= STUDENT =================

    if (role === "student") {

        title = "Student Dashboard";

        subtitle =
            "Welcome " + username +
            " • Manage your academic progress";

        cards = [

            {
                icon: "👤",
                title: "My Profile",
                text: "View your personal and academic details."
            },

            {
                icon: "🕒",
                title: "Attendance",
                text: "Check your daily and monthly attendance."
            },

            {
                icon: "📚",
                title: "Study Material",
                text: "Access notes, PDFs and chapter material."
            },

            {
                icon: "📝",
                title: "DPP / Homework",
                text: "View daily practice papers and homework."
            },

            {
                icon: "📋",
                title: "Tests",
                text: "View upcoming and previous tests."
            },

            {
                icon: "🏆",
                title: "Results",
                text: "Check your marks and performance."
            },

            {
                icon: "💰",
                title: "Fees",
                text: "View fees, dues and payment history."
            },

            {
                icon: "📢",
                title: "Notices",
                text: "Read important institute announcements."
            }

        ];
    }


    // ================= TEACHER =================

    if (role === "teacher") {

        title = "Teacher Dashboard";

        subtitle =
            "Welcome " + username +
            " • Manage your classes";

        cards = [

            {
                icon: "👤",
                title: "My Profile",
                text: "View and update your teacher profile."
            },

            {
                icon: "🏫",
                title: "My Classes",
                text: "View your assigned classes and batches."
            },

            {
                icon: "🕒",
                title: "Attendance",
                text: "Mark and manage student attendance."
            },

            {
                icon: "📊",
                title: "Enter Marks",
                text: "Enter student test and examination marks."
            },

            {
                icon: "📚",
                title: "Upload DPP",
                text: "Upload daily practice papers."
            },

            {
                icon: "📄",
                title: "Worksheets",
                text: "Upload worksheets and study material."
            },

            {
                icon: "📝",
                title: "Tests",
                text: "Create and manage class tests."
            },

            {
                icon: "📈",
                title: "Performance",
                text: "Monitor student performance."
            }

        ];
    }


    // ================= BR =================

    if (role === "br") {

        title = "BR Dashboard";

        subtitle =
            "Welcome " + username +
            " • Manage your branch";

        cards = [

            {
                icon: "📞",
                title: "Enquiries",
                text: "Manage new student enquiries."
            },

            {
                icon: "🎓",
                title: "Admissions",
                text: "Manage new admissions."
            },

            {
                icon: "👥",
                title: "Students",
                text: "View and manage branch students."
            },

            {
                icon: "💰",
                title: "Fees",
                text: "Manage fees and pending payments."
            },

            {
                icon: "🕒",
                title: "Attendance",
                text: "Monitor student attendance."
            },

            {
                icon: "📅",
                title: "Timetable",
                text: "Manage classes and schedules."
            },

            {
                icon: "📝",
                title: "Tests",
                text: "Manage branch test schedules."
            },

            {
                icon: "📊",
                title: "Reports",
                text: "View branch performance reports."
            }

        ];
    }


    // ================= ADMIN =================

    if (role === "admin") {

        title = "Admin Dashboard";

        subtitle =
            "Welcome " + username +
            " • Complete Knowledge 360 Management";

        cards = [

            {
                icon: "🎓",
                title: "Students",
                text: "Add, edit and manage all students."
            },

            {
                icon: "👨‍🏫",
                title: "Teachers",
                text: "Manage teachers and their classes."
            },

            {
                icon: "🏢",
                title: "BR Staff",
                text: "Manage branch representatives."
            },

            {
                icon: "🏫",
                title: "Branches",
                text: "Manage all Knowledge 360 branches."
            },

            {
                icon: "📚",
                title: "Classes & Batches",
                text: "Manage classes, subjects and batches."
            },

            {
                icon: "🕒",
                title: "Attendance",
                text: "Monitor institute-wide attendance."
            },

            {
                icon: "📝",
                title: "Tests & Results",
                text: "Manage tests and student results."
            },

            {
                icon: "💰",
                title: "Fees",
                text: "Manage fees and payment records."
            },

            {
                icon: "📢",
                title: "Notices",
                text: "Create institute-wide announcements."
            },

            {
                icon: "📊",
                title: "Reports",
                text: "View complete institute reports."
            },

            {
                icon: "⚙️",
                title: "Settings",
                text: "Manage website and system settings."
            }

        ];
    }


    // ================= BUILD DASHBOARD =================

    let cardsHTML = "";


    cards.forEach(function(card) {

        cardsHTML += `

            <div class="dashboard-card">

                <div class="dashboard-card-icon">
                    ${card.icon}
                </div>

                <h3>
                    ${card.title}
                </h3>

                <p>
                    ${card.text}
                </p>

                <button
                    onclick="openModule('${card.title}')">

                    Open →

                </button>

            </div>

        `;

    });


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

                ${cardsHTML}

            </div>

        </div>

    `;
}


// ================= MODULE =================

function openModule(module) {

    alert(
        module +
        " module will be connected to the database in the next stage."
    );

}


// ================= LOGOUT =================

function logout() {

    const dashboard =
        document.getElementById("dashboard");

    dashboard.style.display = "none";

    document.querySelector("body").style.overflow = "auto";

    window.scrollTo(0, 0);

}


// ================= CLOSE MODAL =================

window.onclick = function(event) {

    const modal =
        document.getElementById("loginModal");

    if (event.target === modal) {

        closeLogin();

    }

};