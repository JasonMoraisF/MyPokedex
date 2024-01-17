import React, { useEffect, useState } from 'react';
import { pokeapi } from '../axiosConfig';
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Wrap,
  WrapItem,
  Flex,
  AlertIcon,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

export const PokemonCard = () => {
  //useState sendo usado para CRIAR estados para armazenar as informacoes do Pokemon. No momento sendo vazio.
  const [pokeName, setPokeName] = useState('');
  const [pokeId, setPokeId] = useState(0);
  const [pokeType, setPokeType] = useState('');
  const [pokeSprite, setPokeSprite] = useState('');

  useEffect(() => {
    //Utilizando o useEffect pra fazer a requisicao quando o componente for montado.
    pokeapi
      .get('pokemon/arceus')
      .then(response => {
        setPokeName(response.data.name);
        setPokeId(response.data.id);
        setPokeType(response.data.types[0].type.name);
        setPokeSprite(response.data.sprites.front_default);
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
    <Flex justify="center" align="center" h="100vh">
      <Wrap>
        <WrapItem>
          <Card maxW="200px">
            <CardBody>
              <Text fontSize={10}>Id: {pokeId}</Text>
              <Image src={pokeSprite} alt="Sprite of ${pokeName}" />
              <Stack mt="1" spacing="3">
                <Heading size="md">
                  {pokeName.charAt(0).toUpperCase() + pokeName.slice(1)}
                </Heading>
                <Text fontSize={15}>
                  Type= {pokeType.charAt(0).toUpperCase() + pokeType.slice(1)}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </WrapItem>
      </Wrap>
    </Flex>
  );
};
