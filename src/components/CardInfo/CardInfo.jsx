import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css'

const CardInfo = () => {
  const { uid } = useParams();
  const [characterData, setCharacterData] = useState(null);
  const [homeworldName, setHomeworldName] = useState(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/people/${uid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data || !data.result || !data.result.properties) {
          throw new Error('Character data not found');
        }
        setCharacterData(data.result.properties);

        // Jalar informacion del homeworld por su name del link en el API
        if (data.result.properties.homeworld) {
          const homeworldResponse = await fetch(data.result.properties.homeworld);
          if (homeworldResponse.ok) {
            const homeworldData = await homeworldResponse.json();
            setHomeworldName(homeworldData.result.properties.name);
          } else {
            throw new Error('Error fetching homeworld data');
          }
        } else {
          setHomeworldName('Unknown');
        }
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    };

    fetchCharacterData();
  }, [uid]);

  if (!characterData) {
    return  <div className="loadingAnimation">
    <div className="spinner m-2"></div>
  </div>
  }

  return (
    <>
      <h2 style={{ fontWeight: 'bold', marginLeft: '20px' }}>Character Details</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{characterData.name}</h5>
                <p className="card-text">
                  <strong>Height:</strong> {characterData.height} cm
                </p>
                <p className="card-text">
                  <strong>Mass:</strong> {characterData.mass} kg
                </p>
                <p className="card-text">
                  <strong>Hair Color:</strong> {characterData.hair_color}
                </p>
                <p className="card-text">
                  <strong>Skin Color:</strong> {characterData.skin_color}
                </p>
                <p className="card-text">
                  <strong>Eye Color:</strong> {characterData.eye_color}
                </p>
                <p className="card-text">
                  <strong>Birth Year:</strong> {characterData.birth_year}
                </p>
                <p className="card-text">
                  <strong>Gender:</strong> {characterData.gender}
                </p>
                <p className="card-text">
                  <strong>Homeworld:</strong> {homeworldName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInfo;
