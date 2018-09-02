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

  let fn = localStorage.setItem('First Name', JSON.stringify(firstName.value))
  let ln = localStorage.setItem('Last Name', JSON.stringify(lastName.value))
  let ft = localStorage.setItem('Height Ft', JSON.stringify(heightFtInline.value))
  let inch = localStorage.setItem('Height Inch', JSON.stringify(heightInchInline.value))
  let wt = localStorage.setItem('Weight', JSON.stringify(weightInline.value))
  let a = localStorage.setItem('Age', JSON.stringify(age.value))
  let gen = localStorage.setItem('Gender', JSON.stringify(gender.value))
  let gl = localStorage.setItem('Goal', JSON.stringify(goal.value))

  userInfo.addEventListener('click', function(){
    if(fn !== undefined && ln !== undefined && ft !== undefined &&
      inch !== undefined && wt !== undefined && a !== undefined &&
      gen !== undefined && gl !== undefined){
      window.location.href = 'fitness.html';
    }
  });

  clear.addEventListener('click', function(){
    firstName.value = undefined;
    lastName.value = undefined;
    heightFt.value = undefined;
    heightInch.value = undefined;
    weight.value = undefined;
    age.value = undefined;
    gender.value = undefined;
    goal.value = undefined;
  })
})
