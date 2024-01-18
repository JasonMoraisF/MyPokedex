import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { PokemonCard } from './components/PokemonCard';
import { Home } from './pages/Home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
      <Home />
    </ChakraProvider>
  );
}

export default App;
