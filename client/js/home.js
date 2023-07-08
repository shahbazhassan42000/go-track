// check if token exists in local storage
const token = localStorage.getItem("token");
if (token) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
        // if user role is admin then redirect to admin portal 
        if (user.role === "ADMIN") {
            window.location.href = "/admin_portal/index.html";
        }
        // if user role is candidate then redirect to candidate portal
        else if (user.role === "CANDIDATE") {
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
                    if (data.role === "ADMIN") {
                        window.location.href = "/admin_portal/index.html";
                    } else if (data.role === "CANDIDATE") {
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
