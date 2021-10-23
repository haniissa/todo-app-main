/**
 * @type {HTMLAllCollection}
 */

import { dataToHtml } from './dataHtml.js';

const inputValue = document.querySelector('.parent-list input');
let dragSrcEl = null;
// All articles come here for every enter
let allArticl = [];
console.log(allArticl);

const up = document.querySelector('.parent .up');

//to count all article in To-Do app
function countAllArticle() {
  const parent = document.querySelector('.parent .down .lef .num');
  parent.innerText = `${up.childElementCount}`;
}
countAllArticle();

//====================== Create ui for html================
function disapleArticle({ completed, id, text }) {
  const article = document.createElement('article');
  article.className =
    'itm rounded-t-md flex justify-between text-white pt-4 pb-4 pl-4 text-lef';
  article.setAttribute('completed', completed);
  article.setAttribute('draggable', true);
  // <label class="border  border-gray-500 right-0 h-6 w-6 rounded-3xl" for="${id}">
  article.innerHTML = `
        <label class="border border-gray-500   right-0 h-6 w-6 rounded-3xl" for="${id}">
          <span class="circle ">
            <input class="allInput hidden" type="checkbox" id="${id}">
            <img class="img px-1.5 pt-1.5 pb-1 invisible" src="./src/images/icon-check.svg" alt="">
            <span class="hov"></span>
          </span>
        </label>
        <p class="text_P pl-3 flex-grow">${text}</p>
        <div class="">
          <img class=" delete-btn bg-icon-cross mr-3 cursor-pointer" src="./src/images/icon-cross.svg" alt="">
        </div>
      `;
  let newArticle = up.appendChild(article);
  allArticl.push(newArticle);
}
//create demo article when html ui is empty
let taskArticle = JSON.parse(localStorage.getItem('todos')) || dataToHtml;

const showArticleInHtml = function () {
  for (const task of taskArticle) {
    disapleArticle(task);
  }
};

showArticleInHtml();
countAllArticle();

//==============add tag after press==============
function addItemToUi() {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    // console.log(e.target);
    e.preventDefault();
    if (inputValue.value) {
      const randomID = Math.floor(Math.random() * 1000);

      const userValue = {
        text: inputValue.value,
        completed: false,
        id: randomID,
      };
      //add to LS
      taskArticle.push(userValue);
      localStorage.setItem('todos', JSON.stringify(taskArticle));

      //adding to html
      disapleArticle(userValue);
      inputValue.value = '';

      completeTask();
      countAllArticle();
    }
  });
}
addItemToUi();

////-----------------------------------------------------
////-----------------------------------------------------
////-----------------------------------------------------
// const deleteBtn = document.querySelectorAll('.delete-btn');

//-: remove article if press on x
up.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    let article = e.target.parentElement.parentElement;
    let inputId =
      e.target.parentElement.parentElement.children[0].firstElementChild
        .firstElementChild;
    article.style.animation = `deleteAnime 500ms ease-out forwards`;
    // console.log(taskArticle);
    setTimeout(() => {
      article.remove();
      countAllArticle();
    }, 650);
    let taskIndex = taskArticle.findIndex(
      (task) => task.id === parseInt(inputId.id)
    );
    // console.log(taskIndex);
    taskArticle.splice(taskIndex, 1);
    localStorage.setItem('todos', JSON.stringify(taskArticle));
    countAllArticle();
  }
});

//Completed task or add Check

const showTask = function (check, addImg, removeImg, cir, thisArticle) {
  if (check.checked) {
    cir.firstElementChild.setAttribute('style', addImg);
    thisArticle.children[1].classList.add('line');
    cir.firstElementChild.children[1].classList.remove('invisible');
  } else {
    cir.firstElementChild.removeAttribute('style', removeImg);
    thisArticle.children[1].classList.remove('line');
    cir.firstElementChild.children[1].classList.add('invisible');
  }
};
const completeTask = function () {
  let allInput = document.querySelectorAll('.allInput');
  for (let check of allInput) {
    // console.log(check);
    let addImg =
      'background-image:linear-gradient(to right bottom, #57ddff, #c058f3)';

    let removeImg =
      ' background-image:linear-gradient(to right bottom, #57ddff, #c058f3) ';
    // console.log(check);
    let thisArticle = check.parentElement.parentElement.parentElement;
    let cir = thisArticle.children[0];
    if (thisArticle.getAttribute('completed') === 'true') {
      check.checked = true;
      cir.firstElementChild.setAttribute('style', addImg);
      thisArticle.children[1].classList.add('line');
      cir.firstElementChild.children[1].classList.remove('invisible');
    } else {
      check.checked = false;
      cir.firstElementChild.removeAttribute('style', removeImg);
      thisArticle.children[1].classList.remove('line');
      cir.firstElementChild.children[1].classList.add('invisible');
    }

    check.addEventListener('click', (e) => {
      // console.log(cir.firstElementChild.firstElementChild);
      // const idInput = thisArticle.children[0].firstElementChild.firstElementChild;
      // const idInput = check.id;
      const currentId = cir.firstElementChild.firstElementChild.id;

      thisArticle.setAttribute('completed', check.checked);
      showTask(check, addImg, removeImg, cir, thisArticle);

      for (let task of taskArticle) {
        if (task.id === parseInt(currentId)) {
          task.completed = check.checked;
          // localStorage.setItem('todos', JSON.stringify(taskArticle));
        }
      }
      localStorage.setItem('todos', JSON.stringify(taskArticle));
      countAllArticle();
    });
  }
};
completeTask();

////------------------------------------------------------
////------------------------------------------------------
////------------------------------------------------------
//todo: filter with buttons
// console.log(allArticl);

let allBtns = document.querySelectorAll('.parent .indown  .all-btns  button');
let allBtns2 = document.querySelectorAll('.parent .outdown  .all-btns  button');

let clearCompleted = document.querySelector('.down .clearCompleted'); //clear btn
let Active = document.querySelectorAll('.indown .all-btns .btn-2'); //active
let complete = document.querySelectorAll('.indown .all-btns .btn-3'); // complete

let Active2 = document.querySelectorAll('.outdown .all-btns .btn-2'); //active
let complete2 = document.querySelectorAll('.outdown .all-btns .btn-3'); // complete

//todo:and add class active on button

let filter = document.querySelectorAll('.parent .all-btns');
filter.forEach((container) => {
  container.addEventListener('click', (e) => {
    const buttons = document.querySelectorAll('.fil');
    for (let button of buttons) {
      button.id === e.target.id
        ? button.classList.add('active')
        : button.classList.remove('active');
    }
  });
});

////---------------------------------------------------
//------------------------!  Wow !---------------------------
////---------------------------------------------------
//show all or active or complete articles when you click on buttons(filter)
function dynamkeShowBtns(button, bollen) {
  button.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let allTask = document.querySelectorAll('.up article');
      for (let ui of allTask) {
        ui.getAttribute('completed') === `${bollen}`
          ? (ui.style.display = 'none')
          : (ui.style.display = 'flex');
      }
      if (button === 'allBtn' && bollen === undefined) {
        ui.style.display = 'flex';
      }
    });
  });
}
dynamkeShowBtns(allBtns, undefined);
dynamkeShowBtns(allBtns2, undefined);
dynamkeShowBtns(Active, true);
dynamkeShowBtns(Active2, true);
dynamkeShowBtns(complete, false);
dynamkeShowBtns(complete2, false);

////---------------------------------------------------------
////---------------------------------------------------------
////---------------------------------------------------------
//remove completed task from html
clearCompleted.addEventListener('click', (e) => {
  let allTask = document.querySelectorAll('.up article');
  allTask.forEach((article) => {
    if (article.getAttribute('completed') === 'true') {
      // console.log(article);
      up.removeChild(article);
      // console.log(article);
      countAllArticle();
    }
  });
  //remove completed html from local storage
  taskArticle = taskArticle.filter((task) => task.completed === false);
  localStorage.setItem('todos', JSON.stringify(taskArticle));
});

////-----------------------------------------------------
//----------------------!  Come on  !-------------------------------
////-----------------------------------------------------
//?  ----------Dark completed----------------

let dark_light = document.querySelector('.dark-light');
const IconSun = 'bg-icon-moon';
// const IconMoon = 'bg-icon-moon';
const selectIcon = localStorage.getItem('selectedIcon');
// const them = document.body.setAttribute('class', localStorage.getItem('them'));
const getCurrentIcon = () => {
  return dark_light.classList.contains(IconSun)
    ? 'bg-icon-sun'
    : 'bg-icon-moon';
};

//! when first click will add sun to LL and add moon to class dark_light
if (selectIcon) {
  dark_light.classList[selectIcon === 'bg-icon-sun' ? 'add' : 'remove'](
    IconSun
  );
}
dark_light.addEventListener('click', (e) => {
  // dark_light.style.animation = `rotate-c 0.6s ease-in-out both infinite`;
  document.body.className === 'light'
    ? (document.body.className = '')
    : (document.body.className = 'light');
  dark_light.classList.toggle(IconSun);
  localStorage.setItem('selectedIcon', getCurrentIcon());
  localStorage.setItem('them', document.body.className);
});

//?---------------------------

function dragStart(e) {
  // console.log(e.target);
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}
function dragOver(e) {
  e.preventDefault();
  // console.log(e.target.innerText);
  e.dataTransfer.dropEffect = 'move';

  return false;
}
function dragEnter(e) {
  this.classList.add('over');
  // console.log('enter');
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('over');
}

function dragEnd(e) {
  var listItens = document.querySelectorAll('.itm');
  [].forEach.call(listItens, function (item) {
    // console.log(item);
    item.classList.remove('over');
  });

  // this.style.opacity = '1';
}
function drop(e) {
  e.preventDefault();
  if (dragSrcEl !== this) {
    // console.log(dragSrcEl);
    dragSrcEl.innerHTML = this.innerHTML;
    // console.log(dragSrcEl);
    this.innerHTML = e.dataTransfer.getData('text/html');
    // console.log(e.currentTarget);
  }

  return false;
}

function loopAllArticleAndAddEvent() {
  // localStorage.setItem('sort', JSON.stringify(e));
  allArticl.forEach((e) => {
    addEventDragAndDrop(e);
  });
}
loopAllArticleAndAddEvent();
function addEventDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart);
  el.addEventListener('dragenter', dragEnter);
  el.addEventListener('dragover', dragOver);
  el.addEventListener('dragleave', dragLeave);
  el.addEventListener('dragend', dragEnd);
  el.addEventListener('drop', drop);
  // console.log('el');
}
//prevent width size

// let up1 = document.querySelector('section .up');

function showInOutButtons() {
  let indown = document.querySelector('section .down .indown');
  let outdown = document.querySelector('section .outdown');
  window.addEventListener('resize', () => {
    // outdown.style.animation = `deleteAnime 500ms ease-out forwards`;
    if (window.innerWidth >= 640) {
      indown.classList.remove('hidden');
      outdown.classList.add('hidden');
    } else {
      indown.classList.add('hidden');
      outdown.classList.remove('hidden');
    }
  });
  if (window.innerWidth >= 640) {
    indown.classList.remove('hidden');
    outdown.classList.add('hidden');
  } else {
    indown.classList.add('hidden');
    outdown.classList.remove('hidden');
  }
}

showInOutButtons();
