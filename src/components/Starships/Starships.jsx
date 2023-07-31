import React, { useState, useEffect } from 'react';
import '../../App.css';

const Starships = ({ data }) => {
  const [detailedStarships, setDetailedStarships] = useState([]);
  const [starshipsToShow] = useState(data.length); 
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
            data.slice(0, starshipsToShow).map(async (starship) => {
              const response = await fetch(starship.url);
              const data = await response.json();
              const detailedStarship = data.result.properties;
              detailedStarship.uid = starship.uid;
              return detailedStarship;
            })
          );
          setDetailedStarships(detailedData);
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
  }, [data, starshipsToShow]);


  if (loading || !detailedStarships || detailedStarships.length === 0) {
    return (
      <div className="loadingAnimation">
        <div className="spinner m-2"></div>
        The Force is SLOW in this one...
      </div>
    );
  }


  return (
    <>
      <h2 style={{ fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px', textAlign: 'center' }}>Star Wars Starships</h2>
      <div className="container">
        <div className="row">
          {detailedStarships.map((starship, i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{starship.name}</h5>
                  <p className="card-text">
                    <strong>Model:</strong> {starship.model}
                  </p>
                  <p className="card-text">
                    <strong>Manufacturer:</strong> {starship.manufacturer}
                  </p>
                  <p className="card-text">
                    <strong>Cost in Credits:</strong> {starship.cost_in_credits}
                  </p>
                  <p className="card-text">
                    <strong>Length:</strong> {starship.length}
                  </p>
                  <p className="card-text">
                    <strong>Crew:</strong> {starship.crew}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Starships;
