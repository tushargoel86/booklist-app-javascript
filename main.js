const bookForm = document.querySelector('#book-form');
const books = document.querySelector('#book-list');

//ui
const ui = new UI();

//events
bookForm.addEventListener('submit', e => ui.addBook(e));
books.addEventListener('click', e => ui.deleteBook(e))
window.addEventListener('DOMContentLoaded', e => ui.preloadedBooks());

//book model
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//ui model to support ui funcaitonality
function UI() {
    this.deleteBook = function (e) {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.parentElement.remove();
            this.showAlert('Book removed successfully', 'success');
        }
    },

        this.addBook = function (e) {
            e.preventDefault();

            const { title = '', author = '', isbn = '' } = e.target;
            if (title.value === '' || author.value === '' || isbn.value === '') {
                this.showAlert('Please enter all fields', 'danger');
            } else {
                const book = new Book(title.value, author.value, isbn.value);
                this.insertBookIntoTable(book);
                this.showAlert('Book added successfully', 'success');
            }
            title.value = '';
            author.value = '';
            isbn.value = '';
        },
        this.insertBookIntoTable = function (book) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
            books.appendChild(row);
        },

        this.preloadedBooks = function () {
            const preloadedBooks = [{
                title: 'A',
                author: 'author-1',
                isbn: '345r-add4-33'
            },
            {
                title: 'B',
                author: 'author-2',
                isbn: 'fjf-334d-dd'
            }];
            preloadedBooks.forEach(book => this.insertBookIntoTable(book));
        },

        this.showAlert = function (message, className) {
            let div = document.createElement('div');
            div.className = `alert alert-${className}`;
            div.appendChild(document.createTextNode(message));

            const container = document.querySelector('.container');
            container.insertBefore(div, bookForm);
            setTimeout(() => div.remove(), 3000);
        }

}
