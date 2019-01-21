/***************Global variables*******************/
let hello = console.log('hello');
//will not have access to this information inside of the DOMContentLoaded.
/***************************************************/
/************************EVENT LISTENER Loader**************/
document.addEventListener('DOMContentLoaded', () => {
  console.log('page loaded');
  // first we want to be able to grab the container/div that we will be rendering the HTML
const tableBody =  document.querySelector('#table-body');
const dogForm = document.querySelector('#dog-form');
const inputName = document.querySelector('#name');
const inputBreed = document.querySelector('#breed');
const inputSex = document.querySelector('#sex');

// Then we want to use the asynchronous fetch call to hit the json server
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(dogsJson => {
    dogsJson.map(function(dogs){
      tableBody.innerHTML += tabelOfDogs(dogs)
    }).join('')// end of map
  })

// then we want to use that response from the server, parse the json object, and use the data to render our tabel of dogs.
console.log(tableBody)
// we need an EventListener to listen for the click on the whole table!!!
  tableBody.addEventListener('click', (event) => {
    // console.log('clicked table');
    console.log(event.target);
    const dogId = event.target.id
    if (event.target.dataset.action === 'edit') {
      //if you click the edit button, populate the form with the values of the clicked button.
      // Remember You can always send a request to the server to help change the data you need.
      console.log(dogId)
      fetch(`http://localhost:3000/dogs/${dogId}`)
      //update the name,breed,sex with the current inputs on the edit button.
      // inputName.value = ''
      .then(response => response.json())
      .then(jsonDogObj => {
        dogForm.dataset.id = jsonDogObj.id
        inputName.value = jsonDogObj.name
        inputBreed.value = jsonDogObj.breed
        inputSex.value = jsonDogObj.sex
      })


    } //end of if statement.

  }) // end of tableBody click EventListener

  dogForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log('submited form!')
    console.log(e.target)
    const dogDataId = event.target.dataset.id
    const dogRow = document.querySelector(`[data-row-id="${dogDataId}"]`)
    fetch(`http://localhost:3000/dogs/${dogDataId}`, {
      method: 'PATCH',
      headers: {
        //
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify({
          name: inputName.value,
          breed: inputBreed.value,
          sex: inputSex.value
      })

    })
    .then(res => res.json())
    .then(jsonDogObj => {
      dogRow.innerHTML = tabelOfDogs(jsonDogObj)
    })
  dogForm.reset()
  })// end of DogForm submit button.




}) // end of DOMContentLoaded Page
/****************************************************/

/***********************HELPER FUNCTION**********************/
function tabelOfDogs(jsonDogObj) {
  return `<tr data-row-id="${jsonDogObj.id}">
            <td id="${jsonDogObj.id}">${jsonDogObj.name}</td>
            <td id="${jsonDogObj.id}">${jsonDogObj.breed}</td>
            <td id="${jsonDogObj.id}">${jsonDogObj.sex}</td>
            <td><button data-action="edit" id="${jsonDogObj.id}">Edit</button></td>
          </tr>`
}



console.log('hello')
