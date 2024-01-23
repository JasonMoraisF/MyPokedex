import React, { useEffect, useState } from 'react';
import { PokemonCard } from '../components/PokemonCard';
import { Wrap, Button, Input } from '@chakra-ui/react';
import { pokeapi } from '../axiosConfig';
import { FaSearch } from 'react-icons/fa';

export const Home = () => {
  const [pokemons, setPokemons] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  //inputValue sendo usado para armazenar o valor do Input
  const [inputValue, setInputValue] = useState('');

  //event sendo literalmente o evento que ir ocorrer na linha em que ele se refere, no caso sendo o input ser digitado
  const handleInputChange = event => {
    // O "target" se refere ao elemento que desencadeou o evento.
    setInputValue(event.target.value);
    console.log(inputValue);
  };

  const handleSearchClick = () => {
    // Funcao que executa a busca com o clique, alterando o input digitado para lowerCase.
    pokeapi
      .get(`pokemon/${inputValue.toLowerCase()}`)
      .then(response => {
        // Criando um array vazio para guardar os dados requisitados da API.
        const pokemao = [];
        pokemao.push(response.data);
        // setando o Objeto pokemons com os dados do pokemao
        setPokemons(pokemao);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Apos a pagina ser renderizada, o useEffect ira fazer a requisicao dos 100 primeiros pokemons, guardando os dados de cada um deles em um vetor do array de objetos pokemons
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
