import React, { useEffect, useState } from 'react';
import { WiStars } from 'react-icons/wi';
import { pokeapi } from '../axiosConfig';
import {
  Image,
  Stack,
  Heading,
  Text,
  Box,
  Flex,
  AlertIcon,
  Alert,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
  IconButton,
  Center,
  Spacer,
} from '@chakra-ui/react';

//useState sendo usado para CRIAR estados para armazenar as informacoes do Pokemon. No momento sendo vazio.
export const PokemonCard = ({ name }) => {
  const [isShiny, setIsShiny] = useState(false);
  const [pokemon, setPokemon] = useState({
    id: '',
    name: '',
    types: [{}],
    sprites: {},
  });
  // Esta funcao ira apenas inverter o valor do isShiny
  const shinySwitcher = () => {
    setIsShiny(!isShiny);
  };

  //Utilizando o useEffect pra fazer a requisicao quando a pagina for renderizada
  useEffect(() => {
    pokeapi
      .get(`pokemon/${name}`)
      .then(response => {
        setPokemon(response.data);

        //Mapear os tipos e retornar um array de strings
      })
      .catch(err => {
        return (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Unexistent pokemon!</AlertTitle>
            <AlertDescription>Your pokemon doesn`t exist :/</AlertDescription>
          </Alert>
        );
        console.log(err);
      });
    // usando o [] para garantir que o useEffect execute apenas uma vez, ao montar o componente.
  }, []);
  return (
    <Box
      width="150px"
      rounded={'sm'}
      my={5}
      mx={[0, 5]}
      border={'1px'}
      borderColor="black"
      boxShadow={useColorModeValue('6px 6px 2px black', '6px 6px 2px gray')}
    >
      <Flex>
        <Box>
          <Text fontSize={10} padding="5px">
            Id: {pokemon.id}
          </Text>
        </Box>
        <Spacer />
        <IconButton
          icon={<WiStars />}
          aria-label="Shiny Switcher"
          colorScheme="red"
          onClick={shinySwitcher}
          size="xs"
          margin="5px"
        />
      </Flex>

      <Center>
        <Image
          src={
            isShiny
              ? pokemon.sprites.front_shiny
              : pokemon.sprites.front_default
          }
          alt={`Sprite of ${pokemon.name}`}
        />
      </Center>
      <Flex>
        <Heading size="md" padding="5px">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Heading>
      </Flex>
      <Stack mt="1" spacing="3">
        <Text fontSize={15} padding="5px">
          {' '}
          Type=
          {pokemon.types.map(type => {
            const typeName = type.type?.name;
            return `${typeName}  `;
          })}
        </Text>
      </Stack>
    </Box>
  );
};
