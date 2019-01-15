let allDogs = []
let dogData

document.addEventListener('DOMContentLoaded', () => {

  const dogTable = document.querySelector("#dog-table")
  const editFormName = document.querySelector("#edit-dog-name")
  const editFormBreed = document.querySelector("#edit-dog-breed")
  const editFormSex = document.querySelector("#edit-dog-sex")
  const wholeContainer = document.querySelector("#main-flex")
  const editDogForm = document.querySelector("#dog-form")

  // *******************************************************************************
  // LOAD ALL DOGS ---- GET
  // *******************************************************************************
  function renderAllDogs() {
    return fetch("http://localhost:3000/dogs")
        .then( resp => resp.json())
        .then( dogs => {
        allDogs = dogs
        console.log(allDogs)
        dogTable.innerHTML = ""
        dogs.forEach( dog => {
          dogTable.innerHTML += `
          <tr><td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button data-id=${dog.id} data-action="edit">Edit</button></td></tr>`
        })
      })
  }
  renderAllDogs();

  // *******************************************************************************
  // UPDATE DOG ---- PATCH
  // *******************************************************************************

  wholeContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.dataset.action === "edit") {
        dogData = allDogs.find((dog) => {
        return dog.id == e.target.dataset.id
      })
      // console.log(dogData.id)
      const dogToEdit = allDogs[e.target.dataset.id - 1]
      editFormName.value = dogToEdit.name
      editFormBreed.value = dogToEdit.breed
      editFormSex.value = dogToEdit.sex
    }
  })

  editDogForm.addEventListener("click", (e) => {
    if (e.target.dataset.action === "submit") {
      e.preventDefault();
      fetch(`http://localhost:3000/dogs/${dogData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": editFormName.value,
          "breed": editFormBreed.value,
          "sex": editFormSex.value
        })
      })
      .then(resp => renderAllDogs())
    }
  })

}) // End of DOMContentLoaded
