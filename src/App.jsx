import { useEffect, useState } from "react";
import { FaTwitter } from "react-icons/fa";
import "./App.css";

const App = () => {
  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      color: "#16a085",
    },
    {
      text: "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon",
      color: "#27ae60",
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      color: "#2c3e50",
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle",
      color: "#f39c12",
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
      color: "#e74c3c",
    },
    {
      text: "Don't let yesterday take up too much of today.",
      author: "Will Rogers",
      color: "#9b59b6",
    },
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
      color: "#FB6964",
    },
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getRandomQuote = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (quotes[randomIndex] === currentQuote);

    return quotes[randomIndex];
  };

  const handleNewQuote = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentQuote(getRandomQuote());
      setIsTransitioning(false);
    }, 150);
  };

  const getTweetUrl = () => {
    const tweetText = `"${currentQuote.text}" - ${currentQuote.author}`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
  };

  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = currentQuote.color;
    document.body.style.transition = "background-color 1s";

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.transition = "";
    };
  }, [currentQuote.color]);

  return (
    <div
      className="app"
      style={{
        backgroundColor: currentQuote.color,
        transition: "background-color 1s",
      }}
    >
      <div id="quote-box" className="quote-box">
        <div className="quote-content">
          <div
            id="text"
            className={`quote-text ${isTransitioning ? "fade-out" : "fade-in"}`}
            style={{ color: currentQuote.color }}
          >
            <i
              className="fa fa-quote-left"
              style={{ color: currentQuote.color }}
            ></i>
            {currentQuote.text}
          </div>

          <div
            id="author"
            className={`quote-author ${
              isTransitioning ? "fade-out" : "fade-in"
            }`}
            style={{ color: currentQuote.color }}
          >
            - {currentQuote.author}
          </div>
        </div>

        <div className="quote-actions">
          <a
            id="tweet-quote"
            href={getTweetUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="tweet-quote"
            title="Tweet this quote!"
            style={{ backgroundColor: currentQuote.color }}
          >
            <FaTwitter id="tweet-icon" />
          </a>

          <button
            id="new-quote"
            onClick={handleNewQuote}
            className="new-quote-button"
            disabled={isTransitioning}
            style={{ backgroundColor: currentQuote.color }}
          >
            New Quote
          </button>
        </div>
      </div>

      <div className="footer">
        <p>By Fellah Mohamed</p>
      </div>
    </div>
  );
};

export default App;
