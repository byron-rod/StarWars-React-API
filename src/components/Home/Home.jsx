import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Home = () => {
  const cardsData = [
    {
      title: 'Films',
      image: 'https://cdn.vox-cdn.com/thumbor/IkEMldIzsA9hgF453jzN7TrBap4=/0x0:1720x1146/2070x1164/filters:focal(706x297:980x571):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/70204947/StarWarsPoster1977.0.jpg', // Replace with the actual film image URL
      link: '/films', 
    },
    {
      title: 'People',
      image: 'https://lumiere-a.akamaihd.net/v1/images/darth-vader-main_4560aff7.jpeg?region=0%2C67%2C1280%2C720', // Replace with the actual people image URL
      link: '/people', 
    },
    {
      title: 'Planets',
      image: 'https://lumiere-a.akamaihd.net/v1/images/aeos-prime-main_1af6e847.jpeg?region=0%2C0%2C1280%2C720', // Replace with the actual planets image URL
      link: '/planets', 
    },
    {
      title: 'Species',
      image: 'https://lumiere-a.akamaihd.net/v1/images/Yoda-Retina_2a7ecc26.jpeg?region=0%2C0%2C1536%2C864', // Replace with the actual species image URL
      link: '/species', 
    },
    {
      title: 'Starships',
      image: 'https://lumiere-a.akamaihd.net/v1/images/databank_nabooroyalstarship_01_169_e61f677e.jpeg?region=0%2C0%2C1560%2C878', // Replace with the actual starships image URL
      link: '/starships', 
    },
    {
      title: 'Vehicles',
      image: 'https://lumiere-a.akamaihd.net/v1/images/at-act-walker_78783f1b.jpeg?region=14%2C0%2C1140%2C642', // Replace with the actual vehicles image URL
      link: '/vehicles', 
    },
  ];

  return (
    <>
    <div className="container mt-4">
      <h2 className="text-center mb-4">Star Wars Universe</h2>
      <div className="row">
        {cardsData.map((card, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Link to={card.link} style={{ textDecoration: 'none' }}>
              <div className="card">
                <img src={card.image} alt={card.title} className="card-img-top" style={{ height: '300px' }} />
                <div className="card-body">
                  <h5 className="card-title text-center">{card.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>

    <Footer />
    </>
  );
};

export default Home;
