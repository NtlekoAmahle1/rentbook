"use client"; // Ensures this component is treated as a client component

import { useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", available: true },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", available: true },
    { id: 3, title: "1984", author: "George Orwell", available: true },
  ]);

  const [selectedBookId, setSelectedBookId] = useState("");
  const [rentalDuration, setRentalDuration] = useState("");

  const handleSelectChange = (event) => {
    setSelectedBookId(event.target.value);
  };

  const handleDurationChange = (event) => {
    const duration = event.target.value;
    setRentalDuration(duration);

    const selectedBook = books.find((book) => book.id === parseInt(selectedBookId));
    if (selectedBookId && duration) {
      alert(
        `You have selected to rent the book: ${selectedBook.title} for ${duration} days`
      );
    }
  };

  const handleRentBook = () => {
    if (!selectedBookId || !rentalDuration) return;

    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === parseInt(selectedBookId) ? { ...book, available: false } : book
      )
    );

    setSelectedBookId("");
    setRentalDuration("");
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h1 style={styles.header}>Rent a Book</h1>

        <select style={styles.select} value={selectedBookId} onChange={handleSelectChange}>
          <option value="" disabled>
            Select a book to rent
          </option>
          {books
            .filter((book) => book.available)
            .map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} by {book.author}
              </option>
            ))}
        </select>

        <select style={styles.select} value={rentalDuration} onChange={handleDurationChange}>
          <option value="" disabled>
            Select rental duration (days)
          </option>
          <option value="7">7 days</option>
          <option value="14">14 days</option>
          <option value="30">30 days</option>
        </select>

        <button
          style={styles.button}
          onClick={handleRentBook}
          disabled={!selectedBookId || !rentalDuration}
        >
          Rent
        </button>
      </div>
    </div>
  );
}

// Inline CSS styles
const styles = {
  background: {
    backgroundImage: "url('/background.jpg')", // Path to your image
    backgroundSize: "cover", // Ensures the image covers the whole background
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh", // Full viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "20px",
    maxWidth: "400px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent white background for content
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  select: {
    padding: "10px",
    width: "100%",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
