window.addEventListener("load", () => {
    const logout_btn = document.getElementById("logout_btn");
    logout_btn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/login.html";
    });
});