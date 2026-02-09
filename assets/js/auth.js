function login() {
  const nama = document.getElementById("nama").value;
  if (!nama) return alert("Nama wajib diisi");
  localStorage.setItem("user", JSON.stringify({
    nama,
    avatar: generateAvatar(nama)
  }));
  location.href = "dashboard.html";
}

function generateAvatar(name) {
  return name.charAt(0).toUpperCase();
}
