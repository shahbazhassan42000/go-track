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
                    console.log(res, data);
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
    if (token) {
        dropdownMenu2.innerText = "Dashboard";
        nav_item_1.innerText = "Dashboard";

        if (user?.role === "ADMIN") {
            nav_item_1.href = "/admin_portal/index.html";

        } else {
            nav_item_1.href = "/candidate_portal/index.html";
        }
    } else {
        dropdownMenu2.innerText = "Login";
        nav_item_1.innerText = "Login";

        nav_item_1.href = "/login.html";
    }
});