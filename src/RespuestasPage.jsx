// src/RespuestasPage.js
import React from 'react';
import useAppContext from './AppContext';

const RespuestasPage = () => {
    const { encuestaData } = useAppContext();
    console.log(encuestaData)
    return (
        <div className='container answers'>
            <h2>Respuestas Recopiladas</h2>
            {encuestaData.length === 0 ? (
            <p>No hay respuestas disponibles.</p>
        ) : (
            <ul className='answerList'>
                {encuestaData.map((respuesta, index) => (
                    <li key={index}>
                        {console.log(respuesta)}
                    <strong>Genero:</strong> {respuesta.genero}; <strong>Edad:</strong> {respuesta.edad}

                    <strong>Ocupación:</strong> {respuesta.ocupacion}; <strong>Ciudad Residencia:</strong> {respuesta.ciudadResidencia}

                    {/* Agrega más campos según tus necesidades */}
                    </li>
                ))}
            </ul>
        )}
        </div>
    );
};

export default RespuestasPage;
