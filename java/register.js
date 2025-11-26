document.getElementById("registerBtn").addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("Semua data harus diisi.");
        return;
    }

    // Simpan ke localStorage (sebelum pakai database asli)
    const userData = { name, email, password };
    localStorage.setItem("user_" + email, JSON.stringify(userData));

    alert("Akun berhasil dibuat!");
    location.href = "login.html";
});
