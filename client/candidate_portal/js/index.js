var token = localStorage.getItem("token");
if (!token) window.location.href = "/";
var user = JSON.parse(sessionStorage.getItem("user"));
if (!user) {
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
                user = data;
                if (data?.role === "ADMIN") window.location.href = "/admin_portal/index.html";
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
if (user?.role === "ADMIN") window.location.href = "/admin_portal/index.html";
window.addEventListener("load", () => {
    const logout_btn = document.getElementById("logout_btn");
    logout_btn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/";
    });
});