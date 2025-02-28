import { useState, useEffect } from "react";
import "./App.css";

const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;

function App() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setNews(data.articles);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <h1>Even Better</h1>
      {error && <p className="error">{error}</p>}
      <div className="news-container">
        {news.slice(0, 10).map((article, index) => (
          <a href={article.url}>
          <div key={index} className="news-card">
            <img src={article.urlToImage} alt={article.title} />
            <h2>{article.title}</h2>
            <p>BY {article.author || "Unknown"}</p>
          </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
