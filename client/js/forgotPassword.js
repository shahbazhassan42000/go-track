window.addEventListener("load", () => {
    const reset_btn = document.getElementById("reset_btn");
    const email = document.getElementById("email");
    reset_btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!email.value) {
            swal.fire("ERROR!!!", "Email can't be blank", "error");
            return;
        }
        fetch('/api/user/resetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: email.value
                }
            })
        }).then(res => {
            if (res.status === 200) {
                swal.fire("SUCCESS!!!", "Reset password link has been sent to your email", "success");
            } else if (res.status === 404) {
                swal.fire("ERROR!!!", "Email is not registered", "error");
            } else {
                swal.fire("ERROR!!!", "While resetting password, Please try again later.", "error");
            }
        }).catch(err => {
            console.log(err);
            swal.fire("ERROR!!!", "While resetting password, Please try again later.", "error");
        });
    });
});