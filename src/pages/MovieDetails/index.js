import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./movie.css";

import api from "../../services/api";
import { toast } from "react-toastify";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "8b1a17fced64b51993df10a7d96efdc4",
            language: "pt-BR",
            page: 1,
          },
        })
        .then((response) => {
          setMovie(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    }

    loadMovie();
  }, [navigate, id]);

  function saveMovie() {
    const list = localStorage.getItem("@movieflix");

    let savedMovies = JSON.parse(list) || [];

    const hasMovie = savedMovies.some(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (hasMovie) {
      toast.warn("This movie is already on your list.");
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@movieflix", JSON.stringify(savedMovies));
    toast.success("Movie saved successfully.");
  }

  if (loading) {
    return (
      <div className="movie-info">
        <h1>Loading details...</h1>
      </div>
    );
  }

  return (
    <div className="movie-info">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />
      <h3>Overview</h3>
      <span>{movie.overview}</span>
      <strong>Average:{movie.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={saveMovie}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${movie.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
