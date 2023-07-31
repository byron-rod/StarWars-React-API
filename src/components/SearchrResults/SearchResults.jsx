import React from 'react';

const SearchResults = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.uid}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
