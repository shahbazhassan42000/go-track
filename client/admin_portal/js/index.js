var token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/";
}
if (token) {
    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
        // if user role is candidate then redirect to candidate portal
        if (user.role === "CANDIDATE") {
            window.location.href = "/candidate_portal/index.html";
        }
    } else {
        //get user by token from server
        fetch("/api/user/getByToken", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    sessionStorage.setItem("user", JSON.stringify(data));
                    if (data.role === "CANDIDATE") {
                        window.location.href = "/candidate_portal/index.html";
                    }
                })
            } else {
                localStorage.removeItem("token");
                sessionStorage.removeItem("user");
                window.location.href = "/";
            }
        }
        ).catch(err => {
            localStorage.removeItem("token");
            sessionStorage.removeItem("user");
            window.location.href = "/";
        });
    }
}

window.addEventListener("load", () => {
    const logout_btn = document.getElementById("logout_btn");
    logout_btn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/login.html";
    });
});