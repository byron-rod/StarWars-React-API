import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css'

const FilmsInfo = () => {
  const { uid } = useParams();
  const [filmData, setFilmData] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/films/${uid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data || !data.result || !data.result.properties) {
          throw new Error('Film data not found');
        }
        setFilmData(data.result.properties);
        fetchCharactersAndPlanets(data.result.properties);
      } catch (error) {
        console.error('Error fetching film data:', error);
      }
    };

    fetchFilmData();
  }, [uid]);

  // fetch datos de chars y planets directa desde los links del API

  const fetchCharactersAndPlanets = async (filmProperties) => {
    try {
      const characterResponses = await Promise.all(filmProperties.characters.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.result.properties.name;
      }));
      setCharacters(characterResponses);

      const planetResponses = await Promise.all(filmProperties.planets.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.result.properties.name;
      }));
      setPlanets(planetResponses);
    } catch (error) {
      console.error('Error fetching character and planet data:', error);
    }
  };

  if (!filmData) {
    return (
      <div className="loadingAnimation">
        <div className="spinner"></div>
        Loading...
      </div>
    );
  }

  return (
    <>
      <h2 style={{ fontWeight: 'bold', marginLeft: '20px' }}>Film Details</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{filmData.title}</h5>
                <p className="card-text">
                  <strong>Director:</strong> {filmData.director}
                </p>
                <p className="card-text">
                  <strong>Producer:</strong> {filmData.producer}
                </p>
                <p className="card-text">
                  <strong>Release Date:</strong> {filmData.release_date}
                </p>
                <p className="card-text">
                  <strong>Opening Crawl:</strong> {filmData.opening_crawl}
                </p>
                <p className="card-text">
                  <strong>Characters:</strong> {characters.join(', ')}
                </p>
                <p className="card-text">
                  <strong>Planets:</strong> {planets.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmsInfo;
