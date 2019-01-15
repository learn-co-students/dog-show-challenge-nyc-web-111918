document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector("#table-body")
  const dogForm = document.querySelector("#dog-form")
  let currentDogID;

  fetch('http://localhost:3000/dogs')
    .then(function(response) {
      return response.json();
    })
    .then(function(dogs) {
      dogs.forEach(function(dog){
        tableBody.innerHTML += `
          <tr>
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button data-id=${dog.id} class="edit-btn">Edit</button></td>
          </tr>
        `
      })
    })

  tableBody.addEventListener("click", function(e){
    currentDogID = e.target.dataset.id

    if (e.target.className === "edit-btn") {
      fetch(`http://localhost:3000/dogs/${currentDogID}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(dog) {
        dogForm.elements["name"].value = `${dog.name}`
        dogForm.elements["breed"].value = `${dog.breed}`
        dogForm.elements["sex"].value = `${dog.sex}`
      })
    }
  })

  dogForm.addEventListener("submit", function(e){
    e.preventDefault()

    if (e.target.elements["name"].value !== "" && e.target.elements["breed"].value !== "" && e.target.elements["sex"].value !== "") {
      fetch(`http://localhost:3000/dogs/${currentDogID}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },

        body: JSON.stringify({
          "name": e.target.elements["name"].value,
          "breed": e.target.elements["breed"].value,
          "sex": e.target.elements["sex"].value,
        })
      })
      .then(function(){
        tableBody.innerHTML = ""
      })
      .then(function(){
        fetch('http://localhost:3000/dogs')
          .then(function(response) {
            return response.json();
          })
          .then(function(dogs) {
            dogs.forEach(function(dog){
              tableBody.innerHTML += `
                <tr>
                  <td>${dog.name}</td>
                  <td>${dog.breed}</td>
                  <td>${dog.sex}</td>
                  <td><button data-id=${dog.id} class="edit-btn">Edit</button></td>
                </tr>
              `
            })
          })
        })
      .then(function(){
        dogForm.elements["name"].value = ""
        dogForm.elements["breed"].value = ""
        dogForm.elements["sex"].value = ""
      })

      }
  })

})
