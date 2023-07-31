import React from "react";
import { Link } from "react-router-dom";

const FilmsCard = ({ film }) => {
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{film.properties.title}</h5>
          <p>{film.properties.opening_crawl}</p>
          <p>Director: {film.properties.director}</p>
          <p>Release Date: {film.properties.release_date}</p>
          <Link to={`/cardfilmsinfo/${film.uid}`} className="btn btn-dark">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilmsCard;
