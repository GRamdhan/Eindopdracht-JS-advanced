import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsPage from './pages/EventsPage';

const Main = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
