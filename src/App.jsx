import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
      <div className='container'>
        <h1>
          Encuesta BierFest<br/>MMXXIV
        </h1>
        <nav>
          <ul>
            <li>
              <Link className='navbotton' to={'/encuesta'}>Encuesta</Link>
            </li>
            <li>
              <Link className='navbotton' to={'/respuestas'}>Respuestas</Link>
            </li>
          </ul>
        </nav>
      </div>
  );
};

export default App;
