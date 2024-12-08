document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const response = await fetch("http://localhost:3001/api/auth/user", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const user = await response.json();
  if (!response.ok) {
    window.location.href = "login.html";
  } else {
    // Display stored passwords
    const passwordsDiv = document.getElementById("passwords");
    passwordsDiv.innerHTML = `<p>Welcome, ${user.username}</p>`;
  }
});
