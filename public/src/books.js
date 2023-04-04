function findItemById(items,id){
  return items.find((item) => item.id === id);
}

function findAuthorById(authors, id) {
return findItemById(authors,id);
}

function findBookById(books, id) {
return findItemById(books,id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedBooks = books.filter((book) => book.borrows.some((borrow) => !borrow.returned));
  let returnedBooks = books.filter((book) => book.borrows.every((borrow) => borrow.returned));

  return [borrowedBooks,returnedBooks];  
}

function getBorrowersForBook(book, accounts) {
  const borrowData = book.borrows;
  const borrowers = []

borrowData.forEach((borrow) => {
 const matchingAccount = accounts.find((account) => account.id === borrow.id);
 borrowers.push({...matchingAccount,returned: borrow.returned});
})

for(i=borrowers.length; i>10; i--){
borrowers.pop();
}
//I don't love this solution. Grant, I'd appreciate some feedback on alternative ways to achieve this outcome.
return borrowers
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
