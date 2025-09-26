    // const jsonServer = require('json-server');
    // const server = jsonServer.create();
    // const router = jsonServer.router('db.json'); // Path to your db.json
    // const middlewares = jsonServer.defaults();
    // const port = process.env.PORT || 3000; // Use Render's assigned port or default to 3000

    // server.use(middlewares);
    // server.use(router);
    // server.listen(port, () => {
    //   console.log(`JSON Server is running on port ${port}`);
    // });
   
    const API_URL = "https://text-api-47.onrender.com/users";

async function fetchUsers() {
  try {
    let res = await axios.get(API_URL);
    displayUsers(res.data);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}


function displayUsers(users) {
  let container = document.getElementById("container");
  container.innerHTML = "";

  users.forEach(user => {
    let card = document.createElement("div");
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p>Age: ${user.age}</p>
    
      <button onclick="deleteUser(${user.id})">Delete</button>
    `;
    container.appendChild(card);
  });
}

document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;


  try {
    await axios.post(API_URL, { name, age});
    fetchUsers(); 
    document.getElementById("userForm").reset();
  } catch (err) {
    console.error("Error adding user:", err);
  }
});


async function deleteUser(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchUsers(); 
  } catch (err) {
    console.error("Error deleting user:", err);
  }
}


fetchUsers();
