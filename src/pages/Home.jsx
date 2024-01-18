import React, { useEffect, useState } from 'react';
import { PokemonCard } from '../components/PokemonCard';
import {
  Wrap,
  Button,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { pokeapi } from '../axiosConfig';
import { FaSearch } from 'react-icons/fa';

export const Home = () => {
  const [pokemons, setPokemons] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };
  const handleSearchClick = () => {
    pokeapi
      .get(`pokemon/${inputValue.toLowerCase()}`)
      .then(response => {
        const pokemao = [];
        pokemao.push(response.data);
        setPokemons(pokemao);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    pokeapi.get(`pokemon?limit=100`).then(response => {
      setPokemons(response.data.results);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <div>
        <Input
          size={'sm'}
          variant="filled"
          width="auto"
          type="text"
          value={inputValue}
          placeholder="Digite um pokemon..."
          onChange={handleInputChange}
        />
        <Button
          onClick={handleSearchClick}
          leftIcon={<FaSearch />}
          rounded="50%"
        />
      </div>
      <Wrap>
        {isLoading ? (
          <h1>Carregando</h1>
        ) : (
          pokemons.map(pokemon => {
            return <PokemonCard key={pokemon.name} name={pokemon.name} />;
          })
        )}
      </Wrap>
    </div>
  );
};
