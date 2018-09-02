'use strict';

let baseURL = 'https://wger.de/api/v2/exercise/?limit=120';
let exerciseList = JSON.parse(localStorage.getItem('Exercise Array')) || [];
let count = 0;

document.addEventListener('DOMContentLoaded', function(){
  let updateExercise = document.querySelector('#exerciseChart');
  var chart = AmCharts.makeChart("chartdiv", {
      "theme": "light",
      "type": "gauge",
      "axes": [{
        "topTextFontSize": 14,
        "topTextYOffset": 40,
        "axisColor": "#f6f9fc",
        "axisThickness": 1,
        "endValue": 8,
        "gridInside": true,
        "inside": false,
        "radius": "50%",
        "valueInterval": 8,
        "tickColor": "#67b7dc",
        "startAngle": -90,
        "endAngle": 90,
        "unit": "",
        "bandOutlineAlpha": 0,
        "bands": [{
          "color": "#ffffff",
          "endValue": 100,
          "innerRadius": "105%",
          "radius": "170%",
          /* "gradientRatio": [0.5, 0, -0.5], */
          "startValue": 0
        }, {
          "color": "#ee6e73",
          "endValue": 0,
          "innerRadius": "105%",
          "radius": "170%",
          /* "gradientRatio": [0.5, 0, -0.5], */
          "startValue": 0
        }]
      }],
      "arrows": [{
        "alpha": 1,
        "innerRadius": "30%",
        "nailRadius": 0,
        "radius": "150%"
      }]
    });
  setInterval(randomValue, 2000);

  // set random value
  function randomValue() {
    let chartAnchor = document.querySelector('#chartdiv a')
    chartAnchor.textContent = '';
    var value = Math.round(Math.random() * 10);
    chart.arrows[0].setValue(value);
    chart.axes[0].setTopText(value + " hrs");
    // adjust darker band to new value
    chart.axes[0].bands[1].setEndValue(value);
  }

  // Initialize Materialize
  M.AutoInit();
  let elems = document.querySelectorAll('.collapsible');
  let instances = M.Collapsible.init(elems);
  let el = document.querySelector('.modal');
  let userGoalModal = M.Modal.init(el);

  // Initialize Nav
  let fitnessOverview = document.querySelector('#fitnessOverview');
  let overview = document.querySelector('.overview');
  let stats = document.querySelector('.stats');
  let goal = document.querySelector('.goal')
  let exercises = document.querySelector('.exercises');
  let workout = document.querySelector('.workout-plan');

  // Initialize Date
  let d = new Date();
  let date = document.querySelector('.date');
  date.insertAdjacentHTML('beforeend', d.toDateString());

  // Initialize LocalStorage State
  let exerciseNumber = document.querySelector('#exerciseNumber');
  let userFirstName = document.querySelector('.first-name');
  let userLastName = document.querySelector('.last-name');
  let userGender = document.querySelector('.gender');
  let userAge = document.querySelector('.age')
  let userHeightFt = document.querySelector('.height-feet');
  let userHeightInches = document.querySelector('.height-inches');
  let userWeight = document.querySelector('.weight');
  let userGoals = document.querySelector('#userGoal p');

  function userProfile() {
    // Initialize number of exercises from exercise array
    exerciseNumber.textContent = exerciseList.length;

    userFirstName.textContent = JSON.parse(localStorage.getItem('First Name'));
    userLastName.textContent = JSON.parse(localStorage.getItem('Last Name'));
    userGender.textContent = JSON.parse(localStorage.getItem('Gender'));
    userAge.textContent = JSON.parse(localStorage.getItem('Age'));
    userHeightFt.textContent = JSON.parse(localStorage.getItem('Height Ft'));
    userHeightInches.textContent = JSON.parse(localStorage.getItem('Height Inch'));
    userWeight.textContent = JSON.parse(localStorage.getItem('Weight'));
  }

  function getGoalModal(){
    userGoals.textContent = JSON.parse(localStorage.getItem('Goal'));
  }

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
      getGoalModal();
    } else {
      e.target.classList.add('icon-color');
      stats.classList.remove('icon-color');
      goal.classList.remove('icon-color');
      exercises.classList.remove('icon-color');
      overview.classList.remove('icon-color');
    }
  }

  fitnessOverview.addEventListener('click', onFitnessClick);
  axios.get(baseURL)
  .then(function(result){
    let response = result.data.results;
    let addExercise = document.querySelectorAll('.exercise-listings');
    let tabExercises = document.querySelector('.tab-exercises');
    let absList = document.querySelector('#absList');

    // Initialize Arrays for Body Parts
    let abs = [];
    let arms = [];
    let back = [];
    let calves = [];
    let chest = [];
    let legs = [];
    let shoulders = [];

    // Loop through API call to push exercises to arrays
    for(let i = 0; i < response.length; i++){
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

    // Initialize for loop on added exercises
    for(let i = 0; i < addExercise.length; i++){
      addExercise[i].addEventListener('click', function(e) {
        e.preventDefault()
        if(e.target.classList.contains('add-exercise')){
          count++;
          exerciseList.push(e.target.parentElement.parentElement.childNodes[1].textContent)
          localStorage.setItem('Exercise Array', JSON.stringify(exerciseList));
          exerciseNumber.textContent = exerciseList.length;
          updateChart(count)
        }
      })
    }

    function loadAbsList(e){
      for(let i = 0; i < abs.length; i++){
        absList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${abs[i].name}</div>
          <div class="collapsible-body"><span>${abs[i].description}</span>
          <button class="btn waves-effect waves-light add-exercise blue lighten-2 valign-wrapper" name="action">Add Exercise</button>
          </div>
          </li>`
        )
      }
    }

    function loadArmsList(){
      for(let i = 0; i < arms.length; i++){
        armsList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${arms[i].name}</div>
          <div class="collapsible-body"><span>${arms[i].description}</span>
          <button class="btn waves-effect waves-light add-exercise blue lighten-2 valign-wrapper" name="action">Add Exercise</button>
          </div>
          </li>`
        )
      }
    }

    function loadBackList(){
      for(let i = 0; i < back.length; i++){
        backList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${back[i].name}</div>
          <div class="collapsible-body">
            <span>${back[i].description}</span>
            <button class="btn waves-effect waves-light add-exercise blue lighten-2 valign-wrapper" name="action">Add Exercise</button>
          </div>
        </li>`
        )
      }
    }

    function loadCalvesList(){
      for(let i = 0; i < calves.length; i++){
        calvesList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${calves[i].name}</div>
          <div class="collapsible-body"><span>${calves[i].description}</span>
          <button class="btn waves-effect waves-light add-exercise blue lighten-2 valign-wrapper" name="action">Add Exercise</button>
          </div>
          </li>`
        )
      }
    }

    function loadChestList(){
      for(let i = 0; i < chest.length; i++){
        chestList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${chest[i].name}</div>
          <div class="collapsible-body"><span>${chest[i].description}</span>
          <button class="btn waves-effect waves-light add-exercise blue lighten-2 valign-wrapper" name="action">Add Exercise</button>
          </div>
          </li>`
        )
      }
    }

    function loadLegsList(){
      for(let i = 0; i < legs.length; i++){
        legsList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${legs[i].name}</div>
          <div class="collapsible-body"><span>${legs[i].description}</span>
          <button class="btn waves-effect waves-light add-exercise blue lighten-2 valign-wrapper" name="action">Add Exercise</button>
          </div>
          </li>`
        )
      }
    }

    function loadShouldersList(){
      for(let i = 0; i < shoulders.length; i++){
        shouldersList.insertAdjacentHTML('beforeend', `<li>
          <div class="collapsible-header" >${shoulders[i].name}</div>
          <div class="collapsible-body"><span>${shoulders[i].description}</span>
          <button class="btn waves-effect waves-light add-exercise blue lighten-2 valign-wrapper" name="action">Add Exercise</button>
          </div>
          </li>`
        )
      }
    }

    function updateChart(newCount) {
      var exerciseChart = AmCharts.makeChart( "exerciseChart", {
        "type": "pie",
        "theme": "chalk",
        "dataProvider": [ {
          "title": "New Exercises",
          "value": newCount
        }, {
          "title": "Old Exercises",
          "value": exerciseList.length
        } ],
        "titleField": "title",
        "valueField": "value",
        "labelRadius": 5,

        "radius": "42%",
        "innerRadius": "60%",
        "labelText": "[[title]]",
        "export": {
          "enabled": false
        }
      } );
    }

    userProfile()
    updateChart(count)
    loadAbsList();
    loadArmsList()
    loadBackList()
    loadCalvesList()
    loadChestList()
    loadLegsList()
    loadShouldersList()
    })
});
