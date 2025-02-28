import { gql } from "@apollo/client";
import client from "../lib/apolloClient";

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query GetCountriesByCurrency {
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
    `,
  });

  return {
    props: {
      countries: data.countries,
    },
  };
}

export default function Home({ countries }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", padding: "20px" }}>
        {countries.map((country) => (
          <div key={country.code} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px" }}>
            <h2>{country.name} ({country.code})</h2>
            <p><strong>Official Language:</strong> {country.languages.length > 0 ? country.languages[0].name : "N/A"}</p>
            <p><strong>Continent:</strong> {country.continent.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
