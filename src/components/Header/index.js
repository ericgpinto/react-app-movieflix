import "./header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        Movie Flix
      </Link>
      <Link to="/favorites" className="favorites">
        My movies
      </Link>
    </header>
  );
}
