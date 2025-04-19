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


    function Book(title, author, n_page) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.n_page = n_page;
        this.read = false;
    }

    Book.prototype.toggleRead = function () {
        this.read = this.read ? false : true;
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

        for (const prop in book) {
            if (prop !== 'id' && prop !== 'toggleRead') {
                const tableData = document.createElement('td');

                if (prop === 'read') {
                    const readCheckbox = document.createElement('input');
                    readCheckbox.type = 'checkbox';
                    readCheckbox.checked = book.read;
                    readCheckbox.addEventListener('change', () => {book.toggleRead()});
                    tableData.appendChild(readCheckbox);
                } else {
                    tableData.textContent = book[prop];
                }

                tableRow.appendChild(tableData);
            }
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
