// import { useFormContext } from "react-hook-form";
// const TableRow = ({ topics }) => {
//     const { register } = useFormContext();
//     return (
//         <table>
//             <tbody>
//                 <tr className='tableHeader'>
//                     <th></th>
//                     <th>No usé o no participé</th>
//                     <th>Insatisfecho</th>
//                     <th>Poco satisfecho</th>
//                     <th>Ni insatisfecho ni satisfecho</th>
//                     <th>Muy satisfecho</th>
//                     <th>Totalmente satisfecho</th>
//                 </tr>

//                 {topics.map((topic, index) => (

//                     <tr key={index}>
//                         <td>{topic}</td>
//                         <td>
//                             <input
//                                 type='radio'
//                                 value='No usé o no participé'
//                                 {...register(`${topic}`)}
//                             />
//                         </td>
//                         <td>
//                             <input
//                                 type='radio'
//                                 value='Insatisfecho'
//                                 {...register(`${topic}`)}
//                             />
//                         </td>
//                         <td>
//                             <input
//                                 type='radio'
//                                 value='Poco satisfecho'
//                                 {...register(`${topic}`)}
//                             />
//                         </td>
//                         <td>
//                             <input
//                                 type='radio'
//                                 value='Ni insatisfecho ni satisfecho'
//                                 {...register(`${topic}`)}
//                             />
//                         </td>
//                         <td>
//                             <input
//                                 type='radio'
//                                 value='Muy satisfecho'
//                                 {...register(`${topic}`)}
//                             />
//                         </td>
//                         <td>
//                             <input
//                                 type='radio'
//                                 value='Totalmente satisfecho'
//                                 {...register(`${topic}`)}
//                             />
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default TableRow;

import { useFormContext } from "react-hook-form";
const TableRow = ({ topics, values }) => {
    const { register } = useFormContext();
    return (
        <table>
            <tbody>
                <tr className='tableHeader'>
                    <th></th>
                    {values.map((value, index) => (
                        <th key={index}>{value}</th>
                    ))}
                </tr>
                {topics.map((topic, index) => (
                    <tr key={index}>
                        <td>{topic}</td>
                        {values.map((value, index) => (
                            <td key={index}>
                                <input 
                                    type='radio' 
                                    value={value} 
                                    required
                                    {...register(topic)}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableRow;
