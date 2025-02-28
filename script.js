const API_KEY = 'AIzaSyBDglAtK_lUl6DFoWyPd-k3e2SZC13qUrQ';

async function searchBooks() {
    let query = document.getElementById("search").value;
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`);
    let data = await response.json();
    displayResults(data.items);
}

function displayResults(books) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    
    books.forEach(book => {
        let bookDiv = document.createElement("div");
        bookDiv.className = "book";
        bookDiv.innerHTML = `
            <img src="${book.volumeInfo.imageLinks?.thumbnail || 'no_image.png'}" onclick="viewBook('${book.id}')">
            <h3>${book.volumeInfo.title}</h3>
            <p>${book.volumeInfo.authors?.join(", ") || "Unknown Author"}</p>
        `;
        resultsDiv.appendChild(bookDiv);
    });
}

async function viewBook(bookId) {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}`);
    let book = await response.json();
    
    document.getElementById("bookDetails").innerHTML = `
        <h2>${book.volumeInfo.title}</h2>
        <img src="${book.volumeInfo.imageLinks?.thumbnail || 'no_image.png'}">
        <p><strong>Authors:</strong> ${book.volumeInfo.authors?.join(", ") || "Unknown"}</p>
        <p><strong>Description:</strong> ${book.volumeInfo.description || "No description available."}</p>
        <p><strong>Average Rating:</strong> ${book.volumeInfo.averageRating || "N/A"} ⭐</p>
    `;
}
