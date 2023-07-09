if (!user) window.location.href = "/";
if (user?.role === "ADMIN") window.location.href = "/";
window.addEventListener("load", () => {
    const submit_btn = document.getElementById("submit_btn");
    const name = document.getElementById("name");
    const father_name = document.getElementById("father_name");
    const relationship = document.getElementById("relationship");
    const father_CNIC = document.getElementById("father_CNIC");
    const father_phone = document.getElementById("father_phone");
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
            !relationship.value ||
            !father_CNIC.value ||
            !father_phone.value ||
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

        const application = {}

    });

});

