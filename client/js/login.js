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
            swal.fire("Error!!!", "Please fill all fields", "error");
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
                        console.log(res, data);
                        // candidate_portal/index.html
                        swal.fire("Success!!!", "Login Successful", "success");
                        window.location.href = "/";
                    }).catch((err) => {
                        console.log(err);
                        swal.fire("Error!!!", "Error while login", "error");
                    });
                }
                else if (res.status === 400 || res.status == 403) {
                    res.json().then((data) => {
                        swal.fire("Error!!!", data, "error");
                    }).catch((err) => {
                        console.log(err);
                        swal.fire("Error!!!", "Error while login", "error");
                    });
                }
            }).catch((err) => {
                console.log(err);
                swal.fire("Error!!!", "Error while login", "error");
            }).finally(() => {
                //clear console
                console.clear();

            });
        }
    });
});