/**
 * @type {HTMLAllCollection}
 */

import { dataToHtml } from './dataHtml.js';

const inputValue = document.querySelector('.parent-list input');
let dragSrcEl = null;
// All articles come here for every enter
let allArticl = [];
console.log(allArticl);

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

let draggable = document.querySelectorAll('.parent .up .itm');
const up = document.querySelector('.parent .up');

function pushFiveArticleFromHtml() {
  draggable.forEach((n) => {
    // console.log(n);
    addEventDragAndDrop(n);
    allArticl.push(n);
  });
}
pushFiveArticleFromHtml();

function loopAllArticleAndAddEvent() {
  allArticl.forEach((e) => {
    addEventDragAndDrop(e);
  });
}

function addEventDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart);
  el.addEventListener('dragenter', dragEnter);
  el.addEventListener('dragover', dragOver);
  el.addEventListener('dragleave', dragLeave);
  el.addEventListener('dragend', dragEnd);
  el.addEventListener('drop', drop);
}

//to count all article in To-Do app
function countAllArticle() {
  const parent = document.querySelector('.parent .down .lef .num');
  parent.innerText = `${up.childElementCount}`;
  // addCheck();
}
countAllArticle();

// function addItem() {
//   document.addEventListener('keydown', (e) => {
//     const id = new Date().getTime().toString();
//     const value = inputValue.value;
//     if (value === '' && e.keyCode === 13) {
//       alert('add somthing');
//     } else {
//       if (value !== '' && e.keyCode === 13) {
//         let afterSix = up.childElementCount + 1;
//         // let fromLS = createArticle(afterSix, value, afterSix);
//         createArticle(afterSix, value, afterSix);
//         // createArticle(id, value, afterSix);
//         countAllArticle();
//         delteArticle();
//         // addCheck2();
//         addCheck();
//         loopAllArticleAndAddEvent();
//         // toggles();
//         addToLS();
//         // showArticleInHtml();
//         inputValue.value = '';

//         // showFreomLS();
//       }
//     }
//   });
// }
// addItem();

// function createArticle(id, value, afterSix) {
//   const div = document.createElement('article');
//   let attr = document.createAttribute('data-id');
//   // attr.value = id;
//   //add attribute
//   div.setAttribute('draggable', 'true');
//   div.setAttribute('completed', 'false');
//   div.setAttribute('id', `draggable-${afterSix}`);
//   div.setAttribute(
//     'class',
//     'itm  flex justify-between text-white pt-4 pb-4 pl-6 text-lef'
//   );
//   // div.setAttributeNode(attr);
//   div.innerHTML = `

//           <p class="text_P pl-6">${value}</p>
//           <input class="allInput " type="checkbox" id="cir${id}">
//           <label for="cir${id}">
//               <span class="circle border border-gray-500 left-12 absolute right-0 h-6 w-6 rounded-3xl ">
//                   <img class="img px-1.5 pt-1.5 pb-1 invisible " src="./src/images/icon-check.svg" alt="">
//               </span>
//           </label>
//           <div class="">
//               <img class=" delete-btn bg-icon-cross mr-3 cursor-pointer " src="./src/images/icon-cross.svg" alt="">
//           </div>
//       `;

//   let newArticle = up.appendChild(div);

//   allArticl.push(newArticle);
// }

// Create ui for html

function disapleArticle(task) {
  const article = document.createElement('article');
  article.className =
    'itm rounded-t-md flex justify-between text-white pt-4 pb-4 pl-4 text-lef';
  article.setAttribute('completed', task.completed);
  article.innerHTML = `
        <label class=" border border-gray-500   right-0 h-6 w-6 rounded-3xl" for="${task.id}">
          <span class="circle ">
            <input class="allInput hidden" type="checkbox" id="${task.id}">
            <img class="img px-1.5 pt-1.5 pb-1 invisible" src="./src/images/icon-check.svg" alt="">
          </span>
        </label>
        <p class="text_P pl-3 flex-grow">${task.text}</p>
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

function addItemToUi() {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputValue.value) {
      // const randomID = Math.random();
      const randomID = up.childElementCount;
      const userValue = {
        text: inputValue.value,
        completed: false,
        id: randomID,
      };
      //add to LS
      dataToHtml.push(userValue);
      localStorage.setItem('todos', JSON.stringify(dataToHtml));
      //adding to html
      disapleArticle(userValue);
      // completeTask();
      countAllArticle();
      inputValue.value = '';
    }
  });
}
addItemToUi();

//add to local storage
// function addToLS() {
//   let todo = [];
//   allArticl.forEach((item) => {
//     // console.log(item.parentNode.parentNode);
//     todo.push({
//       text: item.children[0].innerHTML,
//       completed: item.children[1].checked,
//       // dark:,
//     });
//   });
//   localStorage.setItem('todos', JSON.stringify(todo));
// }
// // addToLS();
// function showFreomLS() {
//   let afterSix = up.childElementCount + 1;
//   let viewLocal = [];
//   let fromLS = JSON.parse(localStorage.getItem('todos')) || [];
//   let s = fromLS.forEach((one) => {
//     viewLocal.push(one['text']);
//   });
//   for (let i = 0; i < viewLocal.length; i++) {
//     createArticle(afterSix, viewLocal[i], afterSix);
//     // console.log(soliceVieLos);
//   }
//   countAllArticle();
// }
// // showFreomLS();

// function removeFromLOS(todo, text) {
//   return localStorage.removeItem(todo, text);
// }

const deleteBtn = document.querySelectorAll('.delete-btn');

// console.log(deleteBtn);
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
      (id) => id.id === parseInt(inputId.id)
    );
    // console.log(taskIndex);
    taskArticle.splice(taskIndex, 1);
    localStorage.setItem('todos', JSON.stringify(taskArticle));
    countAllArticle();
  }
});

//Completed task or add Check

let allInput = document.querySelectorAll('.allInput');
let circle = document.querySelectorAll('article .circle ');
// console.log(circle);

const completeTask = function () {
  for (let check of allInput) {
    let thisArticle = check.parentElement.parentElement.parentElement;
    thisArticle.getAttribute('completed') === 'true'
      ? (check.checked = true)
      : (check.checked = false);
    let cir = thisArticle.children[0];

    // console.log(cir.firstElementChild.children[1]);
    check.addEventListener('click', (e) => {
      const idInput = check.id;
      let addImg =
        ' background-image:linear-gradient(to right bottom, #57ddff, #c058f3)';

      let removeImg =
        ' background-image:linear-gradient(to right bottom, #57ddff, #c058f3) ';

      thisArticle.setAttribute('completed', check.checked);
      showTask(check, addImg, removeImg, cir, thisArticle);

      for (let task of dataToHtml) {
        if (task.id === parseInt(idInput)) {
          console.log(task.id);
          task.completed = check.checked;
          // localStorage.setItem('todos', JSON.stringify(dataToHtml));
        }
      }
      localStorage.setItem('todos', JSON.stringify(dataToHtml));
      countAllArticle();
    });
  }
};
completeTask();

function showTask(check, addImg, removeImg, cir, thisArticle) {
  for (let task of dataToHtml) {
    // console.log(task);
    if (check.checked) {
      cir.setAttribute('style', addImg);
      thisArticle.children[1].classList.add('line');
      cir.firstElementChild.children[1].classList.remove('invisible');
    } else {
      cir.removeAttribute('style', removeImg);
      thisArticle.children[1].classList.remove('line');
      cir.firstElementChild.children[1].classList.add('invisible');
    }
  }
}

let all = document.querySelectorAll('.parent .all .all-btns button');
all.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let element = document.querySelector('');
    if (e.target.classList.contains('text-BrightBlue')) {
      e.target.classList.remove('text-BrightBlue');
      console.log(e.target);
    }
    e.target.classList.add('text-BrightBlue');
  });
});
let dark_light = document.querySelector('.dark-light');

// function gsapAnimation() {
//   gsap.fromTo(
//     '.dark-light',
//     {
//       rotation: 180,
//       opacity: 0.5, // from state
//     },
//     {
//       rotation: -180,
//       opacity: 1, // to end state
//     }
//   );
// }

// console.log(articlesColor);

// addCheck in html
function addCheck(e) {
  let withCheck = [];
  for (let check of allArticl) {
    // console.log(check);
    // check.addEventListener('click', (circle) => {
    //   console.log(circle);
    // });

    check.addEventListener('click', (e) => {
      if (check.children[1].checked === true) {
        check.children[2].firstElementChild.firstElementChild.classList.remove(
          'invisible'
        );
        check.children[2].firstElementChild.setAttribute(
          'style',
          ' background-image:linear-gradient(to right bottom, #57ddff, #c058f3); '
        );
        check.children[0].classList.add('line');
        check.setAttribute('completed', 'true');
        // check.children[1].checked = true;
        // changeState(check);
      } else {
        check.children[2].firstElementChild.firstElementChild.classList.add(
          'invisible'
        );
        check.children[0].classList.remove('line');
        check.children[2].firstElementChild.removeAttribute(
          'style',
          ' background-image:linear-gradient(to right bottom, #57ddff, #c058f3); '
        );
        check.setAttribute('completed', 'false');
        // check.children[1].checked = false;
      }
    });
    // if (check.children[0].innerHTML !== todosValue) {
    //   todosValue.push(check.children[0].innerHTML);
    // }
  }
  // addToLS();
  // console.log(todosValue);
}
// addCheck();

function addCheck2(e) {
  let withCheck = [];

  // console.log(circle.parentElement);
  // for (let check of allInput) {
  //   let thisArticle = check.parentElement;
  // console.log(thisArticle.children[0]);
  // let cir = thisArticle.children[0];
  // let input = thisArticle.children[2].checked;
  // console.log(thisArticle.children[2].checked === false);

  // let MakeTrue =
  //   thisArticle.children[0].classList.contains('background-image') === true
  //     ? (check.checked = true)
  //     : (check.checked = false);
  // console.log(
  //   thisArticle.children[0].classList.contains('background-image') === false
  // );
  // cir.addEventListener('click', (e) => {
  //   // console.log(e.target);
  //   if (input.checked !== true) {
  //     console.log(' click');
  //     // check.children[2].checked = false;
  //     cir.firstElementChild.classList.remove('invisible');
  //     thisArticle.children[0].setAttribute(
  //       'style',
  //       ' background-image:linear-gradient(to right bottom, #57ddff, #c058f3); '
  //     );
  //     thisArticle.children[1].classList.add('line');
  //     thisArticle.children[2].checked = true;
  //     console.log(thisArticle);
  //     check.setAttribute('completed', 'true');
  //   } else {
  //     console.log('else click');
  //     cir.firstElementChild.classList.add('invisible');
  //     thisArticle.children[0].removeAttribute(
  //       'style',
  //       ' background-image:linear-gradient(to right bottom, #57ddff, #c058f3); '
  //     );
  //     thisArticle.children[1].classList.remove('line');
  //     thisArticle.children[2].checked = false;

  //      check.children[2].checked = true;
  //      check.children[0].firstElementChild.classList.add('invisible');
  //      check.children[1].classList.remove('line');
  //      check.children[0].removeAttribute(
  //        'style',
  //        ' background-image:linear-gradient(to right bottom, #57ddff, #c058f3); '
  //      );
  //      check.setAttribute('completed', 'false');
  //   }
  // });
  // console.log(check.children);//check.getAttribute('completed') === 'false'
  // allArticleWithCheck.push(check.children[2].checked);
  // }
  // console.log(allArticleWithCheck);
}
// addCheck2();

function addWhiteToArticle() {
  let articlesColor = document.querySelectorAll('article');
  articlesColor.forEach((article) => {
    toggles(article, 'upW');
    toggles(article, 'text-color');
  });
}
let rotate = 0;
function gsapAnimation() {
  let form = document.querySelector('form');
  let bodyBg = document.querySelector('body');
  let header = document.querySelector('header');
  let parentlistW = document.querySelector('.parent-list');
  let buttW = document.querySelector('.butt');
  let itmW = document.querySelector('.itm');
  let upW = document.querySelector('.up');
  let downW = document.querySelector('.down');
  let downW2 = document.querySelector('.down2');
  let placeHolder = document.querySelector('input');

  addWhiteToArticle();
  toggles(downW, 'downW');
  toggles(downW2, 'downW2');
  toggles(upW, 'upW');
  toggles(header, 'bg-light-mobile');
  toggles(bodyBg, 'toWhie');
  toggles(form, 'upW');
  toggles(buttW, 'upW');
  toggles(placeHolder, 'input');
  toggles(placeHolder, 'input2');
  toggles(dark_light, 'bg-icon-moon');
  rotate += 180;
  if (rotate === 360) {
    rotate = 0;
  }

  dark_light.style.transform = `rotate(${rotate}deg)`;
}
dark_light.addEventListener('click', gsapAnimation);

function toggles(tag, tooge) {
  if (!dark_light.classList.contains('bg-icon-moon')) {
    tag.classList.add(`${tooge}`);
  } else {
    tag.classList.remove(`${tooge}`);
    // dark_light.classList.remove('bg-icon-moon');
  }
}
//?  ----------Dark completed----------------
// const ThemImg = document.querySelector('.dark-light');
// const IconSun = 'bg-icon-sun';
// const selectIcon = localStorage.getItem('selectedIcon');
// const getCurrentIcon = () => {
//   ThemImg.classList.contains('bg-icon-sun') ? 'bg-icon-moon' : 'bg-icon-sun';
// };
// ThemImg.addEventListener('click', () => {
//   ThemImg.classList.toggle(IconSun);
//   localStorage.setItem('selectedIcon', getCurrentIcon());
// });
//?---------------------------
