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
const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const pass = getParameterByName('pass');
const id = getParameterByName('id');
if (!pass || !id) window.location.href = "/";
window.addEventListener("load", () => {
    let verification = true;
    fetch('/api/token/verification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: {
                id: id,
                token: pass
            }
        })
    }).then(res => {
        if (res.status === 200) {
            verification = true;
        } else {
            verification = false;
        }
    }).catch(err => {
        console.log(err);
        verification = false;
    }).finally(() => {
        console.log("finally", verification);
        const invalid = document.getElementById("invalid");
        const valid = document.getElementById("valid");
        const reset_btn = document.getElementById("reset_btn");
        const password = document.getElementById("password");
        if (verification) {
            console.log("changing valid visibility")
            valid.style.display = "flex";
            invalid.style.display = "none";
        } else {
            console.log("changing invalid visibility")
            valid.style.display = "none";
            invalid.style.display = "block";
        }
        reset_btn.addEventListener("click", () => {
            if (!password.value) {
                swal.fire("ERROR!!!", "Password can't be blank", "error");
                return;
            }

            fetch('/api/user/updatePassword/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        id: id,
                        password: password.value
                    }
                })
            }).then(res => {
                if (res.status === 200) {
                    swal.fire("SUCCESS!!!", "Password updated successfully", "success");
                    window.location.href = "/login.html";
                } else {
                    swal.fire("ERROR!!!", "While updating password.", "error");
                }
            }).catch(err => {
                console.log(err);
                swal.fire("ERROR!!!", "While updating password.", "error");
            });
        });
    });

});