function findItemById(items,id){
  return items.find((item) => item.id === id);
}

function findAccountById(accounts, id) {
/*
  //needs a guard clause
 // const hasId = accounts.some((user) => user.id === id);
 // return hasId? accounts :  


  const currentAccount = accounts.find((user) => user.id === id);
  return currentAccount[0]; //I HATE hard coding the first value in this array to return an object. How can I otherwise get this object?
//reseach the .find() method
*/
return findItemById(accounts, id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  const { id } = account;
  let bookBorrows = books.reduce((result, book) => {
    if (book.borrows.some((borrow) => borrow.id === id)) {
      const borrowTally = book.borrows.filter(
        (borrow) => borrow.id === id
      ).length;
      result += borrowTally;
    }
    return result;
  }, 0);
  return bookBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const borrowedBooks = [];

  books.forEach((book) => {
    book.borrows.forEach((borrow,) => {
      //I'm already looping through each borrow instance within the array. I don't need to access the index of anything. This was a major hangup.
      //console.log(borrow.id);
      if (borrow.id === accountId && !borrow.returned) {
        const authorInfo = authors.find(
          (author) => author.id === book.authorId
        );
        console.log(authorInfo);
        borrowedBooks.push({ ...book, author: authorInfo}); //This is super tricky because it causes an invisible error. Remember the fundamentals of object declaration - 'key' : value
        console.log(borrowedBooks);

      }
    });
  });
  console.log(borrowedBooks);
  return borrowedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
