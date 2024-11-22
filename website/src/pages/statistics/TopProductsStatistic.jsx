import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

// Top 5 de los productos que generan más ganancia en las ventas por año, debe poder filtrarse por años.
// Estos deben ser años válidos en la base de datos (Usar dense_rank y partitions) 

export default function TopProductsStatistic() {
    const [rows, setRows] = useState([]);
    const { userInfo } = useAuth();
  
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:3000/statistics/topproducts',
          params: {
            serverInfo: document.getElementById('server-info-4').value || userInfo.server,
            minYear: document.getElementById('min-year').value || null,
            maxYear: document.getElementById('max-year').value || null
          }
        });
        setRows(response.data);
      } catch (error) {
        if (error.response) {
          console.error(`Error fetching data (${error.response.status}): \n${error.response.data.message}`);
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };
  
    const resetAllFilters = () => {
      document.getElementById('min-year').value = '';
      document.getElementById('max-year').value = '';
      fetchData();
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4 h-fit">
            <div className="mb-4 flex space-x-4 flex-wrap">
            {/* FILTERS */}
            <div className='flex flex-auto space-x-4'>
              <div className='flex-auto'>
                <label htmlFor="min-year"
                  className="block text-sm font-medium text-zinc-300"
                >Fecha mínima
                </label>
                <input
                  type="number"
                  id="min-year"
                  name="min-year"
                  min={2013} max={2024} step={1} value={null}
                  className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
                    focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
                  onChange={fetchData}
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div className='flex-auto'>
                <label htmlFor="max-year"
                  className="block text-sm font-medium text-zinc-300"
                >Fecha máxima
                </label>
                <input
                  type="number"
                  id="max-year"
                  name="max-year"
                  min={2013} max={2024} step={1} value={null}
                  className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
                    focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
                  onChange={fetchData}
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>
            <div className='flex-auto'>
            <label htmlFor="server-info-4"
                className="block text-sm font-medium text-zinc-300"
            >Sucursal
            </label>
            <select
                id="server-info-4"
                name="server-info-4"
                className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
                focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                onChange={fetchData}
            >
                <option value="Limon">Limón</option>
                <option value="San Jose">San José</option>
                <option value="Escazu">Todas</option>
            </select>
            </div>
            <div>
            <button
                id='resetFilters'
                className="mt-4 px-4 py-2 bg-sky-500 font-medium
                rounded-xl text-black w-full hover:bg-sky-400"
                onClick={resetAllFilters}
            >Limpiar filtros</button>
            </div>
        </div>
        {/* TABLE */}
        <div className="overflow-y-auto h-96 rounded-xl shadow-lg shadow-zinc-900">
            <table className="min-w-full">
            <thead className="sticky top-0 bg-sky-700 text-white">
                <tr>
                <th className="py-2 px-4 border-b text-left">Top</th>
                <th className="py-2 px-4 border-b text-left">Producto</th>
                <th className="py-2 px-4 border-b text-right">Ganancia</th>
                <th className="py-2 px-4 border-b text-right">Año</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((statistic, index) => (
                <tr key={index} className="border-y-2 border-zinc-600 hover:bg-zinc-700">
                    <td className="py-2 px-4 border-b text-left">{statistic.Rank}</td>
                    <td className="py-2 px-4 border-b text-left">{statistic.StockItemName}</td>
                    <td className="py-2 px-4 border-b text-right">{statistic.Amount}</td>
                    <td className="py-2 px-4 border-b text-right">{statistic.Year}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
    )


}