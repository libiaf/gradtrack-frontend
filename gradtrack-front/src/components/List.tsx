import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid"
import { Evaluado } from "my-types";

type Props = {
  evaluados: Evaluado[];
  onDelete: (id: number) => void;
};

export default function List({ evaluados, onDelete}: Props) {
  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              CURP
            </th>
            <th scope="col" className="px-6 py-3">
              Género
            </th>
            <th scope="col" className="px-6 py-3">
              Graduado
            </th>
            <th scope="col" className="px-6 py-3"> 

            </th>
          </tr>
        </thead>
        <tbody>
          {evaluados.map((evaluado, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {evaluado.id}
              </th>
              <td className="px-6 py-4">
                {evaluado.nombre + " " + evaluado.apellidos}
              </td>
              <td className="px-6 py-4">
                {evaluado.curp}
              </td>
              <td className="px-6 py-4">
                {evaluado.genero}
              </td>
              <td className="px-6 py-4">
                {evaluado.graduado === "SI" ? "SI" : "NO"}
              </td>
              <td className="flex gap-2 items-center">
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                  <PencilIcon className="h-5 w-5" /> Edit
                </button>
                <button className="flex items-center gap-2 text-red-500 hover:text-red-700" onClick={() => onDelete(evaluado.id)}>
                  <TrashIcon className="h-5 w-5" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}