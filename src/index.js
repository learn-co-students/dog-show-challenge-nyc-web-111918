document.addEventListener('DOMContentLoaded', () => {

  DOGS = []

  const dogTable = document.querySelector('#table-body')
  const dogForm = document.querySelector('#dog-form')
  let selectedDogID = 0

  function renderDogs(array) {
    return array.map((dog) => {
      return `
      <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id=${dog.id}>Edit</button></td></tr>
      `
    }).join('')
  }

  fetch('http://localhost:3000/dogs')
    .then(r => r.json())
    .then(allDogObjs => {
      allDogObjs.forEach(dog => {
        DOGS.push(dog)
        console.log()
        dogTable.innerHTML = renderDogs(DOGS)
      })
    })

    dogTable.addEventListener('click', (e) => {
      var editDog = DOGS.find(dog => dog.id == e.target.dataset.id)
      console.log(editDog)
      if (e.target.tagName === "BUTTON") {
        dogForm.name.value = editDog.name
        dogForm.breed.value = editDog.breed
        dogForm.sex.value = editDog.sex
        selectedDogID = editDog.id
      }
    })

    dogForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const editedClicked = DOGS.find(dog => dog.id == selectedDogID)
      fetch(`http://localhost:3000/dogs/${editedClicked.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accepted: "application/json"
        },
        body: JSON.stringify({
          name: dogForm.name.value,
          breed: dogForm.breed.value,
          sex: dogForm.sex.value
        })
      })
      .then(r => r.json())
      .then(obj => {
        const editedDogIndex = DOGS.indexOf(editedClicked)
        DOGS[editedDogIndex].name = obj.name
        DOGS[editedDogIndex].breed = obj.breed
        DOGS[editedDogIndex].sex = obj.sex
        dogTable.innerHTML = renderDogs(DOGS)
      })
    })





}) //END OF DOMCONTENTLOADED
