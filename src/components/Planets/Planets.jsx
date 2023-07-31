import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'


const Planets = ({ data }) => {
  const [detailedPlanets, setDetailedPlanets] = useState([]);
  const [planetsToShow] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const debounce = (func, delay) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      };
    };

    const fetchDetailedData = async () => {
      if (data.length > 0) {
        try {
          setLoading(true);
          const detailedData = await Promise.all(
            data.slice(0, planetsToShow).map(async (planet) => {
              const response = await fetch(planet.url);
              const data = await response.json();
              const detailedPlanet = data.result.properties;
              detailedPlanet.uid = planet.uid;
              return detailedPlanet;
            })
          );
          setDetailedPlanets(detailedData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }
    };

    const delayedFetch = debounce(fetchDetailedData, 500);
    delayedFetch();

    return () => clearTimeout(delayedFetch);
  }, [data, planetsToShow]);



  if (loading || !detailedPlanets || detailedPlanets.length === 0) {
    return <div className="loadingAnimation">
    <div className="spinner m-2"></div>
  </div>
  }


  return (
    <>
      <h2 style={{ fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px', textAlign: 'center' }}>Star Wars Planets</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img src={'../../planets-banner.jpg'} alt="Planets Banner" style={{ maxWidth: '88%' }} />
      </div>
      <div className="container">
        <div className="row">
          {detailedPlanets.map((planet, i) => (
            <div key={i} className="col-md-4 mb-4">
              <Link to={`/cardplanetinfo/${planet.uid}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{planet.name}</h5>
                    <p className="card-text">
                      <strong>Climate:</strong> {planet.climate}
                    </p>
                    <p className="card-text">
                      <strong>Terrain:</strong> {planet.terrain}
                    </p>
                    <p className="card-text">
                      <strong>Population:</strong> {planet.population}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Planets;
