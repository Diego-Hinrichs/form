import { useForm  } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAppContext from './AppContext';
import * as XLSX from 'xlsx';

const TableRow = ({ topic, register, registerField}) => {
  return (
    <tr>
      <td>{topic}</td>
      <td><input type="radio" value="1" {...register(`${registerField}`)} /></td>
      <td><input type="radio" value="2" {...register(`${registerField}`)} /></td>
      <td><input type="radio" value="3" {...register(`${registerField}`)} /></td>
      <td><input type="radio" value="4" {...register(`${registerField}`)} /></td>
      <td><input type="radio" value="5" {...register(`${registerField}`)} /></td>
      <td><input type="radio" value="6" {...register(`${registerField}`)} /></td>
    </tr>
  )
};

const RadioButton = ({register, label, registerField, value}) => {
  return(
    <div>
      <input {...register(`${registerField}`, { required: true })} value={value} type="radio"/>
      <label>{label}</label>
    </div>
  )
}

const ExtractTrueValues = ( data ) => {
  const trueKeys = Object.keys(data.informacion).filter(key => data.informacion[key] === true);
  if (data.informacion.otros && data.informacion.otros.trim() !== "") {
    trueKeys.push(data.informacion.otros);
  }
  const resultString = trueKeys.join(", ");
  data.informacion = resultString;
  return data;
}

const EncuestaForm = () => {
    const { handleSubmit, register, setValue, watch, control } = useForm();
    const [encuestaData, setEncuestaData] = useState([]);
    const { addRespuesta } = useAppContext();

    const onSubmit = (data) => {
      // Procesar data.informacion
      // data = ExtractTrueValues(data)
      // console.log(data)

      setEncuestaData((prevData) => [...prevData, data]);
      addRespuesta(data)
      // Limpia el formulario después de enviar
      // Limpia más campos según sea necesario
    };
  
    const guardarRespuestas = () => {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(encuestaData);
      XLSX.utils.book_append_sheet(wb, ws, 'Encuesta');
      XLSX.writeFile(wb, 'encuesta_results.xlsx');
    };
    return (
      <div className='container'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          {/* 
          <div>
            <label>2. ¿Cuántos años tiene? </label>
            <input type="number" {...register('edad', { required: true })} />
          </div>

          <div>
            <label>3. ¿Con qué género se identifica?</label>
              <select {...register('genero', { required: true })}>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
                <option value="otroGenero">Otro</option>
                <option value="noresponder">Prefiero no responder</option>
              </select>
              {watch('genero') === 'otroGenero' && (
              <div className='anotherOption'>
                <label>Género:</label>
                <input type="text" {...register('nuevoGenero', { required: true })} />
              </div>
              )}
          </div>

          <div>
            <label>4. ¿Cuál es su ocupación actual?</label>
            <select {...register('ocupacion', { required: true })}>
              <option value="estudiante">Estudiante</option>
              <option value="independiente">Trabajador independiente</option>
              <option value="dependiente">Trabajador dependiente</option>
              <option value="jubilado">Jubilado</option>
              <option value="otraOcupacion">Otra por favor especifique</option>
            </select>
            {watch('ocupacion') === 'otraOcupacion' && (
              <div className='anotherOption'>
                <label>Ocupación:</label>
                <input type="text" {...register('nuevaOcupacion', { required: true })} />
              </div>
            )}
          </div>

          <div>
            <label>5. ¿Cuál es su ciudad de residencia?</label>
            <input type="text" {...register('ciudadResidencia', { required: true })} />
          </div>

          <div>
            <label>6. ¿Cuál es su motivación al visitar este evento?</label>
            <select {...register('motivacion', { required: true })}>
              <option value="turismo">Realizar actividades turísticas o recreativas</option>
              <option value="estadia">Aprovechar mi estadía en la ciudad</option>
              <option value="casualidad">Participé por casualidad al venir al parque SAVAL</option>
              <option value="recomendacion">Me recomendaron este evento</option>
              <option value="otro">Otro (especifique)</option>
            </select>
            {watch('motivacion') === 'otro' && (
              <div className='anotherOption'>
                <label>Motivación:</label>
                <input type="text" {...register('nuevoMotivo', { required: true })} />
              </div>
            )}
          </div>

          <div>
            <label>7. Cuando planificó este viaje ¿Consideró visitar la Bierfest?</label>
            <div className='radios'>
              <div>
                <input {...register('planificar', { required: true })} value='si' type="radio" id="si" />
                <label htmlFor="si">Si</label>
              </div>
              <div>
                <input {...register('planificar', { required: true })} value='no' type="radio" id="no" />
                <label htmlFor="no">No</label>
              </div>
            </div>
            {watch('planificar') === 'si' && (
              <div className='anotherOption'>
                <label>¿Como la bierfest influenció su planificación?</label>
                <select {...register('influencia', { required: true })}>
                  <option value="defini">Definí la fecha de mi viaje para asistir a este evento</option>
                  <option value="modifique">Modifiqué la fecha de mi viaje para asistir a este evento</option>
                  <option value="no_influyo">No influyó en la planificación de mi viaje</option>
                </select>
              </div>
            )}
          </div>
          
          <div>
            <label>8. ¿Cuántos días considera su estadía en la ciudad? </label>
            <input type="number" {...register('estadia', { required: true })} />
          </div>
          
          <div>
            <label>9. ¿Dónde se hospeda actualmente?</label>
            <select {...register('hospedaje', { required: true })}>
              <option value="familiares/amigos">Casa de familiares/amigos</option>
              <option value="Residencial">Residencial</option>
              <option value="Hostal">Hostal</option>
              <option value="Hostería">Hostería</option>
              <option value="arriendo">Arriendo de cabaña/departamento</option>
              <option value="hotel">Hotel</option>
              <option value="hotelBoutique">Hotel boutique</option>
              <option value="apartHotel">Apart Hotel</option>
              <option value="otroHospedaje">Otro (especifique cual)</option>
            </select>
            {watch('hospedaje') === 'otroHospedaje' && (
              <div className='anotherOption'>
                <label>Hospedaje:</label>
                <input type="text" {...register('nuevoHospedaje', { required: true })} />
              </div>
            )}
          </div>
          
          <div>
            <label>10. En su estadía en la ciudad:<br/>¿Visito algún atractivo/lugar de la ciudad? ¿Cuál?</label>
            <hr style={{margin:'0rem 0rem 0.5rem 0rem'}}></hr>
            <label>Atractivos del tipo Naturaleza</label>
            <label>
              <input type="checkbox" {...register('atractivosNaturaleza.visitaHumedales')} />
              Visita/paseo a humedales
            </label>
            <label>
              <input type="checkbox" {...register('atractivosNaturaleza.reservasNaturales')} />
              Reservas Naturales
            </label>
            <label>
              <input type="checkbox" {...register('atractivosNaturaleza.santuariosNaturaleza')} />
              Santuarios de la naturaleza
            </label>
            <label>
              <input type="checkbox" {...register('atractivosNaturaleza.navegacionRios')} />
              Navegación por los ríos
            </label>
            <label>
              <input type="checkbox" {...register('atractivosNaturaleza.visitaPlayas')} />
              Visita a playas y sector costero
            </label>
            <label>
              <input type="checkbox" {...register('atractivosNaturaleza.parquesUrbanos')} />
              Parques urbanos y miradores
            </label>
            <hr style={{margin:'0rem 0rem 0.5rem 0rem'}}></hr>
            <label>Atractivos del tipo Culturales</label>
            <label>
              <input type="checkbox" {...register('atractivosCulturales.museosCasasPatrimoniales')} />
              Museos y casas patrimoniales
            </label>
            <label>
              <input type="checkbox" {...register('atractivosCulturales.teatro')} />
              Teatro (Cervantes, Lord Cochrane)
            </label>
            <label>
              <input type="checkbox" {...register('atractivosCulturales.centrosCulturales')} />
              Centros culturales
            </label>
            <label>
              <input type="checkbox" {...register('atractivosCulturales.castilloValdivia')} />
              Castillo de Valdivia (Corral)
            </label>
            <label>
              <input type="checkbox" {...register('atractivosCulturales.torreones')} />
              Torreones (Barro, Los Canelos)
            </label>
            <label>
              <input type="checkbox" {...register('atractivosCulturales.feriasCostumbristas')} />
              Ferias costumbristas 
            </label>
            <hr style={{margin:'0rem 0rem 0.5rem 0rem'}}></hr>
            <label>Atractivos del tipo Entretención</label>
            <label>
              <input type="checkbox" {...register('atractivosEntretencion.tours')} />
              Tour´s (localidades cercanas)
            </label>
            <label>
              <input type="checkbox" {...register('atractivosEntretencion.deporte')} />
              Deportes (Kayak, Canopy, Rafting, etc) 
            </label>
            <label>
              <input type="checkbox" {...register('atractivosEntretencion.mercadoFluvial')} />
              Mercado fluvia 
            </label>
            <label>
              <input type="checkbox" {...register('atractivosEntretencion.rutasTematicas')} />
              Rutas temáticas (Cervecería artesanal, recorrido histórico...)
            </label>
            <label>
            <hr style={{margin:'0rem 0rem 0.5rem 0rem'}}></hr>
            <input type="checkbox" {...register('noVisitado')} />
              No visito ningún atractivo
            </label>
          </div>

          <div>
            <label>11. ¿Cuál es aproximadamente su presupuesto destinado para este viaje? </label>
            <label>
            Monto: $
            <input type="text" {...register('presupuesto')} />
            </label>
            <label>
              <input type="checkbox" {...register('prefieroNoResponderPresupuesto')} />
              Prefiero no responder
            </label>
          </div>

          <div>
            <label>12. ¿Cómo se informó de este evento?</label>
            <RadioButton
              register={register}
              registerField='medio_informacion'
              label='Radio'
              value='radio'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              label='Afiches'
              value='afiches'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              label='Prensa escrita'
              value='prensa_escrita'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              label='Página web'
              value='pagina_web'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              label='Por un conocido/amigo'
              value='conocido_amigo'
            />
            <label>Redes sociales ¿Cuál?</label>
            <RadioButton
              register={register}
              registerField='medio_informacion'
              label='Facebook'
              value='facebook'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              label='Instagram'
              value='instagram'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              label='Tik tok'
              value='tik_tok'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              label='Twitter'
              value='twitter'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              label='Otro'
              value='otro'
            />
            {watch('medio_informacion') === 'otro' && (
              <div className='anotherOption'>
                <label>Medio información:</label>
                <input type="text" {...register('nuevoMedioInformacion', { required: true })} />
              </div>
              )}
          </div>

          <div>
            <label>13. A través de qué canal compró sus entradas?</label>
              <select {...register('canalCompraEntradas', { required: true })}>
                <option value="boleterias">Boleterías del recinto</option>
                <option value="sitioWeb">A través del sitio web (passline.com)</option>
                <option value="invitacion">Me invitaron con entrada pagada</option>
                <option value="otroCanal">Otro canal</option>
              </select>
              {watch('canalCompraEntradas') === 'otroCanal' && (
              <div className='anotherOption'>
                <label>Canal:</label>
                <input type="text" {...register('nuevoCanal', { required: true })} />
              </div>
              )}
          </div>
          <div>
            <label>14. ¿Cómo calificaría los siguientes aspectos relacionados a la organización del evento?</label>
            <table>
              <tbody>
                <tr className='tableHeader'>
                  <th></th>
                  <th>No usé o no participé</th>
                  <th>Insatisfecho</th>
                  <th>Poco satisfecho</th>
                  <th>Ni insatisfecho ni satisfecho</th>
                  <th>Muy satisfecho</th>
                  <th>Totalmente satisfecho</th>
                </tr>
                <TableRow 
                  topic='Señalética e información disponible'
                  registerField='Senalizacion'/>
                <TableRow 
                  topic='Atención de los stand al interior del recinto'
                  registerField='Atencion'/>
                <TableRow 
                  topic='Variedad de cervezas '
                  registerField='Variedad'/>
                <TableRow 
                  topic='Atractivo y variedad de productos a la venta (kits cerveceros y souvenir)'
                  registerField='Atractivos'/>
                <TableRow 
                  topic='Zona de Foodtruck bierfest'
                  registerField='Foodtruck'/>
                <TableRow 
                  topic='Ambientación y música de animación'
                  registerField='Ambientacion'/>
                <TableRow 
                  topic='Costo de entradas'
                  registerField='Costo'/>
                <TableRow 
                  topic='Disponibilidad de mesas'
                  registerField='Mesas'/>
              </tbody>
            </table>
          </div> 

          <div>
            <label>15. ¿Cómo calificaría los siguientes aspectos relacionados con el recinto SAVAL? </label>
            <table>
              <tbody>
                <tr className='tableHeader'>
                  <th></th>
                  <th>No usé o no participé</th>
                  <th>Insatisfecho</th>
                  <th>Poco satisfecho</th>
                  <th>Ni insatisfecho ni satisfecho</th>
                  <th>Muy satisfecho</th>
                  <th>Totalmente satisfecho</th>
                </tr>
                <TableRow 
                  topic='Acceso al recinto (Rapidez y amabilidad)'
                  register={register}
                  registerField='AccesoRecinto'
                  />
                
                <TableRow 
                  topic='Disponibilidad de estacionamientos'
                  register={register}
                  registerField='Disponibilidad'/>
                <TableRow 
                  topic='Seguridad del recinto'
                  register={register}
                  registerField='Seguridad'/>
                <TableRow 
                  topic='Iluminación del recinto'
                  register={register}
                  registerField='Iluminacion'/>
                <TableRow 
                  topic='Accesos inclusivos'
                  register={register}
                  registerField='AccesosInlusivo'/>
                <TableRow 
                  topic='Servicios higiénicos'
                  register={register}
                  registerField='ServiciosHigienicos'/>
                <TableRow 
                  topic='Temperatura al interior del recinto'
                  register={register}
                  registerField='Temperatura'/>
              </tbody>
            </table>
          </div>
          */}

          {/* Comprobar salida */}
          <div>
            <label>10. En su estadía en la ciudad:<br/>¿Visito algún atractivo/lugar de la ciudad? ¿Cuál?</label>
            <hr style={{margin:'0rem 0rem 0.5rem 0rem'}}></hr>
            <label>Atractivos del tipo Naturaleza:</label>
            <label>
              <input type="checkbox" {...register('atractivosNaturaleza.visitaHumedales')} />
              Visita/paseo a humedales
            </label>
            <label>
              <input type="checkbox" {...register('atractivosNaturaleza.reservasNaturales')} />
              Reservas Naturales
            </label>
            <label>
              <input type="checkbox" {...register('atractivosNaturaleza.santuariosNaturaleza')} />
              Santuarios de la naturaleza
            </label>
            <label>
              <input type="checkbox" {...register('atractivosNaturaleza.navegacionRios')} />
              Navegación por los ríos
            </label>
            <label>
              <input type="checkbox" {...register('atractivosNaturaleza.visitaPlayas')} />
              Visita a playas y sector costero
            </label>
            <label>
              <input type="checkbox" {...register('atractivosNaturaleza.parquesUrbanos')} />
              Parques urbanos y miradores
            </label>
            <hr style={{margin:'0rem 0rem 0.5rem 0rem'}}></hr>
            <label>Atractivos del tipo Culturales:</label>
            <label>
              <input type="checkbox" {...register('atractivosCulturales.museosCasasPatrimoniales')} />
              Museos y casas patrimoniales
            </label>
            <label>
              <input type="checkbox" {...register('atractivosCulturales.teatro')} />
              Teatro (Cervantes, Lord Cochrane)
            </label>
            <label>
              <input type="checkbox" {...register('atractivosCulturales.centrosCulturales')} />
              Centros culturales
            </label>
            <label>
              <input type="checkbox" {...register('atractivosCulturales.castilloValdivia')} />
              Castillo de Valdivia (Corral)
            </label>
            <label>
              <input type="checkbox" {...register('atractivosCulturales.torreones')} />
              Torreones (Barro, Los Canelos)
            </label>
            <label>
              <input type="checkbox" {...register('atractivosCulturales.feriasCostumbristas')} />
              Ferias costumbristas 
            </label>
            <hr style={{margin:'0rem 0rem 0.5rem 0rem'}}></hr>
            <label>Atractivos del tipo Entretención:</label>
            <label>
              <input type="checkbox" {...register('atractivosEntretencion.tours')} />
              Tour´s (localidades cercanas)
            </label>
            <label>
              <input type="checkbox" {...register('atractivosEntretencion.deporte')} />
              Deportes (Kayak, Canopy, Rafting, etc) 
            </label>
            <label>
              <input type="checkbox" {...register('atractivosEntretencion.mercadoFluvial')} />
              Mercado fluvia 
            </label>
            <label>
              <input type="checkbox" {...register('atractivosEntretencion.rutasTematicas')} />
              Rutas temáticas (Cervecería artesanal, recorrido histórico...)
            </label>
            <label>
            <hr style={{margin:'0rem 0rem 0.5rem 0rem'}}></hr>
            <input type="checkbox" {...register('noVisitado')} />
              No visito ningún atractivo
            </label>
          </div>


          <div className='submitButtons'>
            <button type="submit">Enviar</button>
            <button onClick={guardarRespuestas}>Descargar</button>
          </div>
          <Link className='navbuttonform' to={'/respuestas'}>Ver Respuestas</Link>
        </form>
      </div>
    );
  };

export default EncuestaForm;