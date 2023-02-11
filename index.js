// Define variables
const addEmpButton = document.querySelector('.add_emp');
const formDisplay = document.querySelector('form');
const employeeData = document.querySelector('.view');
const nameInput = document.querySelector('#name');
const ageInput = document.querySelector('#age');
const imageInput = document.querySelector('#img');
const numberInput = document.querySelector('#number');
const emailInput = document.querySelector('#email');
const employeeList = document.querySelector('.emp_list');
const employeeInfo = document.querySelector('.info_user');
const cancelButton = document.querySelector('.btn_cancel');

// Define event listeners
addEmpButton.addEventListener('click', toggleFormDisplay);
formDisplay.addEventListener('submit', addEmployee);

employeeList.addEventListener('click', deleteEmployee);
document.addEventListener('DOMContentLoaded', displayEmployeeList);

// Define functions
function toggleFormDisplay() {
  formDisplay.classList.toggle('show');
  employeeData.classList.add('opacity');
}

function addEmployee(event) {
  event.preventDefault();

  const employee = {
    img:imageInput.value,
    name: nameInput.value,
    age: ageInput.value,
    email: emailInput.value,
    number:numberInput.value
  };

  let employeeArray = getLocalEmpData();
  employeeArray.push(employee);
  localStorage.setItem('data', JSON.stringify(employeeArray));

  addEmployeeToDOM(employee);
  imageInput.value=''
  nameInput.value = '';
  ageInput.value = '';
  emailInput.value = '';
  numberInput.value=''

  formDisplay.classList.remove('show');
  employeeData.classList.remove('opacity');
}

function cancelFormDisplay() {
  formDisplay.classList.remove('show');
  employeeData.classList.remove('opacity');
}

// delete
function deleteEmployee(event) {
  if (event.target.classList.contains('btn_delete')) {
    const employeeData = event.target.closest('.emp_data');
    const employeeName = employeeData.querySelector('h3').textContent;

    let employeeArray = getLocalEmpData();
    employeeArray = employeeArray.filter(employee => employee.name !== employeeName);
    localStorage.setItem('data', JSON.stringify(employeeArray));

    employeeData.remove();
    employeeInfo.innerHTML = '';
  }
}

function displayEmployeeList() {
  const employeeArray = getLocalEmpData();
  employeeArray.forEach(addEmployeeToDOM);
}

function addEmployeeToDOM(employee) {
  const employeeDataHTML = `
    <div class="emp_data">
      <h3>${employee.name}</h3>
      <button class="btn_delete">X</button>
    </div>
  `;
  const employeeData = document.createElement('div');
  employeeData.innerHTML = employeeDataHTML;
  employeeList.appendChild(employeeData);

  employeeData.addEventListener('click', () => {
    updateEmployeeInfo(employee);
  });
}

function updateEmployeeInfo(employee) {
  employee.img=employee.img?employee.img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUYBOuzstJgzkVSEgNbUT9k4O1VJzV2SRORVLInwV3ebvVX_N2kPvgUgWRwaGD8elJviI&usqp=CAU" 
  console.log(employee.img)
  const employeeInfoHTML = `
    <img src=${employee.img}/>
    <strong>${employee.name}(${employee.age})</strong>
    <p>${employee.email}</p>
    <p>${employee.number}</p>
  `;
  employeeInfo.innerHTML = employeeInfoHTML;
}

function getLocalEmpData() {
  return localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
}
