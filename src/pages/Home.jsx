import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import { books as staticBooks } from "../data/books";

function Home() {
  const [allBooks, setAllBooks] = useState(staticBooks);
  const [search, setSearch] = useState("");

  // Chat states
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState(() => {
    const savedChat = localStorage.getItem("kiranabooks_chat");

    if (savedChat) {
      return JSON.parse(savedChat);
    }

    return [
      {
        id: 1,
        text: "Hello! 👋 Welcome to KiranaBooks.",
        sender: "support",
      },
      {
        id: 2,
        text: "How can we help you today?",
        sender: "support",
      },
    ];
  });

  const messagesEndRef = useRef(null);

  // Load user listings
  useEffect(() => {
    const userListings = JSON.parse(
      localStorage.getItem("kiranabooks_userlistings") || "[]"
    );

    setAllBooks([...staticBooks, ...userListings]);
  }, []);

  // Save chat messages
  useEffect(() => {
    localStorage.setItem(
      "kiranabooks_chat",
      JSON.stringify(messages)
    );
  }, [messages]);

  // Scroll to latest message
  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, chatOpen]);

  const filteredBooks = allBooks.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  // Send chat message
  const handleSendMessage = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: trimmedMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Automatic response
    setTimeout(() => {
      const lowerMessage = trimmedMessage.toLowerCase();

      let reply =
        "Thanks for contacting us! 😊 Our team will be happy to help you.";

      if (
        lowerMessage.includes("hello") ||
        lowerMessage.includes("hi") ||
        lowerMessage.includes("hey")
      ) {
        reply =
          "Hello! 👋 How can we help you today?";
      } else if (
        lowerMessage.includes("sell") ||
        lowerMessage.includes("selling")
      ) {
        reply =
          "You can sell your book by clicking the 'Sell Your Books' button on the Home page.";
      } else if (
        lowerMessage.includes("price") ||
        lowerMessage.includes("cost")
      ) {
        reply =
          "You can see the price of each book on its book card or details page. 📚";
      } else if (
        lowerMessage.includes("book") ||
        lowerMessage.includes("books")
      ) {
        reply =
          "You can browse all available books by clicking 'Browse Books'. 📚";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: reply,
          sender: "support",
        },
      ]);
    }, 700);
  };

  // Clear chat
  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Hello! 👋 Welcome to KiranaBooks.",
        sender: "support",
      },
      {
        id: Date.now() + 1,
        text: "How can we help you today?",
        sender: "support",
      },
    ]);
  };

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <p className="small-title">
              BUY • SELL • REUSE
            </p>

            <h1>
              Give Books
              <br />
              a Second Life.
            </h1>

            <p>
              Discover affordable second-hand books
              from readers across Nepal.
            </p>

            <div className="hero-buttons">
              <Link to="/books">
                Browse Books
              </Link>

              <Link
                to="/sell"
                className="secondary-button"
              >
                Sell Your Books
              </Link>
            </div>
          </div>

          <div className="hero-book"></div>
        </section>

        {/* SEARCH */}
        <section className="search-section">
          <h2>Find your next book</h2>

          <input
            type="text"
            placeholder="Search books, authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>

        {/* BOOKS */}
        <section className="books-section">
          <div className="section-heading">
            <div>
              <p>DISCOVER</p>
              <h2>Popular Books</h2>
            </div>

            <Link to="/books">
              View All →
            </Link>
          </div>

          <div className="book-grid">
            {filteredBooks
              .slice(0, 4)
              .map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                />
              ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <div>
            <span></span>

            <h3>Affordable Books</h3>

            <p>
              Find quality second-hand books
              at student-friendly prices.
            </p>
          </div>

          <div>
            <span></span>

            <h3>Give Books a Second Life</h3>

            <p>
              Sell books you no longer need
              and earn from them.
            </p>
          </div>

          <div>
            <span>🇳🇵</span>

            <h3>Nepali Books</h3>

            <p>
              Discover books from Nepali
              authors and writers.
            </p>
          </div>
        </section>

        {/* ========================= */}
        {/* CHAT BUTTON */}
        {/* ========================= */}

        {!chatOpen && (
          <button
            type="button"
            className="chat-button"
            onClick={() => setChatOpen(true)}
          >
            <span className="chat-button-icon">
              💬
            </span>

            <span>
              Chat with us directly
            </span>
          </button>
        )}

        {/* ========================= */}
        {/* CHAT WINDOW */}
        {/* ========================= */}

        {chatOpen && (
          <div className="chat-window">

            {/* CHAT HEADER */}
            <div className="chat-header">

              <div className="chat-header-left">
                <div className="chat-avatar">
                  💬
                </div>

                <div>
                  <h3>KiranaBooks Support</h3>

                  <div className="chat-online">
                    <span></span>
                    Online
                  </div>
                </div>
              </div>

              <div className="chat-header-actions">

                <button
                  type="button"
                  onClick={clearChat}
                  title="Clear chat"
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="chat-close"
                  title="Close chat"
                >
                  ×
                </button>

              </div>
            </div>

            {/* CHAT MESSAGES */}
            <div className="chat-messages">

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.sender === "user"
                      ? "chat-message user-message"
                      : "chat-message support-message"
                  }
                >
                  {msg.text}
                </div>
              ))}

              <div ref={messagesEndRef}></div>

            </div>

            {/* CHAT INPUT */}
            <form
              className="chat-input"
              onSubmit={handleSendMessage}
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />

              <button type="submit">
                ➤
              </button>
            </form>

          </div>
        )}
      </main>
    </>
  );
}

export default Home;