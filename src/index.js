document.addEventListener('DOMContentLoaded', () => {
  const dogContainer = document.querySelector("#table-body")
  const dogEditForm = document.querySelector("#dog-form")
  const submitButton = document.querySelector("#submit-button")

  function addAllDogs(dogsObject){
    dogsObject.forEach(function(dog){
      dogContainer.innerHTML += `
        <tr >
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button data-id=${dog.id}>Edit Dog</button></td>
        </tr>
      `
    })
  }

  function editDogForm(dogObject){
    return dogEditForm.innerHTML = `
      <form id='dog-form' class="padding margin border-round border-grey">
        <input data-id="${dogObject.id}" type="name" name="name" value="${dogObject.name}" >
        <input type="breed" name="breed" value="${dogObject.breed}">
        <input type="sex" name="sex" value="${dogObject.sex}" >
        <input type="submit"value="Submit" id="submit-button">
      </form>
    `
  }
  //initial load of all dogs
  fetch(`http://localhost:3000/dogs`)//make a method to reuse during refetch
  .then(r => r.json())
  .then(function(dogObject){
    addAllDogs(dogObject)
  })

  dogContainer.addEventListener("click", function(event){
    if (event.target.dataset.id){
      const currentDogId = event.target.dataset.id;
      fetch(`http://localhost:3000/dogs/${currentDogId}`)//dont fetch, look on the page for the info?
      .then(r => r.json())
      .then(dogJSON => editDogForm(dogJSON))
    }
  })

  dogEditForm.addEventListener("submit", function(event){
    // event.preventDefault()
    const name = event.target.name.value;
    const breed = event.target.breed.value;
    const sex = event.target.sex.value;
    const id = event.target.name.dataset.id
    console.log(name, breed, sex, id)

    fetch(`http://localhost:3000/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        breed: breed,
        sex: sex
      })
    })
    .then(fetch(`http://localhost:3000/dogs`)
    .then(r => r.json())
    .then(function(dogObject){
      addAllDogs(dogObject)
    })
    )

  })

})
