//if (!user) window.location.href = "/";
//if (user?.role === "ADMIN") window.location.href = "/";
window.addEventListener("load", () => {
    const submit_btn = document.getElementById("submit_btn");
    const name = document.getElementById("name");
    const father_name = document.getElementById("father_name");
    const gender = document.getElementById("gender");
    const matric = document.getElementById("matric");
    const intermediate = document.getElementById("intermediate");
    const CNIC = document.getElementById("CNIC");
    const education = document.getElementById("education");
    const phone = document.getElementById("phone");
    const province = document.getElementById("province");
    const DOB = document.getElementById("DOB");
    const address = document.getElementById("address");
    const email = document.getElementById("email");

    // set user data values
    if (user?.name) name.value = user.name;
    if (user?.phone) phone.value = user.phone;
    if (user?.email) email.value = user.email;
    if (user?.education) education.value = user.education;
    if (user?.province) province.value = user.province;
    if (user?.CNIC) CNIC.value = user.CNIC;

    submit_btn.addEventListener("click", (e) => {
        e.preventDefault();
        // check if all fields are filled
        if (
            !name.value ||
            !father_name.value ||
            !gender.value ||
            !matric.value ||
            !intermediate.value ||
            !CNIC.value ||
            !education.value ||
            !phone.value ||
            !province.value ||
            !DOB.value ||
            !address.value ||
            !email.value
        ) {
            alert("Please fill all the fields");
            return;
        }

        const application = {
            name: name.value,
            fatherName: father_name.value,
            gender: gender.value,
            matric: matric.value,
            intermediate: intermediate.value,
            CNIC: CNIC.value,
            education: education.value,
            phone: phone.value,
            province: province.value,
            DOB: DOB.value,
            address: address.value,
            email: email.value,
        };

        // send application to server
        fetch("/api/application", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ application }),
        }).then((res) => {
            if (res.status === 200) {
                alert("Application submitted successfully");
                window.location.href = "/apply.html";
            } else {
                alert("Error while submitting application");
            }
        }).catch((err) => {
            console.log(err);
            alert("Error while submitting application");
        });x
    });

});

