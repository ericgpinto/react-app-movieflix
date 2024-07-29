import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Home() {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "8b1a17fced64b51993df10a7d96efdc4",
          language: "pt-BR",
          page: 1,
        },
      });
      console.log(response.data.results);
    }

    loadMovies();
  }, []);

  return (
    <div>
      <h1>Welcome to Home</h1>
    </div>
  );
}
