(() => {
    const dialog = document.querySelector('dialog');
    const showButton = document.querySelector('.show-dialog');
    showButton.addEventListener('click', () => {
        dialog.showModal();
    });

    const closeButton = document.querySelector('.close-dialog');
    closeButton.addEventListener('click', () => {
        dialog.close();
    });

    dialog.addEventListener('close', clearBookForm);

    const bookForm = document.querySelector('.book-form');
    bookForm.addEventListener('submit', () => {
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const numberOfPages = document.querySelector('#number-of-pages').value;

        addBookToLibrary(title, author, numberOfPages);
        addLibraryToDisplay();

        clearBookForm();
    });

    const myLibrary = [];


    class Book {
        #id = crypto.randomUUID();
        read = false;

        constructor(title, author, n_page) {
            this.title = title;
            this.author = author;
            this.n_page = n_page;
        }
        get fields() {
            return {
                title: this.title,
                author: this.author,
                n_page: this.n_page,
                read: this.read,
            };
        }
        toggleRead() {
            this.read = !this.read;
        }
    }


    function addBookToLibrary(title, author, n_page) {
        let book = new Book(title, author, n_page);

        myLibrary.push(book);
    }


    function addLibraryToDisplay() {
        const docFrag = document.createDocumentFragment();

        for (const book of myLibrary) {
            const tableEntry = createTableEntry(book);
            docFrag.appendChild(tableEntry);
        }

        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = '';
        tableBody.appendChild(docFrag);
    }


    function createTableEntry(book) {
        const tableRow = document.createElement('tr');

        for (const field in book.fields) {
            const tableData = document.createElement('td');

            if (field === 'read') {
                const readCheckbox = document.createElement('input');
                readCheckbox.type = 'checkbox';
                readCheckbox.checked = book.read;
                readCheckbox.addEventListener('change', () => {book.toggleRead()});
                tableData.appendChild(readCheckbox);
            } else {
                tableData.textContent = book[field];
            }

            tableRow.appendChild(tableData);
        }

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.type = 'button';
        removeButton.className = 'remove-book';
        removeButton.addEventListener('click', () => {
            tableRow.remove();
            myLibrary.splice(myLibrary.indexOf(book), 1);
        })
        tableRow.appendChild(removeButton);

        return tableRow;
    }


    function clearBookForm() {
        const titleField = document.querySelector('#title');
        const authorField = document.querySelector('#author');
        const numberOfPagesField = document.querySelector('#number-of-pages');

        titleField.value = '';
        authorField.value = '';
        numberOfPagesField.value = '';
    }
})();
