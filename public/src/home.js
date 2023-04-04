function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => book.borrows.some((borrow) => !borrow.returned))
    .length;
}

function getMostCommonGenres(books) {
  const topGenres = [];
  const bookGenres = books.map((book) => book.genre);
  const genreSet = [...new Set(bookGenres)];

  const genreCounts = genreSet.forEach((genre) => {
    const genreCount = books.filter((book) => book.genre === genre).length;
    topGenres.push({ name: genre, count: genreCount });
  });
  const sortedGenres = topGenres.sort(
    (genreA, genreB) => genreB.count - genreA.count
  );

  for (i = sortedGenres.length; i > 5; i--) {
    sortedGenres.pop();
  }
  return sortedGenres;
}

function getMostPopularBooks(books) {
  const bookTally = [];

  books.forEach((book) => {
    const borrowCount = book.borrows.length;
    const { title } = book;
    bookTally.push({ name: title, count: borrowCount });
  });

  const sortedTally = bookTally.sort(
    (bookA, bookB) => bookB.count - bookA.count
  );

  for (i = bookTally.length; i > 5; i--) {
    bookTally.pop();
  }
  return bookTally;
}

function getMostPopularAuthors(books, authors) {
  const topAuthors = [];
  const bookAuthors = books.map((book) => book.authorId);
  const authorSet = [...new Set(bookAuthors)];


  const authorCounts = authorSet.forEach((authorId) => {
    const authorBooks = books.filter((book) => book.authorId === authorId);
    
    
    const authorBorrowCount = authorBooks.reduce((result,book) => {
      result += book.borrows.length;
      return result;
    },0);


    const matchingAuthorObj = authors.find((author) => author.id === authorId);
    const {name: {first, last}} = matchingAuthorObj;
  
    topAuthors.push({ name: `${first} ${last}`, count: authorBorrowCount});
  });
  
  
  const sortedAuthors = topAuthors.sort(
    (authorA, authorB) => authorB.count - authorA.count
  );
 
  for (i = sortedAuthors.length; i > 5; i--) {
    sortedAuthors.pop();
  }
  
  return sortedAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
