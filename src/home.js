'use strict';
document.addEventListener('DOMContentLoaded', function(){
  M.AutoInit();
  let userInfo = document.querySelector('#userInfo');
  let clear = document.querySelector('#clear');
  let firstName = document.querySelector('#firstName')
  let lastName = document.querySelector('#lastName');
  let heightFt = document.querySelector('#heightFtInline');
  let heightInch = document.querySelector('#heightInchInline');
  let weight = document.querySelector('#weightInline');
  let age = document.querySelector('#age');
  let gender = document.querySelector('#gender');
  let goal = document.querySelector('#goal');

  userInfo.addEventListener('click', function(){
    let fn = localStorage.setItem('First Name', JSON.stringify(firstName.value))
    let ln = localStorage.setItem('Last Name', JSON.stringify(lastName.value))
    let ft = localStorage.setItem('Height Ft', JSON.stringify(heightFtInline.value))
    let inch = localStorage.setItem('Height Inch', JSON.stringify(heightInchInline.value))
    let wt = localStorage.setItem('Weight', JSON.stringify(weightInline.value))
    let a = localStorage.setItem('Age', JSON.stringify(age.value))
    let gen = localStorage.setItem('Gender', JSON.stringify(gender.value))
    let gl = localStorage.setItem('Goal', JSON.stringify(goal.value))

    if(fn !== null && ln !== null && ft !== null &&
      inch !== null && wt !== null && a !== null &&
      gen !== null && gl !== null){
      window.location.href = 'fitness.html';
    }
  });

  clear.addEventListener('click', function(){
    firstName.value = null;
    lastName.value = null;
    heightFt.value = null;
    heightInch.value = null;
    weight.value = null;
    age.value = null;
    gender.value = null;
    goal.value = null;
  })
})
