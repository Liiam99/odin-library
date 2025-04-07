const myLibrary = [];

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
