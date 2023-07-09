window.addEventListener('load', () => {
    const imgFile = document.getElementById('imgFile');
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const email = document.getElementById('email');
    const old_email = document.getElementById('old_email');
    const new_email = document.getElementById('new_email');
    const confirm_new_email = document.getElementById('confirm_new_email');
    const old_password = document.getElementById('old_password');
    const new_password = document.getElementById('new_password');
    const confirm_new_password = document.getElementById('confirm_new_password');
    const phone = document.getElementById('phone');
    const country = document.getElementById('country');
    const province = document.getElementById('province');
    const education = document.getElementById('education');
    const CNIC = document.getElementById('CNIC');
    const save_btn = document.getElementById('save_btn');
    const img_placeholder_container = document.getElementById('img_placeholder_container');
    const img_placeholder = document.getElementById('img_placeholder');
    let img_placeholder_link = "../images/gig-placeholder.png";
    const img_placeholder_hover_link = "../images/gig-placeholder-hover.png";

    // set user data
    if (user?.image) {
        img_placeholder_link = user.image;
        img_placeholder.src = img_placeholder_link;
    }

    if (user?.firstName) {
        first_name.value = user.firstName;
    }
    if (user?.lastName) {
        last_name.value = user.lastName;
    }
    if (user?.email) {
        email.value = user.email;
        old_email.value = user.email;
    }
    if (user?.password) {
        old_password.value = user.password;
    }
    if (user?.phone) {
        phone.value = user.phone;
    }
    if (user?.country) {
        country.value = user.country;
    }
    if (user?.province) {
        province.value = user.province;
    }
    if (user?.education) {
        education.value = user.education;
    }
    if (user?.CNIC) {
        CNIC.value = user.CNIC;
    }



    img_placeholder_container.addEventListener('mouseover', () => {
        img_placeholder.src = img_placeholder_hover_link;
    });
    img_placeholder_container.addEventListener('mouseout', () => {
        img_placeholder.src = img_placeholder_link;
    });
    img_placeholder_container.addEventListener('click', () => {
        imgFile.click();
    });

    imgFile.addEventListener('change', () => {
        const file = imgFile.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                img_placeholder_link = reader.result;
                img_placeholder.src = img_placeholder_hover_link;
                first_name.focus();
            }
            reader.readAsDataURL(file);
        } else {
            img_placeholder_link = "../images/gig-placeholder.png";
            img_placeholder.src = img_placeholder_hover_link;
        }
    });
    const updateUser = () => {

        const file = imgFile?.files[0];
        if (!first_name.value && !imgFile && file && !last_name.value && !email.value && !phone.value && !country.value && !province.value && !education.value && !CNIC.value) {
            alert("Please fill at least one field to update");
            return;
        }
        if (new_email.value || confirm_new_email.value) {
            if (!old_email.value) {
                alert("Please enter your old email");
                return;
            }
            if (new_email.value !== confirm_new_email.value) {
                alert("New email and confirm new email does not match");
                return;
            }
        }
        if (new_password.value || confirm_new_password.value) {
            if (!old_password.value) {
                alert("Please enter your old password");
                return;
            }
            if (new_password.value !== confirm_new_password.value) {
                alert("New password and confirm new password does not match");
                return;
            }
        }
        const formData = new FormData();
        if (file) {
            formData.append('image', file);
        }
        if (first_name.value) {
            formData.append('firstName', first_name.value);
        }
        if (last_name.value) {
            formData.append('lastName', last_name.value);
        }
        if (phone.value) {
            formData.append('phone', phone.value);
        }
        if (country.value) {
            formData.append('country', country.value);
        }
        if (province.value) {
            formData.append('province', province.value);
        }
        if (CNIC.value) {
            formData.append('CNIC', CNIC.value);
        }
        if (new_email.value) {
            formData.append('email', new_email.value);
        }
        if (new_password.value) {
            formData.append('old_password', old_password.value);
            formData.append('password', new_password.value);

        }

        fetch("/api/user/", {
            method: "PUT",
            headers: {
                "authorization": "Bearer " + token
            },
            body: formData
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    sessionStorage.setItem("user", JSON.stringify(data));
                    alert("User updated successfully");
                    window.location.href = "/admin_portal/user-profile.html";
                })
            } else if (res.status === 400 || res.status === 404) {
                res.json().then(data => {
                    alert(data);
                })
            } else {
                alert("ERROR!!! While updating user, Please try again later.");
            }
        }).catch(err => {
            console.log(err)
            alert("ERROR!!! While updating user, Please try again later.");
        });

    }//end of UPDATE USER method

    save_btn.addEventListener('click', () => {
        updateUser();
    });
});