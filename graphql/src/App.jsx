import { useQuery, gql } from "@apollo/client";
import client from "./lib/apolloClient";
import "./App.css";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries(filter: { currency: { eq: "USD" } }) {
      name
      code
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="app">
      <h1>Countries Using USD</h1>
      <div className="news-container">
        {data.countries.map((country) => (
          <div key={country.code} className="news-card">
            <h2>{country.name} ({country.code})</h2>
            <p><strong>Language:</strong> {country.languages[0]?.name || "N/A"}</p>
            <p><strong>Continent:</strong> {country.continent.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
