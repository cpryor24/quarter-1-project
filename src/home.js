'use strict';
document.addEventListener('DOMContentLoaded', function(){
  M.AutoInit();
  let userInfo = document.querySelector('#userInfo');
  let firstName = document.querySelector('#firstName')
  let lastName = document.querySelector('#lastName');
  let heightFt = document.querySelector('#heightFtInline');
  let heightInch = document.querySelector('#heightInchInline');
  let weight = document.querySelector('#weightInline');
  let age = document.querySelector('#age');
  let gender = document.querySelector('#gender');
  let goal = document.querySelector('#goal');


  userInfo.addEventListener('click', function(){
    localStorage.setItem('First Name', JSON.stringify(firstName.value))
    localStorage.setItem('Last Name', JSON.stringify(lastName.value))
    localStorage.setItem('Height Ft', JSON.stringify(heightFtInline.value))
    localStorage.setItem('Height Inch', JSON.stringify(heightInchInline.value))
    localStorage.setItem('Weight', JSON.stringify(weightInline.value))
    localStorage.setItem('Age', JSON.stringify(age.value))
    localStorage.setItem('Gender', JSON.stringify(gender.value))
    localStorage.setItem('Goal', JSON.stringify(goal.value))

    console.log(firstName.value, lastName.value, heightFtInline.value, heightInchInline.value, weightInline.value, age.value, gender.value , goal.value)
    window.location.href = 'fitness.html';

  });




})
