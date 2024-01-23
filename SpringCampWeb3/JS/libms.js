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
    constructor(patron,book,date) {
        this.Patron = patron;
        this.Book = book;
        this.Date = date;
    }
};

//A class for library
class Library {
    constructor(books,transactions=[]) {
        this.Books = books;
        this.Transactions=transactions;
    }
    CheckOut = (title) => {
        let found=false;
        let idx=-1;
        for (let i=0 ;i<length(this.Books);i++) {
            if (this.Books[i].Title===title) {
                found=true;
                idx=i;
            }
        }
        if (found) {
            console.log(`Yes, ${title} is in the library catalogue`);
            if (this.Books[idx].AvailableCopies>0) {
                console.log(`${name}  has been issued to you`);
                this.Books[idx].AvailableCopies--;
            }
            else {
                console.log(`Sorry, this book is currently unvailable`);
            }
        }
        else {
            console.log('Sorry, we donot have this book in the library catalogue');
        }
    };
    CheckIn = (title) => {
        for (let i=0 ;i<length(this.Books);i++) {
            if (this.Books[i].Title===title) {
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
    CheckedOutBook=(name)=> {
        this.CheckedOutBooks.push(name);
        this.LibraryBranch.CheckOut(name);
    }
    ReturnBook=(name)=> {
        let idx=-1;
        for (let i=0;i<length(this.CheckedOutBooks);i++) {
            if (this.CheckedOutBooks[i]===name) {
                idx=i;
            }
        }
        this.LibraryBranch.CheckIn(name);
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
const IITKLib = new LibraryBranch(book1,'IITK');
let john = new LibraryPatron(123,'John',IITKLib);
IITKLib.AddPatron(john);


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