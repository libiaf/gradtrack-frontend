import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LabelList
} from 'recharts';
import {
  getTotalEvaluados,
  getPorcentajeGraduacion,
  getGraduacionHombres,
  getGraduacionMujeres,
  getNivelAlerta
} from '../api/EvaluadoAPI';
import { getZonas, getPoblacionesByZona } from '../api/EvaluadoAPI';
import { Zona, Poblacion } from 'my-types';
import '../styles/graphsStyles.css';
import DropdownZonas from '../components/ZonaDropdown';
import PoblacionFilter from '../components/PoblacionDropdown';

interface GraphsProps {
  initialZonaId?: number | null;
  initialPoblacionId?: number | null;
}

const Graphs: React.FC<GraphsProps> = ({ initialZonaId = null, initialPoblacionId = null }) => {
  const [zonaId, setZonaId] = useState<number | null>(initialZonaId);
  const [poblacionId, setPoblacionId] = useState<number | null>(initialPoblacionId);
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [poblaciones, setPoblaciones] = useState<Poblacion[]>([]);

  const [totalEvaluados, setTotalEvaluados] = useState<number>(0);
  const [porcentajeGraduacion, setPorcentajeGraduacion] = useState<{
    graduados: number;
    noGraduados: number;
  }>({ graduados: 0, noGraduados: 0 });
  const [graduacionHombres, setGraduacionHombres] = useState<{
    totalHombres: number;
    porcentajeGraduados: number;
    porcentajeNoGraduados: number;
  }>({ totalHombres: 0, porcentajeGraduados: 0, porcentajeNoGraduados: 0 });
  const [graduacionMujeres, setGraduacionMujeres] = useState<{
    totalMujeres: number;
    porcentajeGraduados: number;
    porcentajeNoGraduados: number;
  }>({ totalMujeres: 0, porcentajeGraduados: 0, porcentajeNoGraduados: 0 });
  const [nivelAlerta, setNivelAlerta] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const data = await getZonas();
        setZonas(data);
      } catch (error) {
        console.error('Error al cargar zonas:', error);
      }
    };

    fetchZonas();
  }, []);

  useEffect(() => {
    const fetchPoblaciones = async () => {
      if (zonaId) {
        try {
          const data = await getPoblacionesByZona(zonaId);
          setPoblaciones(data);
          
          if (data.length > 0 && !poblacionId) {
            setPoblacionId(data[0].id);
          }
          
          if (poblacionId && !data.some((p: Poblacion) => p.id === poblacionId)) {
            setPoblacionId(null);
          }
        } catch (error) {
          console.error('Error al cargar poblaciones:', error);
        }
      } else {
        setPoblaciones([]);
        setPoblacionId(null);
      }
    };

    fetchPoblaciones();
  }, [zonaId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!poblacionId) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const [totalRes, porcentajeRes, hombresRes, mujeresRes, alertaRes] = await Promise.all([
          getTotalEvaluados(poblacionId.toString()),
          getPorcentajeGraduacion(poblacionId.toString()),
          getGraduacionHombres(poblacionId.toString()),
          getGraduacionMujeres(poblacionId.toString()),
          getNivelAlerta(poblacionId.toString())
        ]);

        setTotalEvaluados(totalRes.total);
        setPorcentajeGraduacion({
          graduados: porcentajeRes.graduados,
          noGraduados: porcentajeRes.noGraduados
        });
        setGraduacionHombres({
          totalHombres: hombresRes.totalHombres,
          porcentajeGraduados: hombresRes.porcentajeGraduados,
          porcentajeNoGraduados: hombresRes.porcentajeNoGraduados
        });
        setGraduacionMujeres({
          totalMujeres: mujeresRes.totalMujeres,
          porcentajeGraduados: mujeresRes.porcentajeGraduados,
          porcentajeNoGraduados: mujeresRes.porcentajeNoGraduados
        });
        setNivelAlerta(alertaRes.nivel);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [poblacionId]);

  const COLORS_TOTAL = ['#d95961', '#f3b8bb'];
  const COLORS_MUJERES = ['#d7c0d0', '#f1e8ee'];
  const COLORS_HOMBRES = ['#77ba99', '#c5d5cd'];

  // Datos para el gráfico de dona mujeres
  const dataMujeres = [
    { name: 'Graduadas', value: graduacionMujeres.porcentajeGraduados },
    { name: 'No Graduadas', value: graduacionMujeres.porcentajeNoGraduados }
  ];

  // Datos para el gráfico de dona hombres
  const dataHombres = [
    { name: 'Graduados', value: graduacionHombres.porcentajeGraduados },
    { name: 'No Graduados', value: graduacionHombres.porcentajeNoGraduados }
  ];

  // Datos para el gráfico de barras
  const dataBarras = [
    { 
      name: 'Graduados', 
      value: Math.round(porcentajeGraduacion.graduados * totalEvaluados / 100), 
      porcentaje: porcentajeGraduacion.graduados 
    },
    { 
      name: 'No graduados', 
      value: Math.round(porcentajeGraduacion.noGraduados * totalEvaluados / 100), 
      porcentaje: porcentajeGraduacion.noGraduados 
    }
  ];

  // Gráficos de dona
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, name } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    const percentage = (percent * 100).toFixed(0);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#000000" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${percentage}%`}
      </text>
    );
  };

  const getAlertaClass = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case 'bajo': return 'nivel-alerta nivel-bajo';
      case 'alto': return 'nivel-alerta nivel-alto';
      case 'grave': return 'nivel-alerta nivel-grave';
      case 'muy bajo': return 'nivel-alerta nivel-muy-bajo';
      default: return 'nivel-alerta';
    }
  };

  // Gráfico de barras
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ background: 'white', padding: '10px', border: '1px solid #ccc' }}>
          <p>{`${payload[0].name}: ${payload[0].value}`}</p>
          <p>{`Porcentaje: ${payload[0].payload.porcentaje.toFixed(0)}%`}</p>
        </div>
      );
    }
    return null;
  };

  const renderBarLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const percentage = dataBarras[index].porcentaje.toFixed(0);
    
    return (
      <text
        x={x + width / 2}
        y={y - 10}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={14}
        fontWeight="bold"
      >
        {`${value} (${percentage}%)`}
      </text>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="filters-container" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <DropdownZonas
          zonas={zonas}
          selectedZonaId={zonaId}
          onZonaSelect={(id) => {
            setZonaId(id);
            setPoblacionId(null);
          }}
        />

        {zonaId && (
          <PoblacionFilter
            poblaciones={poblaciones}
            onPoblacionSelect={(id) => setPoblacionId(id)}
            disabled={!zonaId}
            selectedPoblacionId={poblacionId}
          />
        )}
      </div>

      {/* Mensaje si no hay selección */}
      {!poblacionId && (
        <div className="text-center p-10 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="text-xl text-gray-600">Selecciona una zona y una población para ver las estadísticas</h3>
        </div>
      )}

      {/* Loader */}
      {loading && poblacionId && (
        <div className="text-center p-10">
          <p className="text-lg">Cargando datos...</p>
        </div>
      )}

      {/* Contenido del Dashboard */}
      {!loading && poblacionId && (
        <>
          {/* Total de evaluados */}
          <div className="total-evaluados">
            <span className="total-label">Total:</span>
            <span className="total-number">{totalEvaluados} evaluados</span>
          </div>
          
          <h2 className="dashboard-subtitle">Tasa de graduación</h2>
          
          <div className="dashboard-grid">
            {/* Gráfico de barras - Total */}
            <div className="stat-card total-card">
              <h3 className="card-title">Total</h3>
              <div className="total-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataBarras}
                    margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      name="Cantidad" 
                      radius={[10, 10, 0, 0]}
                    >
                      {dataBarras.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS_TOTAL[index % COLORS_TOTAL.length]} />
                      ))}
                      <LabelList dataKey="value" content={renderBarLabel} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Gráfico de dona - Mujeres */}
            <div className="stat-card">
              <h3 className="card-title">Mujeres</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataMujeres}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      innerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={2}
                    >
                      {dataMujeres.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS_MUJERES[index % COLORS_MUJERES.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value.toFixed(0)}%`, 'Porcentaje']} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      formatter={(value) => value === "Graduadas" ? "Graduadas" : "No Graduadas"} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="donut-center">
                  <p className="donut-number">{graduacionMujeres.totalMujeres}</p>
                  <p className="donut-label">mujeres</p>
                </div>
              </div>
            </div>
            
            {/* Gráfico de dona - Hombres */}
            <div className="stat-card">
              <h3 className="card-title">Hombres</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataHombres}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      innerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={2}
                    >
                      {dataHombres.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS_HOMBRES[index % COLORS_HOMBRES.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value.toFixed(0)}%`, 'Porcentaje']} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      formatter={(value) => value === "Graduados" ? "Graduados" : "No Graduados"} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="donut-center">
                  <p className="donut-number">{graduacionHombres.totalHombres}</p>
                  <p className="donut-label">hombres</p>
                </div>
              </div>
            </div>
            
            {/* Nivel de alerta */}
            <div className="stat-card alerta-card">
              <h3 className="alerta-title">Nivel de alerta</h3>
              <div className="alerta-container">
                <span className={getAlertaClass(nivelAlerta)}>
                  {nivelAlerta}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Graphs;