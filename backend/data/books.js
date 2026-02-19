const books = [
    {
        "name": "A Tale of Two Cities",
        "author": "Charles Dickens",
        "price": 399,
        "dateOfPublishing": "1859-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac7",
        "description": "A bestselling book by Charles Dickens, first published in 1859.",
        "category": "Fiction"
    },
    {
        "name": "The Little Prince",
        "author": "Antoine de Saint-Exupéry",
        "price": 399,
        "dateOfPublishing": "1943-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac4",
        "description": "A bestselling book by Antoine de Saint-Exupéry, first published in 1943.",
        "category": "Fiction"
    },
    {
        "name": "The Alchemist",
        "author": "Paulo Coelho",
        "price": 399,
        "dateOfPublishing": "1988-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac7",
        "description": "A bestselling book by Paulo Coelho, first published in 1988.",
        "category": "Fiction"
    },
    {
        "name": "Harry Potter and the Philosopher's Stone",
        "author": "J. K. Rowling",
        "price": 399,
        "dateOfPublishing": "1997-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cabe",
        "description": "A bestselling book by J. K. Rowling, first published in 1997.",
        "category": "Fiction"
    },
    {
        "name": "And Then There Were None",
        "author": "Agatha Christie",
        "price": 399,
        "dateOfPublishing": "1939-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac4",
        "description": "A bestselling book by Agatha Christie, first published in 1939.",
        "category": "Fiction"
    },
    {
        "name": "Dream of the Red Chamber",
        "author": "Cao Xueqin",
        "price": 399,
        "dateOfPublishing": "1791-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cad3",
        "description": "A bestselling book by Cao Xueqin, first published in 1791.",
        "category": "Fiction"
    },
    {
        "name": "The Hobbit",
        "author": "J. R. R. Tolkien",
        "price": 399,
        "dateOfPublishing": "1937-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac1",
        "description": "A bestselling book by J. R. R. Tolkien, first published in 1937.",
        "category": "Fiction"
    },
    {
        "name": "Alice's Adventures in Wonderland",
        "author": "Lewis Carroll",
        "price": 399,
        "dateOfPublishing": "1865-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4caca",
        "description": "A bestselling book by Lewis Carroll, first published in 1865.",
        "category": "Fiction"
    },
    {
        "name": "She: A History of Adventure",
        "author": "H. Rider Haggard",
        "price": 399,
        "dateOfPublishing": "1887-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4caca",
        "description": "A bestselling book by H. Rider Haggard, first published in 1887.",
        "category": "Fiction"
    },
    {
        "name": "The Da Vinci Code",
        "author": "Dan Brown",
        "price": 399,
        "dateOfPublishing": "2003-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cacd",
        "description": "A bestselling book by Dan Brown, first published in 2003.",
        "category": "Fiction"
    },
    {
        "name": "Harry Potter and the Chamber of Secrets",
        "author": "J. K. Rowling",
        "price": 399,
        "dateOfPublishing": "1998-01-01",
        "isbn": "",
        "sellerId": "6988e4f1b29078394bc4cab8",
        "description": "A bestselling book by J. K. Rowling, first published in 1998.",
        "category": "Fiction"
    },
    {
        "name": "The Catcher in the Rye",
        "author": "J. D. Salinger",
        "price": 399,
        "dateOfPublishing": "1951-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cacd",
        "description": "A bestselling book by J. D. Salinger, first published in 1951.",
        "category": "Fiction"
    },
    {
        "name": "Harry Potter and the Prisoner of Azkaban",
        "author": "J. K. Rowling",
        "price": 399,
        "dateOfPublishing": "1999-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cad0",
        "description": "A bestselling book by J. K. Rowling, first published in 1999.",
        "category": "Fiction"
    },
    {
        "name": "Harry Potter and the Goblet of Fire",
        "author": "J. K. Rowling",
        "price": 399,
        "dateOfPublishing": "2000-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cad0",
        "description": "A bestselling book by J. K. Rowling, first published in 2000.",
        "category": "Fiction"
    },
    {
        "name": "Harry Potter and the Order of the Phoenix",
        "author": "J. K. Rowling",
        "price": 399,
        "dateOfPublishing": "2003-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cabe",
        "description": "A bestselling book by J. K. Rowling, first published in 2003.",
        "category": "Fiction"
    },
    {
        "name": "Harry Potter and the Half-Blood Prince",
        "author": "J. K. Rowling",
        "price": 399,
        "dateOfPublishing": "2005-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cabb",
        "description": "A bestselling book by J. K. Rowling, first published in 2005.",
        "category": "Fiction"
    },
    {
        "name": "Harry Potter and the Deathly Hallows",
        "author": "J. K. Rowling",
        "price": 399,
        "dateOfPublishing": "2007-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cabb",
        "description": "A bestselling book by J. K. Rowling, first published in 2007.",
        "category": "Fiction"
    },
    {
        "name": "The Bridges of Madison County",
        "author": "Robert James Waller",
        "price": 399,
        "dateOfPublishing": "1992-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac1",
        "description": "A bestselling book by Robert James Waller, first published in 1992.",
        "category": "Fiction"
    },
    {
        "name": "One Hundred Years of Solitude",
        "author": "Gabriel García Márquez",
        "price": 399,
        "dateOfPublishing": "1967-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4caca",
        "description": "A bestselling book by Gabriel García Márquez, first published in 1967.",
        "category": "Fiction"
    },
    {
        "name": "Lolita",
        "author": "Vladimir Nabokov",
        "price": 399,
        "dateOfPublishing": "1955-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cabb",
        "description": "A bestselling book by Vladimir Nabokov, first published in 1955.",
        "category": "Fiction"
    },
    {
        "name": "Heidi",
        "author": "Johanna Spyri",
        "price": 399,
        "dateOfPublishing": "1880-01-01",
        "isbn": "",
        "sellerId": "6988e4f1b29078394bc4cab8",
        "description": "A bestselling book by Johanna Spyri, first published in 1880.",
        "category": "Fiction"
    },
    {
        "name": "The Common Sense Book of Baby and Child Care",
        "author": "Benjamin Spock",
        "price": 449,
        "dateOfPublishing": "1946-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac4",
        "description": "A bestselling book by Benjamin Spock, first published in 1946.",
        "category": "Non-Fiction"
    },
    {
        "name": "Anne of Green Gables",
        "author": "Lucy Maud Montgomery",
        "price": 399,
        "dateOfPublishing": "1908-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cabe",
        "description": "A bestselling book by Lucy Maud Montgomery, first published in 1908.",
        "category": "Fiction"
    },
    {
        "name": "Black Beauty",
        "author": "Anna Sewell",
        "price": 399,
        "dateOfPublishing": "1877-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cad0",
        "description": "A bestselling book by Anna Sewell, first published in 1877.",
        "category": "Fiction"
    },
    {
        "name": "The Name of the Rose",
        "author": "Umberto Eco",
        "price": 399,
        "dateOfPublishing": "1980-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cad3",
        "description": "A bestselling book by Umberto Eco, first published in 1980.",
        "category": "Fiction"
    },
    {
        "name": "The Eagle Has Landed",
        "author": "Jack Higgins",
        "price": 399,
        "dateOfPublishing": "1975-01-01",
        "isbn": "",
        "sellerId": "6988e4f1b29078394bc4cab8",
        "description": "A bestselling book by Jack Higgins, first published in 1975.",
        "category": "Fiction"
    },
    {
        "name": "Watership Down",
        "author": "Richard Adams",
        "price": 399,
        "dateOfPublishing": "1972-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cacd",
        "description": "A bestselling book by Richard Adams, first published in 1972.",
        "category": "Fiction"
    },
    {
        "name": "The Hite Report",
        "author": "Shere Hite",
        "price": 449,
        "dateOfPublishing": "1976-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac1",
        "description": "A bestselling book by Shere Hite, first published in 1976.",
        "category": "Non-Fiction"
    },
    {
        "name": "Charlotte's Web",
        "author": "E. B. White",
        "price": 399,
        "dateOfPublishing": "1952-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4caca",
        "description": "A bestselling book by E. B. White, first published in 1952.",
        "category": "Fiction"
    },
    {
        "name": "The Ginger Man",
        "author": "J. P. Donleavy",
        "price": 399,
        "dateOfPublishing": "1955-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac7",
        "description": "A bestselling book by J. P. Donleavy, first published in 1955.",
        "category": "Fiction"
    },
    {
        "name": "The Purpose Driven Life",
        "author": "Rick Warren",
        "price": 369,
        "dateOfPublishing": "2002-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cabb",
        "description": "A bestselling book by Rick Warren, first published in 2002.",
        "category": "Self-Help"
    },
    {
        "name": "The Tale of Peter Rabbit",
        "author": "Beatrix Potter",
        "price": 399,
        "dateOfPublishing": "1902-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac1",
        "description": "A bestselling book by Beatrix Potter, first published in 1902.",
        "category": "Fiction"
    },
    {
        "name": "Jonathan Livingston Seagull",
        "author": "Richard Bach",
        "price": 369,
        "dateOfPublishing": "1970-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cabe",
        "description": "A bestselling book by Richard Bach, first published in 1970.",
        "category": "Self-Help"
    },
    {
        "name": "The Very Hungry Caterpillar",
        "author": "Eric Carle",
        "price": 399,
        "dateOfPublishing": "1969-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cabe",
        "description": "A bestselling book by Eric Carle, first published in 1969.",
        "category": "Fiction"
    },
    {
        "name": "A Message to Garcia",
        "author": "Elbert Hubbard",
        "price": 449,
        "dateOfPublishing": "1899-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac7",
        "description": "A bestselling book by Elbert Hubbard, first published in 1899.",
        "category": "Non-Fiction"
    },
    {
        "name": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "price": 399,
        "dateOfPublishing": "1960-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac1",
        "description": "A bestselling book by Harper Lee, first published in 1960.",
        "category": "Fiction"
    },
    {
        "name": "Flowers in the Attic",
        "author": "V. C. Andrews",
        "price": 399,
        "dateOfPublishing": "1979-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac4",
        "description": "A bestselling book by V. C. Andrews, first published in 1979.",
        "category": "Fiction"
    },
    {
        "name": "Cosmos",
        "author": "Carl Sagan",
        "price": 499,
        "dateOfPublishing": "1980-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cad0",
        "description": "A bestselling book by Carl Sagan, first published in 1980.",
        "category": "Science"
    },
    {
        "name": "Sophie's World",
        "author": "Jostein Gaarder",
        "price": 399,
        "dateOfPublishing": "1991-01-01",
        "isbn": "",
        "sellerId": "6988e4f1b29078394bc4cab8",
        "description": "A bestselling book by Jostein Gaarder, first published in 1991.",
        "category": "Fiction"
    },
    {
        "name": "Angels & Demons",
        "author": "Dan Brown",
        "price": 399,
        "dateOfPublishing": "2000-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cad3",
        "description": "A bestselling book by Dan Brown, first published in 2000.",
        "category": "Fiction"
    },
    {
        "name": "Alcoholics Anonymous",
        "author": "William Griffith Wilson",
        "price": 369,
        "dateOfPublishing": "1939-01-01",
        "isbn": "",
        "sellerId": "6988e4f1b29078394bc4cab8",
        "description": "A bestselling book by William Griffith Wilson, first published in 1939.",
        "category": "Self-Help"
    },
    {
        "name": "Kane and Abel",
        "author": "Jeffrey Archer",
        "price": 399,
        "dateOfPublishing": "1979-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac4",
        "description": "A bestselling book by Jeffrey Archer, first published in 1979.",
        "category": "Fiction"
    },
    {
        "name": "Fear of Flying",
        "author": "Erica Jong",
        "price": 399,
        "dateOfPublishing": "1973-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cacd",
        "description": "A bestselling book by Erica Jong, first published in 1973.",
        "category": "Fiction"
    },
    {
        "name": "How the Steel Was Tempered",
        "author": "Nikolai Ostrovsky",
        "price": 399,
        "dateOfPublishing": "1932-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4caca",
        "description": "A bestselling book by Nikolai Ostrovsky, first published in 1932.",
        "category": "Fiction"
    },
    {
        "name": "War and Peace",
        "author": "Leo Tolstoy",
        "price": 399,
        "dateOfPublishing": "1869-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cad3",
        "description": "A bestselling book by Leo Tolstoy, first published in 1869.",
        "category": "Fiction"
    },
    {
        "name": "The Adventures of Pinocchio",
        "author": "Carlo Collodi",
        "price": 399,
        "dateOfPublishing": "1881-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cad0",
        "description": "A bestselling book by Carlo Collodi, first published in 1881.",
        "category": "Fiction"
    },
    {
        "name": "The Diary of Anne Frank",
        "author": "Anne Frank",
        "price": 429,
        "dateOfPublishing": "1947-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cacd",
        "description": "A bestselling book by Anne Frank, first published in 1947.",
        "category": "Biography"
    },
    {
        "name": "Your Erroneous Zones",
        "author": "Wayne Dyer",
        "price": 369,
        "dateOfPublishing": "1976-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cabb",
        "description": "A bestselling book by Wayne Dyer, first published in 1976.",
        "category": "Self-Help"
    },
    {
        "name": "The Thorn Birds",
        "author": "Colleen McCullough",
        "price": 399,
        "dateOfPublishing": "1977-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cac7",
        "description": "A bestselling book by Colleen McCullough, first published in 1977.",
        "category": "Fiction"
    },
    {
        "name": "The Kite Runner",
        "author": "Khaled Hosseini",
        "price": 399,
        "dateOfPublishing": "2003-01-01",
        "isbn": "",
        "sellerId": "6988e4f2b29078394bc4cad3",
        "description": "A bestselling book by Khaled Hosseini, first published in 2003.",
        "category": "Fiction"
    }
];

module.exports = books;
