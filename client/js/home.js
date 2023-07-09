// check if token exists in local storage
const token = localStorage.getItem("token");
if (token) {
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
    const navdropdown = document.getElementById("navdropdown");
    const dropdownMenu2 = document.getElementById("dropdownMenu2");
    const nav_item_1 = document.getElementById("nav_item_1");
    const nav_item_2 = document.getElementById("nav_item_2");

    if (token) {
        dropdownMenu2.innerText = "Dashboard";
        nav_item_1.innerText = "Dashboard";
        nav_item_2.innerText = "Profile";

        if (user?.role === "ADMIN") {
            nav_item_1.href = "/admin_portal/index.html";
            nav_item_2.href = "/admin_portal/user-profile.html";

        } else {
            nav_item_1.href = "/candidate_portal/index.html";
            nav_item_2.href = "/candidate_portal/user-profile.html";
        }
    } else {
        dropdownMenu2.innerText = "Login";
        nav_item_1.innerText = "Login";
        nav_item_2.innerText = "Admin";

        nav_item_1.href = "/login.html";
        nav_item_2.href = "/admin_login.html";
    }
});