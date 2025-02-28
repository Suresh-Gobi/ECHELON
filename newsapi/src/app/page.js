"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
        if (!API_KEY) throw new Error("API key is missing.");

        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );

        if (!response.ok) throw new Error("Failed to fetch news.");

        const data = await response.json();
        setNews(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="page">
      <main className="main">
        <h1>Top Headlines</h1>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className="newsContainer">
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="newsCard">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="newsImage"
                  />
                )}
                <h2>{article.title}</h2>
                <p>
                  <strong>Author:</strong> {article.author || "Unknown"}
                </p>
                <p>{article.description || "No description available"}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            ))
          ) : (
            !loading && !error && <p className="noNews">No news available.</p>
          )}
        </div>
      </main>

      <style jsx>{`
        .page {
          padding: 20px;
          background-color: #f9f9f9;
        }
        
        .main {
          max-width: 1200px;
          margin: auto;
        }

        .newsContainer {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .newsCard {
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out;
        }

        .newsCard:hover {
          transform: translateY(-5px);
        }

        .newsImage {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }

        h2 {
          font-size: 18px;
          margin: 10px 0;
        }

        a {
          display: inline-block;
          margin-top: 10px;
          padding: 8px 12px;
          background-color: #0070f3;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }

        a:hover {
          background-color: #0056b3;
        }

        .error {
          color: red;
          text-align: center;
          font-weight: bold;
        }

        .noNews {
          text-align: center;
          font-style: italic;
          color: gray;
        }
      `}</style>
    </div>
  );
}
