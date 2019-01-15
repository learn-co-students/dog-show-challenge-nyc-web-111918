document.addEventListener('DOMContentLoaded', () => {
const dogTableBody = document.querySelector('#table-body');
const dogForm = document.querySelector('#dog-form');
const inputName = dogForm.querySelector('#name');
const inputBreed = dogForm.querySelector('#breed');
const inputSex = dogForm.querySelector('#sex');
const inputId = dogForm.querySelector('#id');
let allDogs = [];
//<------------------- PAGE RENDER ------------------>
fetch('http://localhost:3000/dogs')
.then(r => r.json())
.then(r => renderDogs(r))

//<--------- RENDER HELPERS ----------->
function newDogRow(dog){
return `
<tr>
  <td>${dog.name}</td>
  <td>${dog.breed}</td>
  <td>${dog.sex}</td>
  <td ><button data-id="${dog.id}">Edit</button></td>
</tr>`
}

function renderDogs(array){
  allDogs = array;
  dogTableBody.innerHTML = '';
  array.forEach(function(dog){
    dogTableBody.innerHTML += newDogRow(dog);
  })
} //<------------ END RENDER HELPERS ---------->

//<--------------- FILL EDIT FORM --------------->
//edit button click to auto fill dogForm
  dogTableBody.addEventListener('click', function(e){
    if (e.target.dataset.id){
      allDogs.forEach(function(dog){
        if (dog.id == e.target.dataset.id){
        inputName.value = dog.name;
        inputBreed.value = dog.breed;
        inputSex.value = dog.sex;
        inputId.value = dog.id;
        }
      })
    }
  }) //<---------- END FILL EDIT FORM ------------------>

//<--------------------- EDIT DOG ---------------------->
  dogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if( inputId.value){
      fetch(`http://localhost:3000/dogs/${inputId.value}`,{
        method: "PATCH",
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: inputName.value,
          breed: inputBreed.value,
          sex: inputSex.value
        })
      })
      .then(r => r.json())
      .then((r) => {
        for (let i in allDogs){
          allDogs[i].id === r.id ? allDogs[i] = r : ''
        }
        renderDogs(allDogs)
        dogForm.reset()
        inputId.value = "";
      })
    }
  }) //<----------------- END EDIT DOG ---------------->
}) //<----------------- END PAGE RENDER ---------------->
