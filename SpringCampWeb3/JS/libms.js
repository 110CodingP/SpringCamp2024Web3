//A class for books
class LibraryBook {
    constructor(title,author,yr,copiesAvail, copiesTotal) {
        this.Title = title;
        this.Author = author;
        this.PublicationYear= yr;
        this.AvailableCopies= copiesAvail;
        this.TotalCopies = copiesTotal;
    }
};
// A class for transaction
class LibraryTransaction {
    constructor(patron,book,date,type) {
        this.Patron = patron;
        this.Book = book;
        this.Date = date;
        this.Type= type; //true for issue and false for return
    }
};

//A class for library
class Library {
    constructor(books,transactions=[]) {
        this.Books = books;
        this.Transactions=transactions;
    }
    CheckOut = (book) => {
        let found=false;
        let idx=-1;
        for (let i=0 ;i<this.Books.length;i++) {
            if (this.Books[i]===book) {
                found=true;
                idx=i;
            }
        }
        if (found) {
            console.log(`Yes, ${book.Title} is in the library catalogue`);
            if (this.Books[idx].AvailableCopies>0) {
                console.log(`${book.Title}  has been issued to you`);
                this.Books[idx].AvailableCopies--;
                return true;
            }
            else {
                console.log(`Sorry, this book is currently unvailable`);
            }
        }
        else {
            console.log('Sorry, we donot have this book in the library catalogue');
        }
        return false;
    };
    CheckIn = (book) => {
        for (let i=0 ;i<this.Books.length;i++) {
            if (this.Books[i]===book) {
                this.Books[i].AvailableCopies++;
                console.log("Thank You! Have a nice day!");
                break;
            }
        }
    };
};

// A class for Patron
class LibraryPatron {
    constructor(id,name,branch,checkedOut=[]) {
        this.PatronID=id;
        this.Name=name;
        this.CheckedOutBooks=checkedOut;
        this.LibraryBranch=branch;
    };
    CheckedOutBook=(book,date)=> {
        let reservedByElse=false;
        let idx=-1;
        for (let i=0;i<this.LibraryBranch.Reservations.length;i++) {
            if (this.LibraryBranch.Reservations[i][1]==book) {
              if (this.LibraryBranch.Reservations[i][0]==this) {
                idx=i;
              }
              else {
                reservedByElse=true;
              }
            }
        }
        if (idx!=-1) {
            this.LibraryBranch.Reservations.splice(idx,1);
        }
        if (!reservedByElse){
            if (this.LibraryBranch.CheckOut(book)) {
            this.CheckedOutBooks.push([book,date+1]);
            //console.log(this.CheckedOutBooks);
            let transaction= new LibraryTransaction(this,book,date,true);
            this.LibraryBranch.Transactions.push(transaction);
            }
        }
    };
    ReturnBook=(book,date)=> {
        let idx=-1;
        //console.log(this.CheckedOutBooks);
        for (let i=0;i<this.CheckedOutBooks.length;i++) {
            if (this.CheckedOutBooks[i][0]===book) {
                idx=i;
            }
        }
        //console.log(idx);
        let transaction = new LibraryTransaction(this,book,date,false);
        this.LibraryBranch.Transactions.push(transaction);
        this.LibraryBranch.CheckIn(book);
        //console.log(this.CheckedOutBooks[idx][0]);
        if (date>this.CheckedOutBooks[idx][1]) {
           console.log(`Please pay a fine of ${(date-this.CheckedOutBooks[idx][1])*0.01} for returning the book late.`);
        }
    };
    ReserveBook = (book) => {
      let found=false;
      for (let i=0;i<this.LibraryBranch.Reservations.length;i++) {
        if (this.LibraryBranch.Reservations[i][1]==book) {
            found=true;
            break;
        }
      }
      if (!found) {
        this.LibraryBranch.Reservations.push([this,book]);
        console.log("This book has been reserved for you.");
      }
      else {
        console.log("Sorry, this book has already been reserved by someone else! Please come later.");
      }
    }
};

// Extending Library to a branch
class LibraryBranch extends Library {
    constructor(books,name,patrons=[],reservations=[]) {
        super(books);
        this.BranchName=name;
        this.Patrons=patrons;
        this.Reservations=reservations;
    }
    AddPatron =(patron)=> {
        this.Patrons.push(patron);
    }
};

//Testing
const book1 = new LibraryBook('xyz','abc',123,1,2);
let books = [book1];
const IITKLib = new LibraryBranch(books,'IITK');
//console.log(IITKLib);
let person1 = new LibraryPatron(123,'Someone',IITKLib);
let person2 = new LibraryPatron(124,'Someone2', IITKLib);
IITKLib.AddPatron(person1);
IITKLib.AddPatron(person2);
person1.CheckedOutBook(book1,0);
person2.CheckedOutBook(book1,0);
person2.ReserveBook(book1);
//console.log(IITKLib.Reservations);
// console.log(IITKLib.Transactions);
person1.ReturnBook(book1,2);
person1.ReserveBook(book1);
person2.CheckedOutBook(book1,3);
person1.CheckedOutBook(book1,3);
person1.ReserveBook(book1);
//console.log(IITKLib.Transactions);






