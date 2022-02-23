const INCOMPLETE_BOOK = "unreadBook";
const COMPLETE_BOOK = "readedBook";
const BOOKS_KEY = "APPLICATION_BOOKSHELF";
let books = [];
document.addEventListener("DOMContentLoaded", function () {
    const book = document.getElementById("formAddBook");
    const searchBook = document.getElementById("formSearch");

    book.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();

        document.getElementById("formInputJudul").value = "";
        document.getElementById("formInputAuthorBook").value = "";
        document.getElementById("formInputYearBook").value = "";
        document.getElementById("formInputIsDone").checked = false;
    });

    searchBook.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputSearch = document.getElementById("formInputSearch").value;
        const filter = inputSearch.toUpperCase();
        const titles = document.getElementsByTagName("h5");

        for (let i = 0; i < titles.length; i++) {
            const titlesText = titles[i].textContent || titles[i].innerText;

            if (titlesText.toUpperCase().indexOf(filter) > -1) {
                titles[i].closest(".card").style.display = "";
            } else {
                titles[i].closest(".card").style.display = "none";
            }
        }
    })
    let data = JSON.parse(localStorage.getItem(BOOKS_KEY));
    if (data !== null) {
        books = data;
    }
    document.dispatchEvent(new Event("onjsonfetched"));
});

document.addEventListener("onjsonfetched", function () {
    for (book of books) {
        const newBook = createBook(book.id, book.title, book.author, book.year, book.isComplete);

        if (book.isComplete) {
            document.getElementById(COMPLETE_BOOK).append(newBook);
        } else {
            document.getElementById(INCOMPLETE_BOOK).append(newBook);
        }
    }
});

const addBook = () => {
    const idBook = new Date().getTime();
    const formInputJudul = document.getElementById("formInputJudul").value;
    const formInputAuthorBook = document.getElementById("formInputAuthorBook").value;
    const formInputYearBook = document.getElementById("formInputYearBook").value;
    const formInputIsDone = document.getElementById("formInputIsDone").checked;
    const book = createBook(idBook, formInputJudul, formInputAuthorBook, formInputYearBook, formInputIsDone);
    const bookArray = converArray(idBook, formInputJudul, formInputAuthorBook, formInputYearBook, formInputIsDone);

    books.push(bookArray);
    if (formInputIsDone) {
        document.getElementById(COMPLETE_BOOK).append(book);
    } else {
        document.getElementById(INCOMPLETE_BOOK).append(book);
    }
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

const createBook = (idBook, formInputJudul, formInputAuthorBook, formInputYearBook, formInputIsDone) => {
    const book = document.createElement('div');
    book.setAttribute('id', idBook);
    book.classList.add('card', 'my-3');

    const bookTitle = document.createElement('h5');
    bookTitle.classList.add('text-truncate', 'judul');
    bookTitle.style.maxWidth = "200px";
    bookTitle.innerText = formInputJudul;

    const bookAuthor = document.createElement('span');
    bookAuthor.classList.add('text-truncate', 'judul');
    bookAuthor.style.maxWidth = "200px";
    bookAuthor.innerText = formInputAuthorBook;

    const bookYear = document.createElement('span');
    bookAuthor.classList.add('text-truncate', 'judul');
    bookYear.innerText = formInputYearBook;

    const br = document.createElement("br");

    const card = document.createElement('div');
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-body", "border-start", "border-4", "border-info", "d-flex", "justify-content-between");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardAction = addAction(formInputIsDone, idBook);

    cardContent.append(bookTitle, bookAuthor, br, bookYear);
    cardContainer.append(cardContent);
    cardContainer.append(cardAction);
    book.append(cardContainer);

    return book;
}

const addAction = (formInputIsDone, idBook) => {
    const cardAction = document.createElement('div')
    const actionDeletes = actionDelete(idBook); 
    const actionChecks = actionCheck(idBook); 
    const actionRollbacks = actionRollback(idBook); 

    cardAction.append(actionDeletes);
    if (formInputIsDone) {
        cardAction.append(actionRollbacks);
    } else {
        cardAction.append(actionChecks);
    }
    return cardAction;
}

const actionDelete = (idBook) => {
    const actionDelete = document.createElement('button');
    actionDelete.classList.add('btn', 'btn-outline-danger', 'btn-sm');
    actionDelete.innerHTML = '<i class="bi bi-x"></i>';
    actionDelete.type = 'button';

    actionDelete.addEventListener('click', function() {
        let confirmation = confirm('Apakah anda yakin ingin mengahapus data ini ?');
        if (confirmation) {
            const card = document.getElementById(idBook);
            card.addEventListener("eventDelete", function (event) {
                event.target.remove();
            });
            card.dispatchEvent(new Event("eventDelete"));
            
            for (let arrayPosition = 0; arrayPosition < books.length; arrayPosition++) {
                if (books[arrayPosition].id == idBook) {
                    books.splice(arrayPosition, 1);
                    break;
                }
            }
            localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
        }
    });
    return actionDelete;
}

const actionRollback = (idBook) => {
    const actionRollback = document.createElement('button');
    actionRollback.classList.add('btn', 'btn-outline-warning', 'btn-sm');
    actionRollback.innerHTML = '<i class="bi bi-arrow-counterclockwise"></i>';
    actionRollback.type = 'button';

    actionRollback.addEventListener('click', function() {
        const card = document.getElementById(idBook);
        const bookTitle = card.querySelector(".card-content > h5").innerText;
        const bookAuthor = card.querySelectorAll(".card-content > span")[0].innerText;
        const bookYear = card.querySelectorAll(".card-content > span")[0].innerText;
        card.remove();
        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, false);
        document.getElementById(INCOMPLETE_BOOK).append(book);

        for (let arrayPosition = 0; arrayPosition < books.length; arrayPosition++) {
            if (books[arrayPosition].id == idBook) {
                books.splice(arrayPosition, 1);
                break;
            }
        }
        books.push(converArray(idBook, bookTitle, bookAuthor, bookYear, false))
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    });
    return actionRollback;
}

const actionCheck = (idBook) => {
    const action = document.createElement("button");
    action.classList.add("btn", "btn-sm", "btn-outline-primary");
    action.innerHTML = '<i class="bi bi-check"></i>';

    action.addEventListener("click", function () {
        const card = document.getElementById(idBook);
        const bookTitle = card.querySelector(".card-content > h5").innerText;
        const bookAuthor = card.querySelectorAll(".card-content > span")[0].innerText;
        const bookYear = card.querySelectorAll(".card-content > span")[0].innerText;
        card.remove();
        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, true);
        document.getElementById(COMPLETE_BOOK).append(book);

        for (let arrayPosition = 0; arrayPosition < books.length; arrayPosition++) {
            if (books[arrayPosition].id == idBook) {
                books.splice(arrayPosition, 1);
                break;
            }
        }
        books.push(converArray(idBook, bookTitle, bookAuthor, bookYear, true))
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    })

    return action;
}

function converArray(id, title, author, year, isComplete) {
    return {
        id, title, author, year, isComplete,
    };
}
