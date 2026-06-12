// src/contexts/AppContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  initialBooks,
  initialMembers,
  initialCategories,
  initialAuthors,
  initialBorrows,
  generateId,
} from "../data/mockData";

const AppContext = createContext();

const initialState = {
  books: initialBooks,
  members: initialMembers,
  categories: initialCategories,
  authors: initialAuthors,
  borrows: initialBorrows,
  activities: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
        activities: [
          addActivity("Book added", action.payload.title),
          ...state.activities,
        ],
      };
    case "UPDATE_BOOK":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book,
        ),
      };
    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };

    case "ADD_MEMBER":
      return { ...state, members: [...state.members, action.payload] };
    case "UPDATE_MEMBER":
      return {
        ...state,
        members: state.members.map((m) =>
          m.id === action.payload.id ? action.payload : m,
        ),
      };
    case "DELETE_MEMBER":
      return {
        ...state,
        members: state.members.filter((m) => m.id !== action.payload),
      };

    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c,
        ),
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
      };

    case "ADD_AUTHOR":
      return { ...state, authors: [...state.authors, action.payload] };
    case "UPDATE_AUTHOR":
      return {
        ...state,
        authors: state.authors.map((a) =>
          a.id === action.payload.id ? action.payload : a,
        ),
      };
    case "DELETE_AUTHOR":
      return {
        ...state,
        authors: state.authors.filter((a) => a.id !== action.payload),
      };

    case "BORROW_BOOK":
      const book = state.books.find((b) => b.id === action.payload.bookId);
      if (book && book.quantity > 0) {
        const updatedBooks = state.books.map((b) =>
          b.id === action.payload.bookId
            ? {
                ...b,
                quantity: b.quantity - 1,
                status: b.quantity - 1 === 0 ? "Borrowed" : b.status,
              }
            : b,
        );
        return {
          ...state,
          books: updatedBooks,
          borrows: [...state.borrows, action.payload],
          activities: [
            addActivity("Book borrowed", `${book.title} borrowed by member`),
            ...state.activities,
          ],
        };
      }
      return state;

    case "RETURN_BOOK":
      const borrowRecord = state.borrows.find((b) => b.id === action.payload);
      if (borrowRecord) {
        const bookToReturn = state.books.find(
          (b) => b.id === borrowRecord.bookId,
        );
        const updatedBooks = state.books.map((b) =>
          b.id === borrowRecord.bookId
            ? { ...b, quantity: b.quantity + 1, status: "Available" }
            : b,
        );
        const updatedBorrows = state.borrows.map((b) =>
          b.id === action.payload
            ? {
                ...b,
                returnDate: new Date().toISOString().split("T")[0],
                status: "Returned",
              }
            : b,
        );
        return {
          ...state,
          books: updatedBooks,
          borrows: updatedBorrows,
          activities: [
            addActivity("Book returned", `${bookToReturn.title} returned`),
            ...state.activities,
          ],
        };
      }
      return state;

    default:
      return state;
  }
}

function addActivity(action, details) {
  return {
    id: generateId(),
    action,
    details,
    timestamp: new Date().toISOString(),
  };
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getAuthorName = (authorId) => {
    const author = state.authors.find((a) => a.id === authorId);
    return author ? author.name : "Unknown";
  };

  const getCategoryName = (categoryId) => {
    const category = state.categories.find((c) => c.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  const getMemberName = (memberId) => {
    const member = state.members.find((m) => m.id === memberId);
    return member ? member.fullName : "Unknown";
  };

  const getBookTitle = (bookId) => {
    const book = state.books.find((b) => b.id === bookId);
    return book ? book.title : "Unknown";
  };

  const value = {
    ...state,
    dispatch,
    getAuthorName,
    getCategoryName,
    getMemberName,
    getBookTitle,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
