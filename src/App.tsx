
import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 
import ArtworksTable from './components/ArtworksTable';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Artworks Table</h1>
      <ArtworksTable />
    </div>
  );
};

export default App;
