import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { PokemonCard } from './components/PokemonCard';

function App() {
  return (
    <ChakraProvider>
      <PokemonCard />
      <ColorModeSwitcher />
    </ChakraProvider>
  );
}

export default App;
