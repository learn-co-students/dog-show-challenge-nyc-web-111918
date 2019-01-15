const DOGS=[];


function buildDogList(dogs){
  dogs.forEach(function(dog){
    DOGS.push(dog)
  })
}



function renderDogList(dogs){
  const dogTable=document.getElementById("table-body")
  htmlString="";
  dogs.forEach(function(dog){
    htmlString+=`<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-action="edit" data-dogid=${dog.id}>Edit</button></td></tr>`
  })
  dogTable.innerHTML=htmlString;
}
function lookupDogById(id){
  return DOGS.find(function(dog){
    return parseInt(dog.id)===parseInt(id)
  })
}

function editDog(dog){
  for (let i in DOGS){
    if (DOGS[i].id===dog.id){
      for (let key in dog){
        DOGS[i][key]=dog[key];
      }
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  fetch("http://localhost:3000/dogs", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
  })
    .then(res=>res.json())
    .then((data)=>{
      buildDogList(data);
      renderDogList(DOGS);
    })

  const dogTable=document.getElementById("table-body")
  dogTable.addEventListener('click', (e) => {
    if (e.target.dataset.action==="edit"){
      document.getElementById("dog-form").dataset.dogid=e.target.dataset.dogid;
      currentDog=lookupDogById(e.target.dataset.dogid);
      document.querySelector("input[name='name']").value=currentDog.name;
      document.querySelector("input[name='breed']").value=currentDog.breed;
      document.querySelector("input[name='sex']").value=currentDog.sex;
    }
  });

  document.getElementById("dog-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    dog={};
    dog.id=e.target.dataset.dogid;
    dog.name=e.target.querySelector("input[name='name']").value;
    dog.breed=e.target.querySelector("input[name='breed']").value;
    dog.sex=e.target.querySelector("input[name='sex']").value;
    if (dog.id){
      fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(dog),
      })
        .then(res=>res.json())
        .then((data)=>{
          editDog(data);
          renderDogList(DOGS);
          document.getElementById('dog-form').reset();
        })
    }else{
      console.log("No dog edit")
    }
  });

})
