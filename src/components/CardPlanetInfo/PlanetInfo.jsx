import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css'

const PlanetInfo = () => {
  const { uid } = useParams();
  const [planetData, setPlanetData] = useState(null);

  useEffect(() => {
    const fetchPlanetData = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/planets/${uid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data || !data.result || !data.result.properties) {
          throw new Error('Planet data not found');
        }
        setPlanetData(data.result.properties);
      } catch (error) {
        console.error('Error fetching planet data:', error);
      }
    };

    fetchPlanetData();
  }, [uid]);

  if (!planetData) {
    return <div className="loadingAnimation">
    <div className="spinner m-2"></div>
  </div>
  }

  return (
    <>
      <h2 style={{ fontWeight: 'bold', marginLeft: '20px' }}>Planet Details</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{planetData.name}</h5>
                <p className="card-text">
                  <strong>Diameter:</strong> {planetData.diameter}
                </p>
                <p className="card-text">
                  <strong>Rotation Period:</strong> {planetData.rotation_period}
                </p>
                <p className="card-text">
                  <strong>Orbital Period:</strong> {planetData.orbital_period}
                </p>
                <p className="card-text">
                  <strong>Gravity:</strong> {planetData.gravity}
                </p>
                <p className="card-text">
                  <strong>Population:</strong> {planetData.population}
                </p>
                <p className="card-text">
                  <strong>Climate:</strong> {planetData.climate}
                </p>
                <p className="card-text">
                  <strong>Terrain:</strong> {planetData.terrain}
                </p>
                <p className="card-text">
                  <strong>Surface Water:</strong> {planetData.surface_water}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanetInfo;
