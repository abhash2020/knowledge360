let selectedRole = "";

// ========================================
// OPEN LOGIN POPUP
// ========================================

function showLogin(role) {

    selectedRole = role;

    const modal = document.getElementById("loginModal");
    const title = document.getElementById("loginTitle");
    const message = document.getElementById("loginMessage");

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
    else {
        title.innerText = "Knowledge 360 Login";
    }

    if (message) {
        message.innerText = "";
    }

    modal.style.display = "flex";
}


// ========================================
// CLOSE LOGIN POPUP
// ========================================

function closeLogin() {

    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// ========================================
// SUPABASE CONFIGURATION
// ========================================

const SUPABASE_URL =
    "https://pdkzxwyrlzlzukkrnipt.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_u7TKpDrbewwFs-AGEInUJA_c1jV7J_N";


// Check Supabase library
if (!window.supabase) {

    console.error("Supabase library not loaded.");

} else {

    window.sb = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

}


// ========================================
// LOGIN USER
// ========================================

async function loginUser() {

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


    if (username === "" || password === "") {

        if (messageElement) {
            messageElement.innerText =
                "Please enter Login ID and Password.";
        }

        return;
    }


    // ========================================
    // CHECK SUPABASE
    // ========================================

    if (!window.sb) {

        if (messageElement) {
            messageElement.innerText =
                "Supabase is not connected. Please refresh the page.";
        }

        return;
    }


    // ========================================
    // ADMIN / TEACHER / BR LOGIN
    // ========================================

    if (
        selectedRole === "admin" ||
        selectedRole === "teacher" ||
        selectedRole === "br"
    ) {

        if (messageElement) {
            messageElement.innerText =
                "Checking login...";
        }


        // Login with Supabase Authentication

        const { data, error } =
            await window.sb.auth.signInWithPassword({

                email: username,
                password: password

            });


        // Login failed

        if (error) {

            console.error("Login error:", error);

            if (messageElement) {
                messageElement.innerText =
                    "Invalid Login ID or Password.";
            }

            return;
        }


        // ========================================
        // GET USER PROFILE
        // ========================================

        const { data: profile, error: profileError } =
            await window.sb
                .from("profiles")
                .select("full_name, role, branch_id")
                .eq("id", data.user.id)
                .single();


        if (profileError || !profile) {

            console.error(
                "Profile error:",
                profileError
            );

            if (messageElement) {
                messageElement.innerText =
                    "Profile not found. Please contact Admin.";
            }

            await window.sb.auth.signOut();

            return;
        }


        // ========================================
        // CHECK ROLE
        // ========================================

        if (profile.role !== selectedRole) {

            if (messageElement) {
                messageElement.innerText =
                    "Access denied. Wrong login type.";
            }

            await window.sb.auth.signOut();

            return;
        }


        // ========================================
        // SUCCESS
        // ========================================

        if (messageElement) {
            messageElement.innerText =
                "Login successful. Opening portal...";
        }


        setTimeout(function () {

            if (selectedRole === "admin") {

                window.location.href = "admin.html";

            }

            else if (selectedRole === "teacher") {

                window.location.href = "teacher.html";

            }

            else if (selectedRole === "br") {

                window.location.href = "br.html";

            }

        }, 500);


        return;
    }


    // ========================================
    // STUDENT LOGIN
    // ========================================

    if (selectedRole === "student") {

        // For now, keep your existing student portal
        // We will connect student authentication
        // to Supabase in the next step.

        window.location.href = "student.html";

        return;
    }


    // ========================================
    // INVALID ROLE
    // ========================================

    if (messageElement) {

        messageElement.innerText =
            "Please select a valid login type.";

    }

}


// ========================================
// CLOSE POPUP WHEN CLICKING OUTSIDE
// ========================================

window.addEventListener("click", function (event) {

    const modal =
        document.getElementById("loginModal");

    if (event.target === modal) {

        closeLogin();

    }

});
// ============================================
// REGISTRATION SYSTEM
// ============================================

function openRegistration() {

    closeLogin();

    const modal =
        document.getElementById("registrationModal");

    if (modal) {
        modal.style.display = "flex";
    }
}


function closeRegistration() {

    const modal =
        document.getElementById("registrationModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// ============================================
// CHANGE REGISTRATION FORM
// ============================================

function changeRegistrationForm() {

    const role =
        document.getElementById("registerRole").value;

    const studentFields =
        document.getElementById(
            "studentRegistrationFields"
        );

    const teacherFields =
        document.getElementById(
            "teacherRegistrationFields"
        );


    if (role === "student") {

        studentFields.style.display = "block";
        teacherFields.style.display = "none";

    }

    else if (role === "teacher") {

        studentFields.style.display = "none";
        teacherFields.style.display = "block";

    }
}


// ============================================
// REGISTER USER
// ============================================

async function registerUser() {

    const message =
        document.getElementById(
            "registrationMessage"
        );


    const role =
        document.getElementById(
            "registerRole"
        ).value;


    const name =
        document.getElementById(
            "registerName"
        ).value.trim();


    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim();


    const mobile =
        document.getElementById(
            "registerMobile"
        ).value.trim();


    const branch =
        document.getElementById(
            "registerBranch"
        ).value;


    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    const confirmPassword =
        document.getElementById(
            "registerConfirmPassword"
        ).value;


    // ========================================
    // BASIC VALIDATION
    // ========================================

    if (
        !name ||
        !email ||
        !mobile ||
        !branch ||
        !password ||
        !confirmPassword
    ) {

        message.innerText =
            "Please fill all required fields.";

        return;
    }


    if (password !== confirmPassword) {

        message.innerText =
            "Passwords do not match.";

        return;
    }


    if (password.length < 6) {

        message.innerText =
            "Password must contain at least 6 characters.";

        return;
    }


    message.innerText =
        "Submitting registration...";


    // ========================================
    // STUDENT REGISTRATION
    // ========================================

    if (role === "student") {

        const board =
            document.getElementById(
                "registerBoard"
            ).value;


        const studentClass =
            document.getElementById(
                "registerClass"
            ).value.trim();


        const tec =
            document.getElementById(
                "registerTEC"
            ).value.trim();


        if (!board || !studentClass) {

            message.innerText =
                "Please select Board and enter Class.";

            return;
        }


        // Create Supabase account

        const { data, error } =
            await sb.auth.signUp({

                email: email,
                password: password,

                options: {
                    data: {
                        full_name: name,
                        role: "student"
                    }
                }

            });


        if (error) {

            message.innerText =
                error.message;

            console.error(error);

            return;
        }


        if (!data.user) {

            message.innerText =
                "Registration could not be completed.";

            return;
        }


        // Store registration request

        const { error: requestError } =
            await sb
                .from("registration_requests")
                .insert({

                    id: data.user.id,

                    full_name: name,

                    email: email,

                    mobile: mobile,

                    role: "student",

                    board: board,

                    class: studentClass,

                    branch: branch,

                    tec: tec || null,

                    status: "pending"

                });


        if (requestError) {

            message.innerText =
                "Account created, but registration request could not be saved.";

            console.error(requestError);

            return;
        }


        message.innerText =
            "✅ Registration submitted successfully. Please wait for approval.";


        setTimeout(function () {

            closeRegistration();

        }, 2500);


        return;
    }


    // ========================================
    // TEACHER REGISTRATION
    // ========================================

    if (role === "teacher") {

        const subject =
            document.getElementById(
                "registerSubject"
            ).value.trim();


        if (!subject) {

            message.innerText =
                "Please enter your teaching subject.";

            return;
        }


        const { data, error } =
            await sb.auth.signUp({

                email: email,
                password: password,

                options: {
                    data: {
                        full_name: name,
                        role: "teacher"
                    }
                }

            });


        if (error) {

            message.innerText =
                error.message;

            console.error(error);

            return;
        }


        if (!data.user) {

            message.innerText =
                "Registration could not be completed.";

            return;
        }


        const { error: requestError } =
            await sb
                .from("registration_requests")
                .insert({

                    id: data.user.id,

                    full_name: name,

                    email: email,

                    mobile: mobile,

                    role: "teacher",

                    subject: subject,

                    branch: branch,

                    status: "pending"

                });


        if (requestError) {

            message.innerText =
                "Account created, but registration request could not be saved.";

            console.error(requestError);

            return;
        }


        message.innerText =
            "✅ Teacher registration submitted. Admin approval is required.";


        setTimeout(function () {

            closeRegistration();

        }, 2500);


        return;
    }

}