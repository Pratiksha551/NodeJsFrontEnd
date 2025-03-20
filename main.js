const setTable = (users) => {
  document.getElementById('tbody').innerHTML = "";

  users.forEach((user, index) => {
    let trEle = document.createElement('tr');

    let srTd = document.createElement('td');
    srTd.append(index + 1);
    trEle.appendChild(srTd);

    let nameTd = document.createElement('td');
    nameTd.append(user.name);
    trEle.appendChild(nameTd);

    let ageTd = document.createElement('td');
    ageTd.append(user.age);
    trEle.appendChild(ageTd);

    let cityTd = document.createElement('td');
    cityTd.append(user.city);
    trEle.appendChild(cityTd);

    let actionId = document.createElement('td');

    let updateI = document.createElement('i');
    updateI.setAttribute('class', 'fa-solid fa-user-pen');
    updateI.onclick = () => {
      openCloseModal('updatemodal');
      setUpdateUser(user)
    };
    actionId.appendChild(updateI);

    let deleteI = document.createElement('i');
    deleteI.setAttribute('class', 'fa-solid fa-trash');
    deleteI.onclick = () => {
      deleteUser(user.id)
    }
    actionId.appendChild(deleteI);

    trEle.appendChild(actionId);
    document.getElementById('tbody').appendChild(trEle);
  });
};

  
// for open and close modal
let modalStatus = false;

const openCloseModal = (eleId) => {
   
  if(modalStatus === false) {
    document.getElementById(eleId).style.display = 'flex';
    modalStatus = true;
  }
  else{
    document.getElementById(eleId).style.display = 'none';
    modalStatus = false;
  }
}

//add new user
async function addNewUser() {

  let name = document.getElementById('name').value;
  let age = Number(document.getElementById('age').value);
  let city = document.getElementById('city').value;

  let userObj = {
    name:name,
    age:age,
    city:city
  }
  console.log(userObj);

  if(!name || !age || !city) {
   alert('All fields are required.');
   return
  }

  let res = await fetch("http://localhost:5000/addnewuser",{
    method:"POST",
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(userObj)
  })
  let response = await res.json();
  console.log(response);

  if(response.success === true) {
    alert('User added successfully');
    openCloseModal('addmodal');
    getAllUsers();
  }
  else {
    alert('Something went wrong');
  }

}

//get all user
const getAllUsers = async () =>{
  let res = await fetch("http://localhost:5000/getusers");
  let response = await res.json();
  console.log(response);

  if(response.success === true){
    setTable(response.result);
  }
}
getAllUsers();

//delete user
const deleteUser = async (userId) => {
  let isTrue = confirm("Are you sure?");

  if(isTrue === true){
    let res = await fetch(`http://localhost:5000/deleteuser?id=${userId}`,{
      method:"DELETE"
    });
    let response = await res.json();
    
    if(response.success === true){
      alert('User deleted successfully');
      getAllUsers();
    }
    else{
      alert('Something went wrong.');
  }
}
}

//update user 
const setUpdateUser = (user) =>{

  document.getElementById('updateId').value = user.id;
  document.getElementById('updateName').value = user.name;
  document.getElementById('updateAge').value = user.age;
  document.getElementById('updateCity').value = user.city;

  
}


const updateUser = async () => {
  let id = Number(document.getElementById('updateId').value);
  let name = document.getElementById('updateName').value;
  let age = Number(document.getElementById('updateAge').value);
  let city = document.getElementById('updateCity').value;

  let userObj = {
    id:id,
    name:name,
    age:age,
    city:city
  }

  if(!userObj.name || !userObj.age || !userObj.city){
    alert("All fields are required!");
    return
}
  let res = await fetch(`http://localhost:5000/updateuser?id=${userObj.id}`,{
    method:"PUT",
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(userObj)
  })
  let response = await res.json();
  console.log(response);

  if(response.success === true) {
    alert('User updated successfully');
    openCloseModal('updatemodal');
    getAllUsers();
  }
  else {
    alert('Something went wrong');
  }
}

