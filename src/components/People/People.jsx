
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './People.css';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../features/favoritesSlice';



const People = ({ data }) => {
  const [detailedPeople, setDetailedPeople] = useState([]);
  const [charactersToShow] = useState(10);
  const [loading, setLoading] = useState(true);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleAddToFavorites = (person) => {
    dispatch(addToFavorites(person));
  };

  const handleRemoveFromFavorites = (person) => {
    dispatch(removeFromFavorites(person));
  };


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
            data.slice(0, charactersToShow).map(async (person) => {
              const response = await fetch(person.url);
              const data = await response.json();
              const detailedPerson = data.result.properties;
              detailedPerson.uid = person.uid;
              return detailedPerson;
            })
          );
          setDetailedPeople(detailedData);
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
  }, [data, charactersToShow]);

 



  if (loading || !detailedPeople || detailedPeople.length === 0) {
    return <div className="loadingAnimation">
    <div className="spinner m-2"></div>
      The Force is SLOW in this one...
  </div>;
  }

  

  return (
    <>
      <h2 style={{ fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px', textAlign: 'center' }}>Star Wars Characters</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img src={'../../char-banner.jpg'} alt="Planets Banner" style={{ maxWidth: '88%' }} />
      </div>
      <div className="container">
        <div className="row">
          {detailedPeople.map((person, i) => (
            <div key={i} className="col-md-4 mb-4">
              <Link to={`/cardinfo/${person.uid}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{person.name}</h5>
                    <p className="card-text">
                      <strong>Height:</strong> {person.height}
                    </p>
                    <p className="card-text">
                      <strong>Mass:</strong> {person.mass}
                    </p>
                    <p className="card-text">
                      <strong>Hair Color:</strong> {person.hair_color}
                    </p>
                    <p className="card-text">
                      <strong>DOB:</strong> {person.birth_year}
                    </p>
                  </div>
                </div>
              </Link>



              {/* favorites */}
              <button
                      className="btn btn-dark mr-2 "
                      onClick={(event) =>
                        favorites.some((item) => item.uid === person.uid)
                          ? handleRemoveFromFavorites(person)
                          : handleAddToFavorites(person)
                      }
                    >
                      {favorites.some((item) => item.uid === person.uid) 
                        ? <i className="fa-solid fa-heart"></i> 
                        : <i className="fa-regular fa-heart"></i>}
              </button>



            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default People;
