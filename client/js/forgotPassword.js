window.addEventListener("load", () => {
    const reset_btn = document.getElementById("reset_btn");
    const email = document.getElementById("email");
    reset_btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!email.value) {
            alert("Email can't be blank");
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
                alert("Reset password link has been sent to your email");
            } else if (res.status === 400) {
                alert("Email is not registered");
            } else {
                alert("ERROR!!! While resetting password, Please try again later.");
            }
        }).catch(err => {
            console.log(err);
            alert("ERROR!!! While resetting password, Please try again later.");
        });
    });
});