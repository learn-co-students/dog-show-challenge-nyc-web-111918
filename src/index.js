document.addEventListener('DOMContentLoaded', () => {
  const dogTable = document.querySelector('#table-body')
  const dogForm = document.querySelector('#dog-form')
  const nameEdit = dogForm.querySelector('#name-edit')
  const breedEdit = dogForm.querySelector('#breed-edit')
  const sexEdit = dogForm.querySelector('#sex-edit')
  let editDogID = 0
  let DOGS = []

  // INITIAL FETCH OF DOGS
  const fetchDogs = () => {
    fetch('http://localhost:3000/dogs')
    .then(responseObj => responseObj.json())
    .then(dogs => {
      dogTable.innerHTML = ""
      dogs.forEach(function(dog){
        DOGS.push(dog)
        dogTable.innerHTML += `
        <tr>
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button data-id=${dog.id} class="edit-btn">Edit</button></td>
        </tr>`
      })
    })
  }
  fetchDogs()

  dogTable.addEventListener("click", function(event){
    event.preventDefault()
    // console.dir(event.target);
    if (event.target.classList.contains('edit-btn')){
      const dogID = (event.target.dataset.id)
      const dog = DOGS.find(function(dog){
        return dog.id == dogID
      })
      nameEdit.value = dog.name
      breedEdit.value = dog.breed
      sexEdit.value = dog.sex
      editDogID = dog.id
    }
  })  // End of Edit Button listener

  dogForm.addEventListener("submit", function(event){
    event.preventDefault()

    fetch(`http://localhost:3000/dogs/${editDogID}`, {
        method: 'PATCH',
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
        {
          "id": editDogID.value,
          "name": nameEdit.value,
          "breed": breedEdit.value,
          "sex": sexEdit.value
        })
    })
    .then(responseObj => responseObj.json())
    .then(dog => {
      //Re-render the dog
      DOGS = []
      fetchDogs()
      nameEdit.value = ""
      breedEdit.value = ""
      sexEdit.value = ""
      editDogID = ""
    })
  })

  //HALPERS




})  // End of DOMContentLoaded
