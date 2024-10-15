import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [pokemon, setPokemon] = useState({ types: [] });
  const [bannedAttributes, setBannedAttributes] = useState([]);
  const URL = 'https://pokeapi.co/api/v2/pokemon/';

  const fetchPokemon = async () => {
    try {
      let validPokemon = false;
      let data;

      while (!validPokemon) {
        const randomId = Math.floor(Math.random() * 800) + 1; 
        const response = await fetch(`${URL}${randomId}`);
        data = await response.json();

        // Check if the Pokémon has any banned attributes
        const hasBannedAttribute = data.types.some(typeInfo => bannedAttributes.includes(typeInfo.type.name)) ||
                                   bannedAttributes.includes(`${data.height} Cm`) ||
                                   bannedAttributes.includes(`${data.weight / 10} Kg`);

        if (!hasBannedAttribute) {
          validPokemon = true;
        }
      }

      setPokemon(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleBanAttribute = (attribute) => {
    if (!bannedAttributes.includes(attribute)) {
      setBannedAttributes([...bannedAttributes, attribute]);
    }
  };

  const handleRemoveBanAttribute = (attribute) => {
    setBannedAttributes(bannedAttributes.filter(attr => attr !== attribute));
  };

  return (
    <div>
      <div className='whole-page'>
        <h1>Know your Characters</h1>
        <h3>Discover all the Characters from my childhood show!!</h3>
        `🐉🐉🐉🐉🐉🐉🐉🐉🐉🐉🐉`
        <br />
        <br />

        <div className='discover-container'>
          <div className='listing-container'>
            {pokemon && (
              <>
                <h2>{pokemon.name}</h2>
                <div className='buttons'>
                  {pokemon.types && pokemon.types.map((typeInfo, index) => (
                    <button 
                      key={index} 
                      type='attribute' 
                      className='attribute-buttons' 
                      onClick={() => handleBanAttribute(typeInfo.type.name)}
                    >
                      {typeInfo.type.name}
                    </button>
                  ))}
                  <button 
                    type='attribute' 
                    className='attribute-buttons' 
                    onClick={() => handleBanAttribute(`${pokemon.height * 10} Cm`)}
                  >
                    {pokemon.height * 10} Cm
                  </button>
                  <button 
                    type='attribute' 
                    className='attribute-buttons' 
                    onClick={() => handleBanAttribute(`${pokemon.weight / 10} Kg`)}
                  >
                    {pokemon.weight / 10} Kg
                  </button>
                </div>
                {pokemon.sprites && <img className='pokemon-image' src={pokemon.sprites.front_default} alt={pokemon.name} />}
              </>
            )}
          </div>
        </div>
        <button type='discover' className='discover-btn' onClick={fetchPokemon}>🧑‍💻Discover More!</button>
      </div>
      <div className='side-nav'>
        <h2>Ban List</h2>
        <h4>Select an attribute in your listing to ban it</h4>
        <div>
          {bannedAttributes.map((attribute, index) => (
            <button 
              key={index} 
              type='attribute' 
              className='attribute-buttons' 
              onClick={() => handleRemoveBanAttribute(attribute)}
            >
              {attribute}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;