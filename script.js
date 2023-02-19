const searchBtn = document.querySelector(".function-icons .fa-search");
const newBookBtn = document.querySelector(".function-icons .fa-plus");
const ellipsisBtn = document.querySelector(".function-icons .fa-ellipsis-v");
const heroPage = document.querySelector(".book-background");
const firstForm = document.querySelector(".first-form");
const closeBtn = document.querySelector(".first-form .fa-times");
const cancelBtn = document.querySelector(".close-btn");
const addBookBtn = document.querySelector(".add-book");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookNoOfPages = document.querySelector("#page");
const bookRead = document.querySelector("#read");
const addedBookSection = document.querySelector(".added-books");

function showElem(elem) {
  elem.classList.add("show");
  elem.classList.remove("hide");
}
function hideElem(elem) {
  elem.classList.add("hide");
  elem.classList.remove("show");
}
function preventDefault(e) {
  e.preventDefault();
}
newBookBtn.addEventListener("click", showElem.bind(this, firstForm), false);
closeBtn.addEventListener("click", hideElem.bind(this, firstForm), false);
cancelBtn.addEventListener("click", hideElem.bind(this, firstForm), false);
firstForm.addEventListener("submit", preventDefault);

const library = [];
class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
}

function addBookToLibrary(lib) {
  let date = new Date().getTime();
  let checkedRead = bookRead.checked;
  let read;
  if (checkedRead) {
    read = true;
  } else {
    read = false;
  }

  let book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookNoOfPages.value,
    read,
    date
  );
  lib.push(book);
  console.log(library);
}
addBookBtn.addEventListener(
  "click",
  addBookToLibrary.bind(this, library),
  false
);
