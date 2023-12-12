import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Productcards from '../../Components/Productcards/Productcards';

function Home() {
  return (
    <>
      <Navbar />
      <h1>Drewili Home</h1>
      <div className="flex items-center mb-4">
        <h2 className="mr-4">Productos más populares:</h2>
        <Productcards />
      </div>
    </>
  );
}

export default Home;
