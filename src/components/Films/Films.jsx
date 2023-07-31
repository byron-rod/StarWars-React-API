import React, { useState, useEffect } from "react";
import FilmsCard from "./FilmsCard";
import '../../App.css'

const Films = () => {
  const [filmDetails, setFilmDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilmDetails();
  }, []);

  const fetchFilmDetails = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/films");
      const data = await response.json();
      const films = data.result;
      if (films) {
        setFilmDetails(films);
        setLoading(false);
      } else {
        throw new Error("No film data found");
      }
    } catch (error) {
      console.error("Error fetching film data:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>Films</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <img src={'../../saga-banner.jpg'} alt="Planets Banner" style={{ maxWidth: '88%' }} />

      </div>
      {loading ? (
        <div className="loadingAnimation">
        <div className="spinner m-2"></div>
      </div>
      ) : (
        <div className="container mt-4">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {filmDetails.map((film) => (
              <FilmsCard key={film.uid} film={film} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Films;
