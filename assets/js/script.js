const dataInsert = document.getElementById("dataInsert");
const form = document.getElementById("form");
const cityInput = document.getElementById("city");
const ageInput = document.getElementById("age");
const nameInput = document.getElementById("name");
const saveButton = document.querySelector("#form button");

let data = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

let renderData = () => {
  saveButton.innerHTML = `<i class="bi bi-floppy"></i> Save`;
  if (data.length === 0) {
    dataInsert.innerHTML = `<tr><td colspan="6" class="no-data">No Data Available</td></tr>
        <tr><td colspan="6"><img src="./assets/no task.avif" alt="no image" width="30%"></td></tr>`;
    return;
  }
  dataInsert.innerHTML = "";
  data
    .map((item, index) => {
      dataInsert.innerHTML += `
    <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.city}</td>
          <td><i onclick="editData(${index})" class="bi bi-pencil-square"></i></td>
          <td><i onclick="deleteData(${index})" class="bi bi-trash"></i></td>
          </tr>
          `;
    })
    .join("");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = nameInput.value.trim();
  let age = ageInput.value.trim();
  let city = cityInput.value.trim();
  dataPush(name, age, city);

  cityInput.value = "";
  ageInput.value = "";
  nameInput.value = "";
});

let dataPush = (name, age, city) => {
  if (!name || !age || !city) return alert("Please fill all the fields");
  if (editIndex === null) {
    // Add new Data
    data.push({ name, age, city });
  } else {
    // Update existing data
    data[editIndex] = { name, age, city };
    editIndex = null; // Reset edit
  }
  localStorage.setItem("users", JSON.stringify(data));
  renderData();
  form.reset(); // Clear Form Input
};

[nameInput, ageInput, cityInput].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let name = nameInput.value.trim();
      let age = ageInput.value.trim();
      let city = cityInput.value.trim();
      dataPush(name, age, city);
    }
  });
});

// Edit Data
let editData = (index) => {
  let user = data[index];
  nameInput.value = user.name;
  ageInput.value = user.age;
  cityInput.value = user.city;

  editIndex = index; // Store index of item being edited
  saveButton.innerHTML = `<i class="bi bi-pen-fill"></i> Update`;
};

// ❌ Delete Data
let deleteData = (index) => {
  if (confirm("Are you sure you want to delete this entry?")) {
    data.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(data));
    cityInput.value = "";
    ageInput.value = "";
    nameInput.value = "";
    renderData();
  }
};

renderData();
