window.addEventListener("load", () => {
    const apply_now_btn = document.getElementById("apply_now_btn");
    if (user) {
        if (user?.role === "ADMIN") {
            apply_now_btn.style.display = "none";
        } else {
            apply_now_btn.style.display = "inline-block";
            apply_now_btn.href = "/apply.html";
        }

    } else {
        apply_now_btn.style.display = "inline-block";
        apply_now_btn.href = "/login.html";
    }
});