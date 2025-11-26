document.getElementById("loginBtn").addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const getUser = localStorage.getItem("user_" + email);

    if (!getUser) {
        alert("Akun tidak ditemukan!");
        return;
    }

    const user = JSON.parse(getUser);

    if (user.password !== password) {
        alert("Password salah!");
        return;
    }

    // Simpan sesi login
    localStorage.setItem("loggedUser", email);

    alert("Login berhasil!");
    location.href = "index.html";
});
