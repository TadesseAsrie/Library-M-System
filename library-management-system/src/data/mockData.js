// src/data/mockData.js
import { v4 as uuidv4 } from "uuid";

export const initialBooks = [
  {
    id: "1",
    title: "The Midnight Library",
    authorId: "auth1",
    isbn: "978-0735211292",
    categoryId: "cat1",
    publisher: "Viking Press",
    publicationYear: 2020,
    quantity: 5,
    status: "Available",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150",
  },
  {
    id: "2",
    title: "Atomic Habits",
    authorId: "auth2",
    isbn: "978-0735211293",
    categoryId: "cat2",
    publisher: "Penguin Random House",
    publicationYear: 2018,
    quantity: 3,
    status: "Available",
    coverImage:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150",
  },
  {
    id: "3",
    title: "Dune",
    authorId: "auth3",
    isbn: "978-0441172719",
    categoryId: "cat3",
    publisher: "Chilton Books",
    publicationYear: 1965,
    quantity: 2,
    status: "Borrowed",
    coverImage:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=150",
  },
];

export const initialMembers = [
  {
    id: "m1",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St, New York",
    registrationDate: "2023-01-15",
    membershipStatus: "Active",
  },
  {
    id: "m2",
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    address: "456 Oak Ave, Los Angeles",
    registrationDate: "2023-03-20",
    membershipStatus: "Active",
  },
];

export const initialCategories = [
  { id: "cat1", name: "Fiction", description: "Fictional books" },
  { id: "cat2", name: "Self-Help", description: "Personal development" },
  { id: "cat3", name: "Science Fiction", description: "Sci-fi genre" },
];

export const initialAuthors = [
  {
    id: "auth1",
    name: "Matt Haig",
    bio: "British author and journalist",
    birthYear: 1975,
  },
  {
    id: "auth2",
    name: "James Clear",
    bio: "Writer and speaker",
    birthYear: 1986,
  },
  {
    id: "auth3",
    name: "Frank Herbert",
    bio: "American author",
    birthYear: 1920,
  },
];

export const initialBorrows = [
  {
    id: "b1",
    memberId: "m1",
    bookId: "3",
    borrowDate: "2024-01-10",
    returnDate: null,
    dueDate: "2024-02-10",
    status: "Borrowed",
  },
];

export const generateId = () => uuidv4();
