(() => {

    const myLibrary = [];

    addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, false);
    addBookToLibrary("Harry Potter and the Philosopher's Stone", 'J.K. Rowling', 223, true);
    addBookToLibrary('Material matters', 'Thomas Rau', 224, true);

    addLibraryToDisplay(myLibrary)


    function Book(title, author, n_page, have_read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.n_page = n_page;
        this.have_read = have_read;
    }


    function addBookToLibrary(title, author, n_page, have_read) {
        let book = new Book(title, author, n_page, have_read);

        myLibrary.push(book);
    }


    function addLibraryToDisplay() {
        const docFrag = document.createDocumentFragment();

        for (let i = 0; i < myLibrary.length; i++) {
            const tableEntry = createTableEntry(myLibrary[i]);

            const rowHeader = document.createElement('th');
            rowHeader.textContent = i + 1;
            rowHeader.setAttribute('scope', 'row');
            tableEntry.prepend(rowHeader);

            docFrag.appendChild(tableEntry);
        }

        const table = document.querySelector('table');
        table.appendChild(docFrag);
    }


    function createTableEntry(book) {
        const tableRow = document.createElement('tr');

        for (const prop in book) {
            if (prop === 'id') {
                continue;
            }

            const tableData = document.createElement('td');
            tableData.textContent = book[prop];
            tableRow.appendChild(tableData);
        }

        return tableRow;
    }
})();
