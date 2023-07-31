import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../../features/favoritesSlice';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();


  const handleRemoveFromFavorites = (person) => {
    dispatch(removeFromFavorites(person));
  };

  return (
    <>
      <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>Favorite Cards</h2>
      <div className="container">
        <div className="row">
          {favorites.map((item, i) => (
            <div key={i} className="col-md-4 mb-4">
              <Link to={`/cardinfo/${item.uid}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                  </div>
                </div>
              </Link>
              <button
                    className="btn btn-dark"
                    onClick={() => handleRemoveFromFavorites(item)}
                  >
                    Remove from Favorites
                  </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorites;
