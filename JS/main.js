// *******************************Global******************************
let documentHTML = document;
let siteName = documentHTML.getElementById("siteName");
let siteUrl = documentHTML.getElementById("siteUrl");
let addBtn = documentHTML.getElementById("addBtn");
let alertName = documentHTML.getElementById("alertName");
let alertUrl = documentHTML.getElementById("alertUrl");
let alertExist = documentHTML.getElementById("alertExist");
let updateBtn = documentHTML.getElementById("updateBtn");
let searchBook = documentHTML.getElementById("searchBook");
let inputs = documentHTML.getElementsByClassName("form-control");
indexUpdate = 0;
let sites = [];
// *******************************When START******************************
if (getLocal() !== null) {
  sites = getLocal();
  displayData();
}

// *******************************Events******************************
addBtn.addEventListener("click", function () {
  addSites();
});

updateBtn.addEventListener("click", function () {
  updateData();
});

searchBook.addEventListener("input", function () {
  searchData();
});
// *******************************functions******************************
function addSites() {
  if (nameValidation() & urlValidation()) {
    let site = {
      name: siteName.value,
      url: siteUrl.value,
    };
    sites.push(site);
    displayData();
    setLocal();
    resetForm();
  }
}
function displayData() {
  let tableData = ``;
  let term = searchBook.value.toLowerCase();
  for (let i = 0; i < sites.length; i++) {
    if (sites[i].name.toLowerCase().includes(term)) {
      tableData += `
        <tr>
        <td>${sites[i].name
          .toLowerCase()
          .replaceAll(
            term,
            `<span class='bg-primary text-white'>${term}</span>`
          )}</td>
        <td><a href="${
          sites[i].url
        }" target="_blank" class="btn btn-outline-primary">Visit website <i class="fa-solid fa-arrow-right fa-beat"></i></a></td>
        <td>
    <div class="hstack gap-3 justify-content-center">
        <button class="btn btn-outline-warning" onclick="setUpdateInput(${i})">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn btn-outline-danger" onclick="deleteRow(${i})">
            <i class="fa-solid fa-trash"></i>
          </button>
    </div>
</td>
        </tr>
        `;
    }
  }
  documentHTML.getElementById("tableBody").innerHTML = tableData;
}
function setLocal() {
  localStorage.setItem("userInputs", JSON.stringify(sites));
}
function getLocal() {
  return JSON.parse(localStorage.getItem("userInputs"));
}
function resetForm() {
  for (let i = 0; i < sites.length; i++) {
    siteName.value = "";
    siteUrl.value = "";
  }
}
function deleteRow(index) {
  sites.splice(index, 1);
  setLocal();
  displayData();
}

function setUpdateInput(index) {
  indexUpdate = index;
  siteName.value = sites.at(index).name;
  siteUrl.value = sites.at(index).url;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateData() {
  let site = {
    name: siteName.value,
    url: siteUrl.value,
  };
  sites.splice(indexUpdate, 1, site);
  setLocal();
  displayData();
  resetForm();
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

function searchData() {
  displayData();
}

function nameValidation() {
  if (siteName.value == "") {
    alertName.classList.remove("d-none");
    return false;
  } else {
    alertName.classList.add("d-none");
    return true;
  }
}

function urlValidation() {
  if (siteUrl.value == "") {
    alertUrl.classList.remove("d-none");
    return false;
  } else {
    let exist = false;
    for (let i = 0; i < sites.length; i++) {
      if (sites[i].url === siteUrl.value) {
        exist = true;
        break;
      }
    }
    if (exist === true) {
      alertExist.classList.remove("d-none");
    } else {
      alertExist.classList.add("d-none");
    }

    alertUrl.classList.add("d-none");
    return true;
  }
}
