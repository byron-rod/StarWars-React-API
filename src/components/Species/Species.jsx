import React, { useState, useEffect } from 'react';
import '../../App.css';

const Species = ({ data }) => {
  const [detailedSpecies, setDetailedSpecies] = useState([]);
  const [speciesToShow ] = useState(10);
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
            data.slice(0, speciesToShow).map(async (species) => {
              const response = await fetch(species.url);
              const data = await response.json();
              const detailedSpecies = data.result.properties;
              detailedSpecies.uid = species.uid;
              return detailedSpecies;
            })
          );
          setDetailedSpecies(detailedData);
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
  }, [data, speciesToShow]);


  if (loading || !detailedSpecies || detailedSpecies.length === 0) {
    return (
      <div className="loadingAnimation">
        <div className="spinner m-2"></div>
        Grab a coffee, we will be right back...
      </div>
    );
  }


  return (
    <>
      <h2 style={{ fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px', textAlign: 'center' }}>Star Wars Species</h2>
      <div className="container">
        <div className="row">
          {detailedSpecies.map((species, i) => (
            <div key={i} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{species.name}</h5>
                    <p className="card-text">
                      <strong>Classification:</strong> {species.classification}
                    </p>
                    <p className="card-text">
                      <strong>Designation:</strong> {species.designation}
                    </p>
                    <p className="card-text">
                      <strong>Average Height:</strong> {species.average_height}
                    </p>
                    <p className="card-text">
                      <strong>Average Lifespan:</strong> {species.average_lifespan}
                    </p>
                    <p className="card-text">
                      <strong>Hair Colors:</strong> {species.hair_colors}
                    </p>
                    <p className="card-text">
                      <strong>Skin Colors:</strong> {species.skin_colors}
                    </p>
                    <p className="card-text">
                      <strong>Eye Colors:</strong> {species.eye_colors}
                    </p>
                    <p className="card-text">
                      <strong>Language:</strong> {species.language}
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

export default Species;
