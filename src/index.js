ALLDOGS = []

document.addEventListener('DOMContentLoaded', () => {

  const tableContainer = document.querySelector('#table-body')
  const mainContainer = document.querySelector('.main.flex')
  const dogForm = document.querySelector('#dog-form')
  let dogNameInput = document.querySelector('#name-input')
  let dogBreedInput = document.querySelector('#breed-input')
  let dogSexInput = document.querySelector('#sex-input')

  fetch('http://localhost:3000/dogs')
  .then(r => r.json())
  .then((dogsObg) => {
    ALLDOGS = dogsObg
    tableContainer.innerHTML = renderAllDogs(ALLDOGS)
  })

  mainContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      foundDogId = e.target.dataset.id
      fetch(`http://localhost:3000/dogs/${foundDogId}`)
      .then(r => r.json())
      .then(foundDogObj => {
        dogForm.dataset.id = foundDogObj.id
        dogNameInput.value = foundDogObj.name
        dogBreedInput.value = foundDogObj.breed
        dogSexInput.value = foundDogObj.sex
      })
    }
    window.scrollTo(0, 0)
  })

  dogForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (e.target.dataset.id) {
      foundDogId = e.target.dataset.id
      fetch(`http://localhost:3000/dogs/${foundDogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Action: "application/json"
        },
        body: JSON.stringify({
          "name": dogNameInput.value,
          "breed": dogBreedInput.value,
          "sex": dogSexInput.value
        })
      })
      .then(r => r.json())
      .then(updatedDogObj => {
        const oldDog = ALLDOGS.find((dog) => {return dog.id === updatedDogObj.id})
        const oldDogIndex = ALLDOGS.indexOf(oldDog)
        ALLDOGS[oldDogIndex] = updatedDogObj
        tableContainer.innerHTML = renderAllDogs(ALLDOGS)
      })
    } e.target.reset()
  }) //End of Listen

})


const renderAllDogs = () => {
  return ALLDOGS.map((dog) => dogTableHTML(dog)).join('')
}

const dogTableHTML = (dog) => {
  return `<tr>
    <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id="${dog.id}">Edit</button></td>
  </tr>`
}
