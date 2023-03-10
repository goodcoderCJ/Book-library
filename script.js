const searchBtn = document.querySelector(".function-icons .fa-search");
const newBookBtn = document.querySelector(".function-icons .fa-plus");
const ellipsisBtn = document.querySelector(".function-icons .fa-ellipsis-v");

const firstForm = document.querySelector(".first-form");
const closeBtn = document.querySelector(".first-form .fa-times");
const cancelBtn = document.querySelector(".close-btn");
const addBookBtn = document.querySelector(".add-book");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookNoOfPages = document.querySelector("#pages");
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
// show form for filling book details
newBookBtn.addEventListener("click", showElem.bind(this, firstForm), false);

// close form
closeBtn.addEventListener("click", hideElem.bind(this, firstForm), false);

// cancel form filling
cancelBtn.addEventListener("click", hideElem.bind(this, firstForm), false);

// array data structure for book collections
let library = [];

// book class for getting different instance of book
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages + " pg";
    this.read = read;
    this.id = library.length;
  }
}

// variable for book instance
let newBook;

//  Function for adding book to library array
const addBookToLibrary = () => {
  newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookNoOfPages.value,
    bookRead.checked
  );
  if (
    bookTitle.value === "" ||
    bookAuthor.value === "" ||
    bookNoOfPages.value === ""
  ) {
    return;
  } else {
    library.push(newBook);
    setData();
    renderBook();
    bookLogFunc();
    firstForm.reset();
    hideElem(firstForm);
  }
};

// function for setting localstorage to make sure that there is data persistance on browser reload
function setData() {
  localStorage.setItem("book", JSON.stringify(library));
}

// Render details to screen function
function renderBook() {
  const eachBook = document.querySelectorAll(".each-book");
  eachBook.forEach((book) => addedBookSection.removeChild(book));
  for (let i = 0; i < library.length; i++) {
    createBook(library[i]);
  }
}

// creating htmlmarkup for each book details
function createBook(item) {
  const wrapDEiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const authorDiv = document.createElement("div");
  const pageDiv = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  wrapDEiv.classList.add("each-book");
  wrapDEiv.setAttribute("id", item.id);

  titleDiv.textContent = `Title: ${item.title}`;
  titleDiv.classList.add("book-title");
  wrapDEiv.appendChild(titleDiv);

  authorDiv.textContent = `Author: ${item.author}`;
  authorDiv.classList.add("book-author");
  wrapDEiv.appendChild(authorDiv);

  pageDiv.textContent = `Pages: ${item.pages}`;
  pageDiv.classList.add("book-page");
  wrapDEiv.appendChild(pageDiv);

  readBtn.classList.add("readBtn");
  wrapDEiv.appendChild(readBtn);
  if (item.read === false) {
    readBtn.textContent = "Not Read";
    readBtn.style.backgroundColor = "#ffffff";
    readBtn.style.color = " rgb(9, 116, 148)";
  } else {
    readBtn.textContent = "Read";
    readBtn.style.backgroundColor = " rgb(9, 116, 148)";
    readBtn.style.color = "white";
  }
  readBtn.addEventListener("click", () => {
    if (item.read === true) {
      item.read = false;
      readBtn.textContent = "Not Read";
      readBtn.style.backgroundColor = "#ffffff";
      readBtn.style.color = " rgb(9, 116, 148)";
      bookLogFunc();
    } else {
      item.read = true;
      readBtn.textContent = "Read";
      readBtn.style.backgroundColor = " rgb(9, 116, 148)";
      readBtn.style.color = "white";
      bookLogFunc();
    }
    console.log(library);
  });
  removeBtn.textContent = "Remove";
  removeBtn.setAttribute("id", "removeBtn");
  removeBtn.addEventListener("click", function () {
    library.splice(library.indexOf(item), 1);

    setData();
    bookLogFunc();
    renderBook();
  });
  wrapDEiv.appendChild(removeBtn);

  addedBookSection.appendChild(wrapDEiv);
}

// handler executions
firstForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
addBookBtn.addEventListener("click", addBookToLibrary);

//getting data from  localstorage
function restart() {
  if (!localStorage.book) {
    renderBook();
  } else {
    library = JSON.parse(localStorage.getItem("book"));
    bookLogFunc();
    renderBook();
  }
}
restart();

//getting book log function
function bookLogFunc() {
  const booKlength = document.querySelector(".book-length");
  booKlength.textContent = `No of Books: ${library.length}`;
  const noOfRead = document.querySelector(".no-of-read");
  noOfRead.textContent = `No of read books: ${(function () {
    let count = 0;
    for (let i = 0; i < library.length; i++) {
      if (library[i].read === true) {
        count += 1;
      }
    }
    return count;
  })()}`;
  const noOfUnread = document.querySelector(".no-of-unread");
  noOfUnread.textContent = `No of Unread books: ${(function () {
    let count = 0;
    for (let i = 0; i < library.length; i++) {
      if (library[i].read === false) {
        count += 1;
      }
    }
    return count;
  })()}`;
}

const bookLog = document.querySelector(".book-log");
hideElem(bookLog);
function openBookLog() {
  ellipsisBtn.addEventListener("click", () => {
    showElem(bookLog);
  });
}
openBookLog();

// close book log
function closeBookLog() {
  const logBtn = document.querySelector(".book-log-close .fa-times");
  logBtn.addEventListener("click", () => {
    hideElem(bookLog);
  });
}
closeBookLog();

// getting search updates
const searchDiv = document.querySelector(".search-book");
const search = document.querySelector(".search-book input");
searchDiv.style.display = "none";
searchBtn.addEventListener("click", () => {
  searchDiv.style.display = "flex";
});

search.addEventListener("keyup", (e) => {
  const searchVal = e.target.value;
  if (!searchVal) {
    setData();
    renderBook();
    return;
  }
  addedBookSection.innerHTML = "";
  library.filter((book) => {
    if (book.title.toLowerCase().includes(searchVal.toLowerCase())) {
      console.log(book);
      return createBook(book);
    }
  });
});
