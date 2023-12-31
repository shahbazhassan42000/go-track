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
                if (data?.role === "CANDIDATE") window.location.href = "/candidate_portal/index.html";
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
if (user?.role === "CANDIDATE") window.location.href = "/candidate_portal/index.html";
window.addEventListener("load", () => {
    const logout_btn = document.getElementById("logout_btn");
    logout_btn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/";
    });


    const approve_count = document.getElementById("approve_count");
    const reject_count = document.getElementById("reject_count");
    const pending_count = document.getElementById("pending_count");
    const received_count = document.getElementById("received_count");

    // get all application count group by status
    fetch("/api/application/count", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }).then(res => {
        if (res.status === 200) {
            res.json().then(data => {
                let approve = 0, reject = 0, pending = 0, received = 0;
                data.forEach(d => {
                    if (d.status === "Approved") {
                        approve = d.count;
                    } else if (d.status === "Rejected") {
                        reject = d.count;
                    } else if (d.status === "Pending") {
                        pending = d.count;
                    } else if (d.status === "Received") {
                        received = d.count;
                    }
                });
                approve_count.innerHTML = approve;
                reject_count.innerHTML = reject;
                pending_count.innerHTML = pending;
                received_count.innerHTML = received;
            })
        }
    });
});