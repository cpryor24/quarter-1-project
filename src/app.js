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
    let value = Math.round(Math.random() * 10);
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
  let userExercises = M.Modal.init(el);


  // Initialize Nav
  let fitnessOverview = document.querySelector('#fitnessOverview');
  let overview = document.querySelector('.overview');
  let goal = document.querySelector('.goal');
  let exercises = document.querySelector('.exercises')

  // Initialize Date
  let newDate = new Date();
  let date = document.querySelector('.date');
  date.insertAdjacentHTML('beforeend', newDate.toDateString());

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
  let exercisesList = document.querySelector('#userExercises ul');

  let userProfile = () => {
    // Initialize number of exercises from exercise array
    exerciseNumber.textContent = exerciseList.length;

    // Retrieve data from localStorage
    userFirstName.textContent = JSON.parse(localStorage.getItem('First Name'));
    userLastName.textContent = JSON.parse(localStorage.getItem('Last Name'));
    userGender.textContent = JSON.parse(localStorage.getItem('Gender'));
    userAge.textContent = JSON.parse(localStorage.getItem('Age'));
    userHeightFt.textContent = JSON.parse(localStorage.getItem('Height Ft'));
    userHeightInches.textContent = JSON.parse(localStorage.getItem('Height Inch'));
    userWeight.textContent = JSON.parse(localStorage.getItem('Weight'));
  }

  let getExerciseModal = () => {
    exercisesList.textContent = '';
    let exerciseArray = JSON.parse(localStorage.getItem('Exercise Array'));
    for (let i = 0; i < exerciseArray.length; i++) {
      exerciseArray.sort()
      if(exerciseArray[i + 1] !== exerciseArray[i]){
        exercisesList.insertAdjacentHTML('beforeend', `<li>${exerciseArray[i]}</li>`)
      }
    }
  }

  let getGoalModal = () => {
    userGoals.textContent = JSON.parse(localStorage.getItem('Goal'));
  }

  let onFitnessClick = (e) => {
    if(e.target === overview){
      e.target.classList.add('icon-color');
      goal.classList.remove('icon-color');
      exercises.classList.remove('icon-color');
    } else if(e.target === exercises){
      e.target.classList.add('icon-color');
      goal.classList.remove('icon-color');
      overview.classList.remove('icon-color');
      getExerciseModal();
    } else {
      e.target.classList.add('icon-color');
      exercises.classList.remove('icon-color');
      overview.classList.remove('icon-color');
      getGoalModal();
    }
  }

  fitnessOverview.addEventListener('click', onFitnessClick);

  axios.get(baseURL)
    .then(function(result){
      let response = result.data.results;
      let addExercise = document.querySelectorAll('.exercise-listings');
      let tabExercises = document.querySelector('.tab-exercises');

      // Initialize for loop on added exercises
      for(let i = 0; i < addExercise.length; i++){
        addExercise[i].addEventListener('click', function(e) {
          e.preventDefault()
          e.target.classList.add('disabled')
          if(e.target.classList.contains('add-exercise')){
            count++;
            exerciseList.push(e.target.parentElement.parentElement.childNodes[1].textContent)
            localStorage.setItem('Exercise Array', JSON.stringify(exerciseList));
            exerciseNumber.textContent = exerciseList.length;
            updateChart(count)
          }
        })
      }

      // Single for loop on exercises list
      let exercises = {
        abs: {
          list: document.querySelector('#absList'),
          id: 10
        },
        arms: {
          list: document.querySelector('#armsList'),
          id: 8
        },
        back: {
          list: document.querySelector('#backList'),
          id: 12
        },
        calves: {
          list: document.querySelector('#calvesList'),
          id: 14
        },
        chest: {
          list: document.querySelector('#chestList'),
          id: 11
        },
        legs: {
          list: document.querySelector('#legsList'),
          id: 9
        },
        shoulders: {
          list: document.querySelector('#shouldersList'),
          id: 13
        }
      }

      for(let key in exercises){
        let myList = exercises[key].list;
        for(let j = 0; j < response.length; j++){
          if(exercises[key].id === response[j].category && response[j].name !== '' && response[j].language === 2){
            myList.insertAdjacentHTML('beforeend', `<li>
              <div class="collapsible-header">${response[j].name}</div>
              <div class="collapsible-body"><span>${response[j].description}</span>
              <button class="btn waves-effect waves-light add-exercise blue lighten-2 valign-wrapper" name="action">Add Exercise</button>
              </div>
              </li>`
            );
          }
        }
      }

      let updateChart = (newCount) => {
        let exerciseChart = AmCharts.makeChart( "exerciseChart", {
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
    })
});
