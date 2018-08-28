'use strict';

let user = {
  firstName: 'Mike',
  lastName: 'Jones',
  gender: 'Male',
  age: 20,
  heightFeet: 6,
  heightInch: 0
};

document.addEventListener('DOMContentLoaded', function(){
  // let elems = document.querySelectorAll('.sidenav');
  // let instances = M.Sidenav.init(elems);

  let fitnessOverview = document.querySelector('#fitnessOverview');
  let overview = document.querySelector('.overview');
  let stats = document.querySelector('.stats');
  let exercises = document.querySelector('.exercises');
  let workout = document.querySelector('.workout-plan');
  let date = document.querySelector('.date');

  var d = new Date();
  date.insertAdjacentHTML('beforeend', d.toDateString());


  function onFitnessClick(e){
    if(e.target === overview){
      e.target.classList.add('icon-color');
      stats.classList.remove('icon-color');
      exercises.classList.remove('icon-color');
      workout.classList.remove('icon-color');
    } else if(e.target === stats){
      e.target.classList.add('icon-color');
      overview.classList.remove('icon-color');
      exercises.classList.remove('icon-color');
      workout.classList.remove('icon-color');
    } else if(e.target === exercises){
      e.target.classList.add('icon-color');
      stats.classList.remove('icon-color');
      overview.classList.remove('icon-color');
      workout.classList.remove('icon-color');
    } else {
      e.target.classList.add('icon-color');
      stats.classList.remove('icon-color');
      exercises.classList.remove('icon-color');
      overview.classList.remove('icon-color');
    }
  }

  fitnessOverview.addEventListener('click', onFitnessClick);

});
