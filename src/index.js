document.addEventListener('DOMContentLoaded', () => {

  const dogTable = document.querySelector('#table-body')
  const dogForm = document.querySelector('#dog-form')
  const dogFormName = document.querySelector('#dog-name')
  const dogFormBreed = document.querySelector('#dog-breed')
  const dogFormSex = document.querySelector('#dog-sex')
  const dogSubmitBtn = document.querySelector('#dog-sex')
  let allDogs = [];
  let currentDogId;


  function htmlParser(dog){
    return `
    <div id="${dog.id}" class="column">
      <th>${dog.name}</th>
      <th>${dog.breed}</th>
      <th>${dog.sex}</th>
      <th class='padding center'><button id ="${dog.id}" type="button" name="button"> Edit this Doggo</button></th>
    </div>`
  }

  function dogIterator(dogs){
    allDogs = []
    dogTable.innerHTML = ''
    dogs.forEach(function(dog){
      dogTable.innerHTML += htmlParser(dog)
      allDogs.push(dog)
    })
  }

  fetch('http://localhost:3000/dogs')
  .then(rev => rev.json())
  .then(dogs => dogIterator(dogs))


  dogTable.addEventListener('click',() => {
    if(event.target.type === 'button'){
    let dog =  allDogs.find(function(dog){
      return  dog.id == event.target.id
      })

      dogFormName.value = dog.name
      dogFormBreed.value = dog.breed
      dogFormSex.value = dog.sex
      currentDogId = dog.id

    }
  })

  dogForm.addEventListener('submit', () => {
    event.preventDefault()

    fetch(`http://localhost:3000/dogs/${currentDogId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": `${dogFormName.value}`,
        "breed": `${dogFormBreed.value}`,
        "sex": `${dogFormSex.value}`
      })
    })
    .then(() => fetch('http://localhost:3000/dogs')
      .then(rev => rev.json())
      .then(dogs => dogIterator(dogs))
    )
  })

})
