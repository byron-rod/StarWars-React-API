import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import NavBar from './components/NavBar/NavBar';
import Films from './components/Films/Films';
import People from './components/People/People';
import Planets from './components/Planets/Planets';
import Species from './components/Species/Species';
import Vehicles from './components/Vehicles/Vehicles';
import Starships from './components/Starships/Starships';
import SearchBar from './components/SearchBar/SearchBar';
import CardInfo from './components/CardInfo/CardInfo';
import PlanetInfo from './components/CardPlanetInfo/PlanetInfo';
import FilmsInfo  from './components/CardFilmsInfo/FilmsInfo';
import Home from './components/Home/Home';
import Favorites from './components/Favorites/Favorites';
import SearchResults from './components/SearchrResults/SearchResults';

const App = () => {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  
  useEffect(() => {
    async function fetchPeople() {
      let res = await fetch('https://www.swapi.tech/api/people/?format=json');
      let data = await res.json();
      setPeople(data.results);
    }
    async function fetchPlanets() {
      let res = await fetch('https://www.swapi.tech/api/planets/?format=json');
      let data = await res.json();
      setPlanets(data.results);
    }
    async function fetchFilms() {
      let res = await fetch('https://www.swapi.tech/api/films/');
      let data = await res.json();
      setFilms(data.results);
    }
    async function fetchSpecies() {
      let res = await fetch('https://www.swapi.tech/api/species/');
      let data = await res.json();
      setSpecies(data.results);
    }
    async function fetchStarships() {
      let res = await fetch('https://www.swapi.tech/api/starships/');
      let data = await res.json();
      setStarships(data.results);
    }
    async function fetchVehicles() {
      let res = await fetch('https://www.swapi.tech/api/vehicles/');
      let data = await res.json();
      setVehicles(data.results);
    }

    fetchPeople();
    fetchPlanets();
    fetchFilms();
    fetchSpecies();
    fetchStarships();
    fetchVehicles();
  }, []);

  return (
    <>
    <Provider store={store}>
      <NavBar />
      <SearchBar/> 
      <Routes>
        <Route path={'/'} element={<Navigate to={'/home'}/>} />
        <Route path={'/home'} element={<Home></Home>} />
        <Route path={'/films'} element={<Films data={films}/>} />
        <Route path={'/people'} element={<People data={people} />} />
        <Route path={'/planets'} element={<Planets data={planets} />} />
        <Route path={'/species'} element={<Species data={species}/>} />
        <Route path={'/starships'} element={<Starships data={starships} />} />
        <Route path={'/vehicles'} element={<Vehicles data={vehicles} />} />
        <Route path="/cardinfo/:uid" element={<CardInfo />} />
        <Route path="/cardplanetinfo/:uid" element={<PlanetInfo />} />
        <Route path="/cardfilmsinfo/:uid" element={<FilmsInfo />} />
        <Route path={'/favorites'} element={<Favorites />} />
        <Route path={`/searchresults/:searchQuery`} element={<SearchResults data={''} />} />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
