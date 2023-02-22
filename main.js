// подключаем db.json с помощю API через терминал
const API = "http://localhost:8000/contacktbook";

// Вытаскиваем все элементы html в JS
let name = document.querySelector("#name");
let surname = document.querySelector("#surname");
let photo = document.querySelector("#photo");
let number = document.querySelector("#number");
let email = document.querySelector("#email");
let btnAdd = document.querySelector("#btn-add");
const list = document.querySelector(".list-group");

btnAdd.addEventListener("click", async function () {
  let obj = {
    name: name.value,
    surname: surname.value,
    photo: photo.value,
    number: number.value,
    email: email.value,
  };

  if (
    (!obj.name.trim(),
    !obj.surname.trim(),
    !obj.photo.trim(),
    !obj.number.trim(),
    !obj.email.trim())
  ) {
    alert("заполните все поля!");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });

  name.value = "";
  surname.value = "";
  photo.value = "";
  number.value = "";
  email.value = "";
  getTodos();
});

async function getTodos() {
  try {
    let res = await fetch(API);
    let todos = await res.json();
    render(todos);
  } catch (error) {
    console.log(error);
  }
}

function render(todos) {
  list.innerHTML = "";
  todos.forEach((item) => {
    list.innerHTML += `
    <div class="listt">
    <li class="list-group bg-transparent">
      <p>${item.name}</p>
    </li>
    <li class="list-group bg-transparent">
      <p>${item.surname}</p>
    </li>
    <li class="list-group bg-transparent">
      <img src=${item.photo} alt="" style= "width: 200px">
    </li>
    <li class="list-group bg-transparent">
      <p>${item.number}</p>
    </li>
    <li class="list-group bg-transparent">
      <p>${item.email}</p>
    </li>
    <li class="list-group bg-transparent">
      <button onclick="deleteTodo(${item.id})" class="btn btn-outline-danger">delete</button>
      <button onclick="editTodo(${item.id})" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">edit</button>
    </li>
    </div>
  `;
  });
}

getTodos();

async function deleteTodo(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getTodos();
  } catch (error) {
    console.log(error);
  }
}

//? edit

let inpEdit = document.querySelector(".inp-edit");
let inpEdit1 = document.querySelector(".inp-edited");
let inpEdit2 = document.querySelector(".inp-editing");
let inpEdit3 = document.querySelector(".inp-edits");
let inpEdit4 = document.querySelector(".inp-edite");
let saveBtn = document.querySelector(".save-btn");
let editModal = document.querySelector("#exampleModal");

let editedObj = {};

inpEdit.addEventListener("input", (e) => {
  editedObj.name = e.target.value;
});
inpEdit1.addEventListener("input", (e) => {
  editedObj.surname = e.target.value;
});
inpEdit2.addEventListener("input", (e) => {
  editedObj.photo = e.target.value;
});
inpEdit3.addEventListener("input", (e) => {
  editedObj.number = e.target.value;
});
inpEdit4.addEventListener("input", (e) => {
  editedObj.email = e.target.value;
});

async function editTodo(id) {
  try {
    let res = await fetch(`${API}/${id}`);
    let objToEdit = await res.json();
    inpEdit.value = objToEdit.name;
    inpEdit1.value = objToEdit.surname;
    inpEdit2.value = objToEdit.photo;
    inpEdit3.value = objToEdit.number;
    inpEdit4.value = objToEdit.email;
    saveBtn.setAttribute("id", `${id}`);
  } catch (error) {
    console.log(error);
  }
}

saveBtn.addEventListener("click", async (e) => {
  let id = e.target.id;
  try {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(editedObj),
    });
  } catch (error) {
    console.log(error);
  }
  getTodos();
  let modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
  editedObj = {};
});
