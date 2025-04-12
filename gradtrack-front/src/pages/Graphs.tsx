import { Evaluado } from "my-types";
import { useEffect, useState } from "react";
import { getAllEvaluados } from "../api/EvaluadoAPI";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Graphs() {
  const [evaluados, setEvaluados] = useState<Evaluado[]>([]);

  useEffect(() => {
    getAllEvaluados().then((data: Evaluado[]) => setEvaluados(data));
  }, []);

  console.log(evaluados);

  const contarGraduados = (evaluados: Evaluado[]) => {
    const graduados = evaluados.filter((est) => est.graduado === "SI").length;
    const nograduados = evaluados.length - graduados;
    return [
      { nombre: "Graduados", personas: graduados },
      { nombre: "No graduados", personas: nograduados },
    ];
  };

  const data = contarGraduados(evaluados);

  const contarGeneroGraduados = (ev: Evaluado[]) => {
    const graduados = ev.filter((p) => p.graduado === "SI");
    const hombres = graduados.filter(
      (p) => p.genero.trim().toUpperCase() === "HOMBRE"
    ).length;
    const mujeres = graduados.filter(
      (p) => p.genero.trim().toUpperCase() === "MUJER"
    ).length;

    return [
      { name: "Hombres", value: hombres },
      { name: "Mujeres", value: mujeres },
    ];
  };

  const dataPie = contarGeneroGraduados(evaluados);
  console.log(dataPie);
  const COLORS = ["#0088FE", "#FF69B4"];

  return (
    <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
      <div>
        <h3>Graduados vs No Graduados</h3>
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="personas" fill="#886dab" />
        </BarChart>
      </div>

      <div>
        <h3>Género (Graduados)</h3>
        <ResponsiveContainer width={500} height={300}>
          <PieChart>
            <Pie
              data={dataPie}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#86ab6d"
              dataKey="value"
              label
            >
              {dataPie.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
