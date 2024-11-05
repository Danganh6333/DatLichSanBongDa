function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("close");
  const icon = document.querySelector("#toggle-btn i");
  icon.classList.toggle("fa-angle-double-left");
  icon.classList.toggle("fa-angle-double-right");
}

const dialog = document.querySelector("dialog");

const openPopupButtons = document.querySelectorAll(".open-popup");

openPopupButtons.forEach((button) => {
  button.addEventListener("click", function () {
    dialog.showModal();
  });
});

document.querySelector(".close-btn").addEventListener("click", function () {
  dialog.close();
});

const rowsPerPage = 5; 
const tableBody = document.getElementById("sanBongTable");
const pagination = document.getElementById("pagination");


const data = Array.from(tableBody.querySelectorAll("tr"));

function displayTablePage(page) {

  tableBody.innerHTML = "";

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);

  for (let i = startIndex; i < endIndex; i++) {
    tableBody.appendChild(data[i]);
  }

  displayPagination(page);
}

function displayPagination(currentPage) {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(data.length / rowsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.classList.add("pagination-btn");
    if (i === currentPage) button.classList.add("active");

    button.addEventListener("click", () => displayTablePage(i));
    pagination.appendChild(button);
  }
}

displayTablePage(1);

function appendToTable(sanBong) {
  const tableBody = document.getElementById("sanBongTable");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${tableBody.children.length + 1}</td>
    <td>${sanBong.tenSan}</td>
    <td>${sanBong.diaDiem}</td>
    <td>${sanBong.giaTheoGio}</td>
    <td>${sanBong.trangThai}</td>
    <td>
      <button class="icon-btn" class="open-popup" >
          <i class="fas fa-edit"></i>
      </button>
      <button class="icon-btn" onclick="xoaSanBong('${sanBong._id}')">
        <i class="fas fa-trash-alt"></i>
      </button>
    </td>
`;
  tableBody.appendChild(newRow);
}
