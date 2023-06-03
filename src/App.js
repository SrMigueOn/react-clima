import React, { useState } from 'react';

const API_KEY = 'eaed9e10df601aab920b0f2f1e13df89';

const App = () => {
  const [cards, setCards] = useState([]);
  const [cityName, setCityName] = useState('');

  const handleAddCard = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=es&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('No se pudo obtener la información del clima.');
      }

      const data = await response.json();

      const newCard = {
        id: Date.now(),
        ciudad: cityName,
        region: data.region,
        country: data.sys.country,
        clima: data.weather[0].description,
        temperatura: data.main.temp,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure
      };

      setCards([...cards, newCard]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAllCards = () => {
    setCards([]);
  };

  const handleCityNameChange = (event) => {
    setCityName(event.target.value);
  };

  return (
    <div>
      <div className="contenedor-1">
        <input className='campo-texto' type="text" value={cityName} onChange={handleCityNameChange} placeholder="Ingrese una ciudad" />
      </div>
      <div className="contenedor-2">
        <button className='crear-tarjeta' onClick={handleAddCard}>Crear tarjeta</button>
        <button className='borrar-tarjetas' onClick={handleDeleteAllCards}>Eliminar todas las tarjetas</button>
      </div>
      <div className="contenedor-3">
      {cards.map((card) => (
        <div key={card.id} className="tarjeta">
          <div className="clima">{card.clima}</div>
          <div className="temperatura">{card.temperatura} °C</div>
          <p></p>
          <div className="ciudad">Ciudad: {card.ciudad}, {card.region}, {card.country}</div>
          <p></p>
          <div className="detalle">Viento: {card.wind} m/s</div>
          <div className="detalle">Humedad: {card.humidity} %</div>
          <div className="detalle">Presión: {card.pressure} hPa</div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default App;