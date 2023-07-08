window.addEventListener("load", () => {
    const register_btn = document.getElementById("register_btn");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const passport = document.getElementById("password-field");
    const confirm_password = document.getElementById("confirm-password-field");

    register_btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (name.value === "" || email.value === "" || passport.value === "" || confirm_password.value === "") {
            alert("Please fill all fields");
        } else if (passport.value !== confirm_password.value) {
            alert("Password does not match");
        } else {
            const data = {
                name: name.value,
                email: email.value,
                password: passport.value
            }
            fetch("/api/user/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        name: name.value,
                        email: email.value,
                        password: passport.value,
                        role: "CANDIDATE"
                    }
                }),
            }).then(response => {
                if (response.status === 200) {
                    alert("Register successfully");
                    window.location.href = "/login.html";
                }
                else if (response.status === 400) {
                    response.json().then(data => {
                        alert(data);

                    }).catch(err => {
                        alert("Register failed, Please try again later!");
                    })
                }
                else {
                    alert("Register failed, Please try again later!");
                }
            }).catch(err => {
                alert("Register failed, Please try again later!");
            }).finally(() => {
                //clear console
                console.clear();
            });
        }
    });
})