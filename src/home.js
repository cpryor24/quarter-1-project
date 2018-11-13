'use strict';
document.addEventListener('DOMContentLoaded', () => {
  M.AutoInit();
  let form = document.querySelector('form');
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
  let image = document.querySelector('.image');

  userInfo.addEventListener('click', () => {
    if(firstName.value !== '' && lastName.value !== '' && heightFt.value !== '' &&
      heightInch.value !== '' && weight.value !== '' && age.value !== '' &&
      gender.value !== '' && goal.value !== ''){
      // Initialize LocalStorage State
      let fn = localStorage.setItem('First Name', JSON.stringify(firstName.value))
      let ln = localStorage.setItem('Last Name', JSON.stringify(lastName.value))
      let ft = localStorage.setItem('Height Ft', JSON.stringify(heightFt.value))
      let inch = localStorage.setItem('Height Inch', JSON.stringify(heightInch.value))
      let wt = localStorage.setItem('Weight', JSON.stringify(weight.value))
      let a = localStorage.setItem('Age', JSON.stringify(age.value))
      let gen = localStorage.setItem('Gender', JSON.stringify(gender.value))
      let gl = localStorage.setItem('Goal', JSON.stringify(goal.value))

      // Redirect
      window.location.href = 'fitness.html';
    }
  });

  clear.addEventListener('click', () => {
    firstName.value = '';
    lastName.value = '';
    heightFt.value = '';
    heightInch.value = '';
    weight.value = '';
    age.value = '';
    gender.value = '';
    goal.value = '';
  })
})
