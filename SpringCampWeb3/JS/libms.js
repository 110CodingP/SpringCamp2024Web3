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
    }
    CheckedOutBook=(book)=> {
        if (this.LibraryBranch.CheckOut(book)) {
            this.CheckedOutBooks.push(book);
            let transaction= new LibraryTransaction(this,book,123,true);
            this.LibraryBranch.Transactions.push(transaction);
        }
    }
    ReturnBook=(book)=> {
        let idx=-1;
        for (let i=0;i<this.CheckedOutBooks.length;i++) {
            if (this.CheckedOutBooks[i]==book) {
                idx=i;
            }
        }
        let transaction = new LibraryTransaction(this,book,123,false);
        this.LibraryBranch.transactions.push(transaction);
        this.LibraryBranch.CheckIn(book);
    }
};

// Extending Library to a branch
class LibraryBranch extends Library {
    constructor(books,name,patrons=[]) {
        super(books);
        this.BranchName=name;
        this.Patrons=patrons;
    }
    AddPatron =(patron)=> {
        this.Patrons.push(patron);
    }
};
//Due dates and reservation
//Checking if its all right
const book1 = new LibraryBook('xyz','abc',123,1,2);
let books = [book1];
const IITKLib = new LibraryBranch(books,'IITK');
let john = new LibraryPatron(123,'John',IITKLib);
IITKLib.AddPatron(john);
john.CheckedOutBook(book1);
console.log(IITKLib.Transactions);
/*
Attributes:
Title (string): The book's title.
Author (string): The book's author.
Publication Year (int): The year the book was published.
Available Copies (int): The number of available copies in the library.
Total Copies (int): The total number of copies in the library.

Methods:

Check Out(): Decreases available copies by 1 when a book is checked out.
Check In(): Increases available copies by 1 when a book is checked in.
LibraryPatron Class :Create a LibraryPatron class with the following properties and actions:	
Properties:
Patron ID (int): A unique identifier for the library patron.
Name (string): The name of the library patron.
Checked Out Books (list): A list to store books checked out by the patron.
Actions:
Check Out Book(book): Adds a book to the checked-out list and calls the book's Check Out method.
Return Book(book): Removes a book from the checked-out list and calls the book's Check In method.

LibraryTransaction Class :Create a LibraryTransaction class to record transactions between patrons and books.
Properties:
Patron (LibraryPatron): The patron involved in the transaction.
Book (LibraryBook): The book involved in the transaction.
Transaction Date (date): The date of the transaction.

Extended Features :Extend the system to include the following features:
Due Dates: Implement due dates for checked-out books. Calculate and display overdue fines for late returns.
LibraryBranch Class: Create a LibraryBranch class to support multiple branches. Each branch should have its collection of books and patrons.
Reservation System: Implement a reservation system where patrons can reserve books that are currently checked out.

*/