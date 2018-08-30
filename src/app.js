'use strict';

let baseURL = 'https://wger.de/api/v2/exercise/?limit=120';
let abs = [];
let arms = [];
let back = [];
let calves = [];
let chest = [];
let legs = [];
let shoulders = [];

let user = {
  firstName: 'Mike',
  lastName: 'Jones',
  gender: 'Male',
  age: 20,
  heightFeet: 6,
  heightInch: 0
};

document.addEventListener('DOMContentLoaded', function(){
  let elems = document.querySelectorAll('.collapsible');
  let instances = M.Collapsible.init(elems);

  let fitnessOverview = document.querySelector('#fitnessOverview');
  let overview = document.querySelector('.overview');
  let stats = document.querySelector('.stats');
  let goal = document.querySelector('.goal')
  let exercises = document.querySelector('.exercises');
  let workout = document.querySelector('.workout-plan');
  let date = document.querySelector('.date');
  let tabExercises = document.querySelector('.tab-exercises');
  let absList = document.querySelector('#absList');
  let d = new Date();

  date.insertAdjacentHTML('beforeend', d.toDateString());
  M.AutoInit();

  function onFitnessClick(e){
    if(e.target === overview){
      e.target.classList.add('icon-color');
      stats.classList.remove('icon-color');
      goal.classList.remove('icon-color');
      exercises.classList.remove('icon-color');
      workout.classList.remove('icon-color');
    } else if(e.target === stats){
      e.target.classList.add('icon-color');
      overview.classList.remove('icon-color');
      goal.classList.remove('icon-color');
      exercises.classList.remove('icon-color');
      workout.classList.remove('icon-color');
    } else if(e.target === exercises){
      e.target.classList.add('icon-color');
      stats.classList.remove('icon-color');
      goal.classList.remove('icon-color');
      overview.classList.remove('icon-color');
      workout.classList.remove('icon-color');
    } else if(e.target === goal){
      e.target.classList.add('icon-color');
      stats.classList.remove('icon-color');
      exercises.classList.remove('icon-color');
      overview.classList.remove('icon-color');
      workout.classList.remove('icon-color');
    } else {
      e.target.classList.add('icon-color');
      stats.classList.remove('icon-color');
      goal.classList.remove('icon-color');
      exercises.classList.remove('icon-color');
      overview.classList.remove('icon-color');
    }
  }

  fitnessOverview.addEventListener('click', onFitnessClick);

  axios.all([
    axios.get(baseURL)
    // ,
    // axios.get('http://api.openweathermap.org/data/2.5/weather?q=phoenix&APPID=1ea5c5d3585bd190c69d54fd139d6ddd')
  ])
  .then(function(result){
    let response = result[0].data.results;

    for(let i = 0; i < response.length; i++){
      // console.log('results cat ', result[0].data.results[0])
      if(response[i].category === 10 && response[i].name !== '' && response[i].language === 2){
          abs.push(response[i])
      } else if(response[i].category === 8 && response[i].name !== '' && response[i].language === 2){
          arms.push(response[i])
      } else if (response[i].category === 12 && response[i].name !== '' && response[i].language === 2){
          back.push(response[i])
      } else if (response[i].category === 14 && response[i].name !== '' && response[i].language === 2){
          calves.push(response[i])
      } else if (response[i].category === 11 && response[i].name !== '' && response[i].language === 2){
          chest.push(response[i])
      } else if (response[i].category === 9 && response[i].name !== '' && response[i].language === 2){
          legs.push(response[i])
      } else if (response[i].category === 13 && response[i].name !== '' && response[i].language === 2){
          shoulders.push(response[i])
      }
    }

    function loadAbsList(e){
      for(let i = 0; i < abs.length; i++){
        absList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${abs[i].name}</div>
          <div class="collapsible-body"><span>${abs[i].description}</span></div>
          </li>`
        )
      }
    }

    function loadArmsList(){
      for(let i = 0; i < arms.length; i++){
        armsList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${arms[i].name}</div>
          <div class="collapsible-body"><span>${arms[i].description}</span></div>
          </li>`
        )
      }
    }

    function loadBackList(){
      for(let i = 0; i < back.length; i++){
        backList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${back[i].name}</div>
          <div class="collapsible-body"><span>${back[i].description}</span></div>
          </li>`
        )
      }
    }

    function loadCalvesList(){
      for(let i = 0; i < calves.length; i++){
        calvesList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${calves[i].name}</div>
          <div class="collapsible-body"><span>${calves[i].description}</span></div>
          </li>`
        )
      }
    }

    function loadChestList(){
      for(let i = 0; i < chest.length; i++){
        chestList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${chest[i].name}</div>
          <div class="collapsible-body"><span>${chest[i].description}</span></div>
          </li>`
        )
      }
    }

    function loadLegsList(){
      for(let i = 0; i < legs.length; i++){
        legsList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${legs[i].name}</div>
          <div class="collapsible-body"><span>${legs[i].description}</span></div>
          </li>`
        )
      }
    }

    function loadShouldersList(){
      for(let i = 0; i < shoulders.length; i++){
        shouldersList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${shoulders[i].name}</div>
          <div class="collapsible-body"><span>${shoulders[i].description}</span></div>
          </li>`
        )
      }
    }

    loadAbsList();
    loadArmsList()
    loadBackList()
    loadCalvesList()
    loadChestList()
    loadLegsList()
    loadShouldersList()
  })

});
