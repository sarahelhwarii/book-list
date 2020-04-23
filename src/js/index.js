class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
       <td>${book.title}</td>
      <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href="#" class="delete">X</a></td>
      `;
    list.appendChild(row);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");
    //can't use insertBefore function or remove(),if the parent I got isn't using Queryselector
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    // didn't put a semicolon at the end of isbn why??
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);
  const ui = new UI();
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please Fill in all fields", "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert("Book Added!", "success");
  }
  ui.clearFields();

  e.preventDefault();
});
