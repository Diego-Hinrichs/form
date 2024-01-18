import { useForm  } from 'react-hook-form';
import { useEffect, useState } from 'react';
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

const RadioButton = ({register, label, pregunta, registerField, value}) => {
  return(
    <div>
      <input id={`${label}-${pregunta}`} {...register(`${registerField}`, { required: true })} value={value} type="radio"/>
      <label htmlFor={`${label}-${pregunta}`}>{label}</label>
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
    const { handleSubmit, register, setValue, watch, control, reset } = useForm();
    const [encuestaData, setEncuestaData] = useState([]);
    const { addAnswer, cleanStorage } = useAppContext();
    useEffect(()=> {
    },[encuestaData])

    const onSubmit = (data) => {
      // Procesar data.informacion
      // data = ExtractTrueValues(data)
      // console.log(data)
      setEncuestaData((prevData) => [...prevData, data]);
      addAnswer(data)
      reset()
      // Limpia el formulario después de enviar
      // Limpia más campos según sea necesario
    };
  
    const guardarRespuestas = () => {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(encuestaData);
      XLSX.utils.book_append_sheet(wb, ws, 'Encuesta');
      XLSX.writeFile(wb, 'encuesta_bierfest_2024.xlsx');
      cleanStorage();
    };

    return (
      <div className='container'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>      
          <div>
            <label htmlFor='age'>2. ¿Cuántos años tiene? </label>
            <input id='age' type="number" {...register('edad', { required: true })} />
          </div>

          <div>
            <label htmlFor='gender'>3. ¿Con qué género se identifica?</label>
              <select id='gender' {...register('genero', { required: true })}>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
                <option value="otro">Otro</option>
                <option value="no_responder">Prefiero no responder</option>
              </select>
              {watch('genero') === 'otro' && (
              <div className='anotherOption'>
                <label htmlFor='anotherGender'>Género:</label>
                <input id='anotherGender' type="text" {...register('nuevo_genero', { required: true })} />
              </div>
              )}
          </div>

          <div>
            <label htmlFor='ocupation'>4. ¿Cuál es su ocupación actual?</label>
            <select id='ocupation' {...register('ocupacion', { required: true })}>
              <option value="estudiante">Estudiante</option>
              <option value="independiente">Trabajador independiente</option>
              <option value="dependiente">Trabajador dependiente</option>
              <option value="jubilado">Jubilado</option>
              <option value="otra">Otra por favor especifique</option>
            </select>
            {watch('ocupacion') === 'otra' && (
              <div className='anotherOption'>
                <label htmlFor='anotherOcupation'>Ocupación:</label>
                <input id='anotherOcupation' type="text" {...register('nueva_ocupacion', { required: true })} />
              </div>
            )}
          </div>

          <div>
            <label htmlFor='home' >5. ¿Cuál es su ciudad de residencia?</label>
            <input id='home' type="text" {...register('ciudad_residencia', { required: true })} />
          </div>

          <div>
            <label htmlFor='motivation'>6. ¿Cuál es su motivación al visitar este evento?</label>
            <select id='motivation' {...register('motivacion', { required: true })}>
              <option value="turismo_recreacion">Realizar actividades turísticas o recreativas</option>
              <option value="aprovechar_estadia">Aprovechar mi estadía en la ciudad</option>
              <option value="participacion_de_casualidad">Participé por casualidad al venir al parque SAVAL</option>
              <option value="recomendacion_evento">Me recomendaron este evento</option>
              <option value="otro">Otro (especifique)</option>
            </select>
            {watch('motivacion') === 'otro' && (
              <div className='anotherOption'>
                <label htmlFor='anotherMotivation'>Motivación:</label>
                <input id='anotherMotivation' type="text" {...register('nuevo_motivo', { required: true })} />
              </div>
            )}
          </div>

          <div>
            <span>7. Cuando planificó este viaje ¿Consideró visitar la Bierfest?</span>
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
                <label htmlFor='anotherPlan'>¿Como la bierfest influenció su planificación?</label>
                <select id='anotherPlan' {...register('influencia_en_planificacion', { required: true })}>
                  <option value="defini_fecha_viaje">Definí la fecha de mi viaje para asistir a este evento</option>
                  <option value="modifique_fecha_viaje">Modifiqué la fecha de mi viaje para asistir a este evento</option>
                  <option value="no_influyo">No influyó en la planificación de mi viaje</option>
                </select>
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor='days'>8. ¿Cuántos días considera su estadía en la ciudad? </label>
            <input id='days' type="number" {...register('estadia', { required: true })} />
          </div>
          
          <div>
            <label htmlFor='lodging'>9. ¿Dónde se hospeda actualmente?</label>
            <select id='lodging' {...register('hospedaje', { required: true })}>
              <option value="familiares_amigos">Casa de familiares/amigos</option>
              <option value="residencial">Residencial</option>
              <option value="hostal">Hostal</option>
              <option value="hostería">Hostería</option>
              <option value="arriendo_cabana">Arriendo de cabaña/departamento</option>
              <option value="hotel">Hotel</option>
              <option value="hotel_boutique">Hotel boutique</option>
              <option value="apart_hotel">Apart Hotel</option>
              <option value="otro">Otro (especifique cual)</option>
            </select>
            {watch('hospedaje') === 'otroHospedaje' && (
              <div className='anotherOption'>
                <label htmlFor='anotherLodging'>Hospedaje:</label>
                <input id='anotherLodging' type="text" {...register('nuevoHospedaje', { required: true })} />
              </div>
            )}
          </div>
          
          <div>
            <span>10. En su estadía en la ciudad: ¿Visito algún atractivo/lugar de la ciudad? ¿Cuál?</span>
            <hr style={{margin:'0.5rem 0rem 0.5rem 0rem'}}></hr>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>Atractivos del tipo Naturaleza:</span>
            <label htmlFor='visita_humedales'>
              <input id='visita_humedales' type="checkbox" {...register('visita_humedales')} />
              Visita/paseo a humedales
            </label>
            <label htmlFor='reservas_naturales'>
              <input id='reservas_naturales' type="checkbox" {...register('reservas_naturales')} />
              Reservas Naturales
            </label>
            <label htmlFor='santuarios_naturaleza'>
              <input id='santuarios_naturaleza' type="checkbox" {...register('santuarios_naturaleza')} />
              Santuarios de la naturaleza
            </label>
            <label htmlFor='navegacion_rios'>
              <input id='navegacion_rios' type="checkbox" {...register('navegacion_rios')} />
              Navegación por los ríos
            </label>
            <label htmlFor='visita_playas'>
              <input id='visita_playas' type="checkbox" {...register('visita_playas')} />
              Visita a playas y sector costero
            </label>
            <label htmlFor='parques_urbanos'>
              <input id='parques_urbanos' type="checkbox" {...register('parques_urbanos')} />
              Parques urbanos y miradores
            </label>
            <hr style={{margin:'0.5rem 0rem 0.5rem 0rem'}}></hr>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>Atractivos del tipo Culturales:</span>
            <label htmlFor='museos_casas_patrimoniales'>
              <input id='museos_casas_patrimoniales' type="checkbox" {...register('museos_casas_patrimoniales')} />
              Museos y casas patrimoniales
            </label>
            <label htmlFor='teatro'>
              <input id='teatro' type="checkbox" {...register('teatro')} />
              Teatro (Cervantes, Lord Cochrane)
            </label>
            <label htmlFor='centros_culturales'>
              <input id='centros_culturales' type="checkbox" {...register('centros_culturales')} />
              Centros culturales
            </label>
            <label htmlFor='castillo_valdivia'>
              <input id='castillo_valdivia' type="checkbox" {...register('castillo_valdivia')} />
              Castillo de Valdivia (Corral)
            </label>
            <label htmlFor='torreones'>
              <input id='torreones' type="checkbox" {...register('torreones')} />
              Torreones (Barro, Los Canelos)
            </label>
            <label htmlFor='ferias_costumbristas'>
              <input id='ferias_costumbristas' type="checkbox" {...register('ferias_costumbristas')} />
              Ferias costumbristas 
            </label>
            <hr style={{margin:'0rem 0rem 0.5rem 0rem'}}></hr>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>Atractivos del tipo Entretención:</span>
            <label>
              <input type="checkbox" {...register('tours')} />
              Tour´s (localidades cercanas)
            </label>
            <label>
              <input type="checkbox" {...register('deporte')} />
              Deportes (Kayak, Canopy, Rafting, etc) 
            </label>
            <label>
              <input type="checkbox" {...register('mercado_fluvial')} />
              Mercado fluvia 
            </label>
            <label>
              <input type="checkbox" {...register('rutas_tematicas')} />
              Rutas temáticas (Cervecería artesanal, recorrido histórico...)
            </label>
            <label>
            <hr style={{margin:'0rem 0rem 0.5rem 0rem'}}></hr>
            <input type="checkbox" {...register('no_visita')} />
              No visito ningún atractivo
            </label>
          </div>

          <div>
            <span>11. ¿Cuál es aproximadamente su presupuesto destinado para este viaje? </span>
            <label>
            Monto: $
            <input type="text" {...register('presupuesto')} />
            </label>
            <label>
              <input type="checkbox" {...register('no_responder')} />
              Prefiero no responder
            </label>
          </div>

          <div>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>12. ¿Cómo se informó de este evento?</span>
            <RadioButton
              register={register}
              registerField='medio_informacion'
              pregunta='11'
              label='Radio'
              value='radio'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              pregunta='11'
              label='Afiches'
              value='afiches'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              pregunta='11'
              label='Prensa escrita'
              value='prensa_escrita'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              pregunta='11'
              label='Página web'
              value='pagina_web'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              pregunta='11'
              label='Por un conocido/amigo'
              value='conocido_amigo'
            />
            <span style={{margin:'0.5rem 0rem 0.5rem 0rem'}}>Redes sociales ¿Cuál?</span>
            <RadioButton
              register={register}
              registerField='medio_informacion'
              pregunta='11'
              label='Facebook'
              value='facebook'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              pregunta='11'
              label='Instagram'
              value='instagram'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              pregunta='11'
              label='Tik tok'
              value='tik_tok'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              pregunta='11'
              label='Twitter'
              value='twitter'
            />
            <RadioButton
              register={register}
              registerField='medio_informacion'
              pregunta='11'
              label='Otro'
              value='otro'
            />
            {watch('medio_informacion') === 'otro' && (
              <div className='anotherOption'>
                <label htmlFor='anotherMedio'>Medio de información:</label>
                <input id='anotherMedio' type="text" {...register('nuevo_medio_informacion', { required: true })} />
              </div>
              )}
          </div>

          <div>
            <label htmlFor='channel'>13. A través de qué canal compró sus entradas?</label>
              <select id='channel' {...register('compraEntradas', { required: true })}>
                <option value="boleterias">Boleterías del recinto</option>
                <option value="sitioWeb">A través del sitio web (passline.com)</option>
                <option value="invitacion">Me invitaron con entrada pagada</option>
                <option value="otro">Otro canal</option>
              </select>
              {watch('compraEntradas') === 'otro' && (
              <div className='anotherOption'>
                <label htmlFor='anotherChannel'>Canal:</label>
                <input id='anotherChannel' type="text" {...register('nuevo_canal', { required: true })} />
              </div>
              )}
          </div>

          <div>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>14.a ¿Cómo calificaría los siguientes aspectos relacionados a la organización del evento?</span>
            <div className='likert'>
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
                    register={register}
                    registerField='senalizacion_informacion'/>
                  <TableRow 
                    topic='Atención de los stand al interior del recinto'
                    register={register}
                    registerField='atencion_de_stands'/>
                  <TableRow 
                    topic='Variedad de cervezas'
                    register={register}
                    registerField='variedad_cerveza'/>
                  <TableRow 
                    topic='Atractivo y variedad de productos a la venta (kits cerveceros y souvenir)'
                    register={register}
                    registerField='atractivos_productos'/>
                  <TableRow 
                    topic='Zona de Foodtruck bierfest'
                    register={register}
                    registerField='foodtruck'/>
                  <TableRow 
                    topic='Ambientación y música de animación'
                    register={register}
                    registerField='ambientacion'/>
                  <TableRow 
                    topic='Costo de entradas'
                    register={register}
                    registerField='costo_entradas'/>
                  <TableRow 
                    topic='Disponibilidad de mesas'
                    register={register}
                    registerField='disponibilidad_mesas'/>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>
              14.b ¿Cómo calificaría los siguientes aspectos relacionados con el recinto SAVAL?
            </span>
            <div className='likert'>
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
                    registerField='acceso_recinto'
                    />
                  
                  <TableRow 
                    topic='Disponibilidad de estacionamientos'
                    register={register}
                    registerField='disponibilidad_estacionamientos'/>
                  <TableRow 
                    topic='Seguridad del recinto'
                    register={register}
                    registerField='seguridad_recinto'/>
                  <TableRow 
                    topic='Iluminación del recinto'
                    register={register}
                    registerField='iluminacion_recinto'/>
                  <TableRow 
                    topic='Accesos inclusivos'
                    register={register}
                    registerField='accesos_inlusivos'/>
                  <TableRow 
                    topic='Servicios higiénicos'
                    register={register}
                    registerField='servicios_higienicos'/>
                  <TableRow 
                    topic='Temperatura al interior del recinto'
                    register={register}
                    registerField='temperatura_recinto'/>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>
              15. Asistió o tiene intención de participar / observar en alguna de estas actividades:
            </span>
            <div className='likert'>
              <table>
                <tbody>
                  <tr className='tableHeader'>
                    <th></th>
                    <th>Aún no participa</th>
                    <th>Insatisfecho</th>
                    <th>Poco satisfecho</th>
                    <th>Ni insatisfecho ni satisfecho</th>
                    <th>Muy satisfecho</th>
                    <th>Totalmente satisfecho</th>
                  </tr>
                  <TableRow 
                    topic='Espectáculo (desfile y música)'
                    register={register}
                    registerField='espectaculo'
                    />
                  <TableRow 
                    topic='Exhibiciones (autos antiguos)'
                    register={register}
                    registerField='exhibiciones'/>
                  <TableRow 
                    topic='Concurso mejor tomador de cerveza'
                    register={register}
                    registerField='mejor_tomador_cerveza'/>
                  <TableRow 
                    topic='Concurso mejor clavador de clavos'
                    register={register}
                    registerField='mejor_clavador'/>
                  <TableRow 
                    topic='Concurso martillo de fuerza'
                    register={register}
                    registerField='martillo_fuerza'/>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>
              16. ¿Participó o participará de alguna actividad complementaria a este evento que se realiza fuera del recinto? (Tarjetas: Regata de velas – Gymkana de autos antiguos – Concurso ecuestre – Regata de remos) (MISMO QUE PREGUNTA 15 Y MODIFICAR SEGÚN PROGRAMA)
            </span>
            <RadioButton
              label='Si'
              register={register}
              pregunta='16'
              registerField='actividad_complementaria'
              value='si'
            />
            <RadioButton
              label='No'
              register={register}
              pregunta='16'
              registerField='actividad_complementaria'
              value='no'
            />
            <label htmlFor='whichOne'>¿En cuál participó/participará?</label>
            <input id='whichOne' type="text" {...register('cual_actividad_complementaria', { required: true })}/>
          </div>
          
          <div>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>
              17. ¿El evento cumplió sus expectativas?
            </span>
            <RadioButton
              label='Si'
              pregunta='17'
              register={register}
              registerField='cumplio_expectativas'
              value='si'
            />
            <RadioButton
              label='No'
              pregunta='17'
              register={register}
              registerField='cumplio_expectativas'
              value='no'
            />
            <label htmlFor='why'>¿Por qué? ¿Qué fue lo que más / menos le gustó?</label>
            <input id='why' type="text" {...register('expectativas', { required: true })}/>
          </div>
          <div>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>
              18. ¿Sabía usted que esta fiesta Bierfest es un evento a beneficio del cuerpo de Bomberos de Valdivia?
            </span>
            <RadioButton 
              label='Si'
              register={register}
              pregunta='18'
              registerField='sabias_beneficio_bomberos'
              value='si'
            />
            <RadioButton
              label='No'
              pregunta='18'
              register={register}
              registerField='sabias_beneficio_bomberos'
              value='no'
            />
          </div>
          <div>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>
              19. ¿Sabía usted que todos los participantes que están en la organización de la fiesta Bierfest son instituciones sin fines de lucro que trabajan para reunir fondos?
            </span>
            <RadioButton 
              label='Si'
              pregunta='19'
              register={register}
              registerField='sabias_sin_fines_lucro'
              value='si'
            />
            <RadioButton
              label='No'
              pregunta='19'
              register={register}
              registerField='sabias_sin_fines_lucro'
              value='no'
            />
          </div>
          <div>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>
              20. ¿Del 1 al 5, cuál es su evaluación general para este evento?
            </span>
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value}>
                <RadioButton
                  label={String(value)}
                  pregunta='20'
                  register={register}
                  registerField='evaluacion_evento'
                  value={String(value)}
                />
              </div>
            ))}
          </div>

          <div>
            <span style={{margin:'0rem 0rem 0.5rem 0rem'}}>
              21. ¿Del 1 al 5, cuánto recomendaría este evento a un amigo?
            </span>
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value}>
                <RadioButton
                  label={String(value)}
                  pregunta='21'
                  register={register}
                  registerField='recomendacion_evento'
                  value={String(value)}
                />
              </div>
            ))}
          </div>
          <div>
            <label htmlFor='comment'>
              22. Para finalizar y considerando su experiencia, ¿tiene algún comentario o sugerencia en general?
            </label>
            <input id='comment' type="text" {...register('comentario')}/>
          </div>

          <div className='submitButtons'>
            <button type="submit">Guardar Respuesta</button>
            <button onClick={guardarRespuestas}>Descargar Excel</button>
          </div>
        </form>
      </div>
    );
  };

export default EncuestaForm;