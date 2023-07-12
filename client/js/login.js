if (localStorage.getItem("token")) {
    window.location.href = "/";
}
window.addEventListener("load", () => {
    const login_btn = document.getElementById("login_btn");
    const email = document.getElementById("email");
    const password = document.getElementById("password-field");
    login_btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (email.value === "" || password.value === "") {
            alert("Please fill all fields");
        } else {
            const user = {
                email: email.value,
                password: password.value
            };
            fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user })
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        localStorage.setItem("token", data);
                        // candidate_portal/index.html
                        window.location.href = "/";
                    }).catch((err) => {
                        console.log(err);
                        alert("Error while login");
                    });
                }
                else if (res.status === 400 || res.status == 403) {
                    res.json().then((data) => {
                        alert(data);
                    }).catch((err) => {
                        console.log(err);
                        alert("Error while login");
                    });
                }
            }).catch((err) => {
                console.log(err);
                alert("Error while login");
            }).finally(() => {
                //clear console
                console.clear();
            });
        }
    });
});