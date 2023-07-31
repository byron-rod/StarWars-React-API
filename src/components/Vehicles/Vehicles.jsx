import React, { useState, useEffect } from 'react';
import '../../App.css';

const Vehicles = ({ data }) => {
  const [detailedVehicles, setDetailedVehicles] = useState([]);
  const [vehiclesToShow, setVehiclesToShow] = useState(10);
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
            data.slice(0, vehiclesToShow).map(async (vehicle) => {
              const response = await fetch(vehicle.url);
              const data = await response.json();
              const detailedVehicle = data.result.properties;
              detailedVehicle.uid = vehicle.uid;
              return detailedVehicle;
            })
          );
          setDetailedVehicles(detailedData);
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
  }, [data, vehiclesToShow]);

  const handleLoadMore = () => {
    setVehiclesToShow((prevCount) => prevCount + 10);
  };

  if (loading || !detailedVehicles || detailedVehicles.length === 0) {
    return (
      <div className="loadingAnimation">
        <div className="spinner m-2"></div>
        Wait, you must...
      </div>
    );
  }

  return (
    <>
      <h2 style={{ fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px', textAlign: 'center' }}>Star Wars Vehicles</h2>
      <div className="container">
        <div className="row">
          {detailedVehicles.map((vehicle, i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{vehicle.name}</h5>
                  <p className="card-text">
                    <strong>Model:</strong> {vehicle.model}
                  </p>
                  <p className="card-text">
                    <strong>Manufacturer:</strong> {vehicle.manufacturer}
                  </p>
                  <p className="card-text">
                    <strong>Cost in Credits:</strong> {vehicle.cost_in_credits}
                  </p>
                  <p className="card-text">
                    <strong>Length:</strong> {vehicle.length}
                  </p>
                  <p className="card-text">
                    <strong>Crew:</strong> {vehicle.crew}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {vehiclesToShow < data.length && (
        <div className="text-center">
          <button onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default Vehicles;
