import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import RadioButton from "./RadioButton";
import TableRow from "./TableRow";
import Options from "./Options";
import useAppContext from "./AppContext";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";

const EncuestaForm = () => {
    const methods = useForm();
    const [encuestaData, setEncuestaData] = useState([]);
    const { addAnswer, cleanStorage } = useAppContext();

    useEffect(() => {
        if (methods.formState.isSubmitSuccessful) {
            methods.reset();
        }
    }, [methods.reset, methods.formState, encuestaData]);

    const onSubmit = (data) => {
        setEncuestaData((prevData) => [...prevData, data]);
        addAnswer(data);
        toast.success("Respuesta Guardada!");
        methods.reset();
    };

    const guardarRespuestas = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(encuestaData);
        XLSX.utils.book_append_sheet(wb, ws, "Encuesta");
        XLSX.writeFile(wb, "encuesta_bierfest_2024.xlsx");
        cleanStorage();
    };

    return (
        <div className='container'>
            <Toaster
                position='top-center'
                reverseOrder={false}
                gutter={8}
                containerClassName=''
                containerStyle={{}}
                toastOptions={{
                    className: "",
                    duration: 5000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                    success: {
                        duration: 3000,
                        theme: {
                            primary: "green",
                            secondary: "black",
                        },
                    },
                }}
            />
            <FormProvider {...methods}>
                <form
                    className='form'
                    onSubmit={methods.handleSubmit(onSubmit)}>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            1. <strong>¿Cuántos años tiene?</strong>
                        </span>
                        <input
                            placeholder='Edad'
                            type='number'
                            {...methods.register("¿Cuántos años tiene?", {
                                required: true,
                            })}
                        />
                    </div>

                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            2. <strong>¿Con qué género se identifica?</strong>
                        </span>
                        <RadioButton
                            field='¿Con qué género se identifica?'
                            options={[
                                "Femenino",
                                "Masculino",
                                "Otro",
                                "Prefiero no responder",
                            ]}
                        />
                    </div>

                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            3. <strong>¿Cuál es su ocupación actual?</strong>
                        </span>
                        <Options
                            field='¿Cuál es su ocupación actual?'
                            enableAnother={true}
                            placeholder='Otra ocupación'
                            options={[
                                "Estudiante",
                                "Trabajador independiente",
                                "Trabajador dependiente",
                                "Jubilado",
                                "Desempleado",
                                "Otro",
                            ]}
                        />
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            4.{" "}
                            <strong>
                                ¿Cuál es su motivación para asistir a la
                                Bierfest?
                            </strong>
                        </span>
                        <Options
                            field='¿Cuál es su motivación para asistir a la Bierfest?'
                            enableAnother={true}
                            placeholder='Otra motivación'
                            options={[
                                "Realizar actividades turísticas o recreativas",
                                "Participé por casualidad al venir al parque SAVAL",
                                "Me recomendaron este evento",
                                "Otro",
                            ]}
                        />
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            5. <strong>¿Cuál es su país de residencia?</strong>
                        </span>
                        <Options
                            field='¿Cuál es su país de residencia?'
                            enableAnother={true}
                            placeholder='Otro país'
                            options={["Chile", "Otro"]}
                        />
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            6.{" "}
                            <strong>¿Cuál es su ciudad de residencia?</strong>
                        </span>
                        <Options
                            field='¿Cuál es su ciudad de residencia?'
                            enableAnother={true}
                            placeholder='Otra ciudad'
                            options={["Valdivia", "Otro"]}
                        />
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            7. <strong>¿Cómo se informó de este evento?</strong>
                        </span>
                        <Options
                            field='¿Cómo se informó de este evento?'
                            enableAnother={true}
                            placeholder='Otro medio'
                            options={[
                                "Radio",
                                "Afiches",
                                "Prensa escrita",
                                "Página web",
                                "Por un conocido/amigo",
                                "Facebook",
                                "Instagram",
                                "Tik Tok",
                                "Twitter",
                                "Otro",
                            ]}
                        />
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            8.{" "}
                            <strong>
                                ¿A través de qué canal compró sus entradas?
                            </strong>
                        </span>
                        <Options
                            field='¿A través de qué canal compró sus entradas?'
                            enableAnother={true}
                            placeholder='Otro canal'
                            options={[
                                "Boleterías del recinto",
                                "A través del sitio web (passline.com)",
                                "Me invitaron con entrada pagada",
                                "Otro",
                            ]}
                        />
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            9.{" "}
                            <strong>
                                ¿Cómo calificaría los siguientes aspectos
                                relacionados a la organización del evento?
                            </strong>
                        </span>
                        <div className='likert'>
                            <TableRow
                                topics={[
                                    "Señalética e información disponible",
                                    "Atención de los stand al interior del recinto",
                                    "Variedad de cervezas",
                                    "Atractivo y variedad de productos a la venta (kits cerveceros y souvenir)",
                                    "Biergarten (zona de Foodtruck)",
                                    "Ambientación y música de animación",
                                    "Costo de entradas",
                                    "Disponibilidad de mesas",
                                    "Sistema de tickets",
                                    "Variedad del programa",
                                ]}
                                values={[
                                    "No usé o no participe",
                                    "Insatisfecho",
                                    "Poco satisfecho",
                                    "Ni satisfecho ni insatisfecho",
                                    "Muy satisfecho",
                                    "Totalmente satisfecho",
                                ]}
                            />
                        </div>
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            10.{" "}
                            <strong>
                                ¿Cómo calificaría los siguientes aspectos
                                relacionados con el recinto SAVAL?
                            </strong>
                        </span>
                        <div className='likert'>
                            <TableRow
                                topics={[
                                    "Acceso al recinto (rapidez, amabilidad)",
                                    "Disponibilidad de estacionamientos",
                                    "Seguridad del recinto",
                                    "Iluminación del recinto",
                                    "Accesos inclusivos",
                                    "Servicios higiénicos",
                                    "Temperatura al interior del recinto",
                                ]}
                                values={[
                                    "No usé o no participe",
                                    "Insatisfecho",
                                    "Poco satisfecho",
                                    "Ni satisfecho ni insatisfecho",
                                    "Muy satisfecho",
                                    "Totalmente satisfecho",
                                ]}
                            />
                        </div>
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            11.{" "}
                            <strong>
                                Asistió o tiene intentención de participar /
                                observar alguna de estas actividades de la
                                Bierfest:
                            </strong>
                        </span>
                        <div className='likert'>
                            <TableRow
                                topics={[
                                    "Concurso clavados de clavos",
                                    "Concurso al mejor tomador de cervezas",
                                    "Concurso aserrado de tronco",
                                    "Concurso posta cervezera",
                                    "Masskrugste mmen (Concurso de sostener la jarra)",
                                    "Sunset electrónico",
                                    "Música en vivo",
                                ]}
                                values={[
                                    "No",
                                    "Si, pero aún no asiste",
                                    "Insatisfecho",
                                    "Poco satisfecho",
                                    "Ni satisfecho ni insatisfecho",
                                    "Muy satisfecho",
                                    "Totalmente satisfecho",
                                ]}
                            />
                        </div>
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            12.{" "}
                            <strong>
                                Asistió o tiene intentención de participar /
                                observar alguna de estas actividades gratis
                                organizadas por la Bierfest:
                            </strong>
                        </span>
                        <div className='likert'>
                            <TableRow
                                topics={[
                                    "Bierparade (desfile)",
                                    "Música y danza COSTANERA",
                                    "Regatas remo Copa Bierfest",
                                    "Regata de velas Copa Bierfest",
                                    "Exhibición de autos antiguos",
                                    "SUP Race Bierfest",
                                    "Actividad ecuestre",
                                ]}
                                values={[
                                    "No",
                                    "Si, pero aún no asiste",
                                    "Insatisfecho",
                                    "Poco satisfecho",
                                    "Ni satisfecho ni insatisfecho",
                                    "Muy satisfecho",
                                    "Totalmente satisfecho",
                                ]}
                            />
                        </div>
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            13.{" "}
                            <strong>
                                ¿El evento cumplió sus expectativas?
                            </strong>
                        </span>
                        <span style={{ margin: "0rem 0rem 0.1rem 0rem" }}>
                            ¿Por qué? ¿Qué fue lo que más / menos le gustó?
                        </span>
                        <input type='text' placeholder='Expectativas' />
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            14.{" "}
                            <strong>
                                ¿Sabía usted que esta fiesta Bierfest es un
                                evento a beneficio del cuerpo de Bomberos de
                                Valdivia?
                            </strong>
                        </span>
                        <RadioButton
                            options={["Si", "No"]}
                            field='¿Sabía usted que esta fiesta Bierfest es un
                          evento a beneficio del cuerpo de Bomberos de
                          Valdivia?'
                        />
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            15.{" "}
                            <strong>
                                ¿Sabía usted que todos los participantes que
                                están en la organización de la fiesta Bierfest
                                son instituciones sin fines de lucro que
                                trabajan para reunir fondos?
                            </strong>
                        </span>
                        <RadioButton
                            options={["Si", "No"]}
                            field='¿Sabía usted que todos los participantes que
                            están en la organización de la fiesta Bierfest son
                            instituciones sin fines de lucro que trabajan para
                            reunir fondos?'
                        />
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            16.{" "}
                            <strong>
                                Del 1 al 5 ¿Cuál es su evaluación general para
                                este evento?
                            </strong>
                        </span>
                        <div>
                            <RadioButton
                                options={["1", "2", "3", "4", "5"]}
                                field='Del 1 al 5 ¿Cuál es su evaluación general para
                                este evento?'
                            />
                        </div>
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            17.{" "}
                            <strong>
                                Del 1 al 5 ¿Cuánto recomendaría este evento a un
                                amigo?
                            </strong>
                        </span>
                        <div>
                            <RadioButton
                                options={["1", "2", "3", "4", "5"]}
                                field='Del 1 al 5 ¿Cuánto recomendaría este evento a un amigo?'
                            />
                        </div>
                    </div>
                    <div>
                        <span style={{ margin: "0rem 0rem 0.5rem 0rem" }}>
                            18.{" "}
                            <strong>
                                Para finalizar y considerando su experiencia
                                ¿Tiene algún comentario o sugerencia en general?
                            </strong>
                        </span>
                        <input
                            id='comment'
                            type='text'
                            placeholder='Ingresar comentario'
                            {...methods.register(`Para finalizar y considerando su experiencia,
                            ¿tiene algún comentario o sugerencia en general?`)}
                        />
                    </div>
                    <div className='submitButtons'>
                        <button type='submit'>Guardar Respuesta</button>
                        <button onClick={guardarRespuestas}>
                            Descargar Excel
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default EncuestaForm;
