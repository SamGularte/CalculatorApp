//theme switch
var buttons = document.getElementsByClassName("toggleState");
var arr = [...buttons];

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('selectedTheme');

  if (savedTheme) {
    if (savedTheme == 0) {
      document.body.classList.add('theme1');
      document.body.classList.remove('theme2');
      document.body.classList.remove('theme3');
      document.getElementById('one').style.opacity = "1";
      document.getElementById('two').style.opacity = "0";
      document.getElementById('three').style.opacity = "0";
    } else if (savedTheme == 1) {
      document.body.classList.add('theme2');
      document.body.classList.remove('theme1');
      document.body.classList.remove('theme3');
      document.getElementById('one').style.opacity = "0";
      document.getElementById('two').style.opacity = "1";
      document.getElementById('three').style.opacity = "0";
    } else {
      document.body.classList.add('theme3');
      document.body.classList.remove('theme1');
      document.body.classList.remove('theme2');
      document.getElementById('one').style.opacity = "0";
      document.getElementById('two').style.opacity = "0";
      document.getElementById('three').style.opacity = "1";
    }
  }
});

arr.forEach((element, index) => {
  element.addEventListener("click", () => {
    element.style.opacity = "1";
    if (index == 0) {
      document.body.classList.add('theme1');
      document.body.classList.remove('theme2');
      document.body.classList.remove('theme3');
    } else if (index == 1) {
      document.body.classList.add('theme2');
      document.body.classList.remove('theme1');
      document.body.classList.remove('theme3');
    } else {
      document.body.classList.add('theme3');
      document.body.classList.remove('theme1');
      document.body.classList.remove('theme2');
    }

    localStorage.setItem('selectedTheme', index);

    arr
      .filter(function (item) {
        return item != element;
      })
      .forEach((item) => {
        item.style.opacity = "0";
      });
  });
});


//calculator
const display = document.querySelector('.display');
let previousValue = '0';
display.value = '0';

document.addEventListener('click', (e) => {
  const el = e.target;
  const validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', 'x', '/', '='];

  if (validChars.includes(el.innerText)) {
    if (el.classList.contains('btn-num')) {
      if(display.value !== String(previousValue)){
        updateDisplay(el.innerText);
      }
      else{
        delThenUpdateDisplay(el.innerText);
      }
    }

    if (el.classList.contains('btn-op')) {
      let lastChar = display.value.charAt(display.value.length - 1);
      if(display.value === 'Err'){
        clearDisplay();
      }
      else if(lastChar === '.'){
        deleteOne();
        updateDisplay(el.innerText);
      }
      else if(!/[x\/+\-]/.test(lastChar)){
        updateDisplay(el.innerText);
      }
      else{
        display.value = display.value.slice(0, -1);
        updateDisplay(el.innerText);
      }
    }
  }

  if (el.classList.contains('btn-clear')) {
    clearDisplay();
  }
  if (el.classList.contains('btn-del')) {
    if(display.value === 'Err' || display.value === 'Infinity'|| display.value === '-Infinity'){
      clearDisplay();
    } else{
      deleteOne();
    }
  }
  if (el.classList.contains('btn-eq')) {
    performCalculation();
  }
  display.focus();
});

display.addEventListener('keydown', (e) => {
  if (e.keyCode === 8) {
    e.preventDefault();
    clearDisplay();
  }
});

display.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    performCalculation();
  }
});

function updateDisplay(value) {
  display.value += value;
}

function delThenUpdateDisplay(value) {
  display.value = '';
  display.value += value;
}

function clearDisplay() {
  display.value = '0';
  previousValue = '0';
}

function deleteOne() {
  display.value = display.value.slice(0, -1);
  if(display.value.length === 0){
    display.value = '0';
  }
}

function performCalculation() {
  let conta = display.value;
  conta = conta.replaceAll("x", "*");
  try {
    conta = eval(conta);
    previousValue = conta;
    if (!conta) {
      display.value = 'Err';
      previousValue = 'Err';
      return;
    }
    display.value = String(conta);
  } catch (e) {
    display.value = 'Err';
    previousValue = 'Err';
    return;
  }
}

