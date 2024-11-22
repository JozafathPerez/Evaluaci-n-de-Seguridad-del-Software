import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function MinMaxAvgStatistic() {
    const [rows, setRows] = useState([]);
    const { userInfo } = useAuth();
  
    const fetchInvoices = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:3000/statistics/minmaxavg',
          params: {
            serverInfo: document.getElementById('server-info-2').value || userInfo.server,
            categorySearch: document.getElementById('supplier-category-search').value || null,
            supplierSearch: document.getElementById('supplier-name-search').value || null
          }
        });
        setRows(response.data);
      } catch (error) {
        if (error.response) {
          console.error(`Error fetching invoices (${error.response.status}): \n${error.response.data.message}`);
        } else {
          console.error('Error fetching invoices:', error);
        }
      }
    };
  
    const resetAllFilters = () => {
      document.getElementById('supplier-name-search').value = '';
      document.getElementById('supplier-category-search').value = '';
      fetchInvoices();
    };
  
    useEffect(() => {
      fetchInvoices();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4 h-fit">
            <div className="mb-4 flex space-x-4 flex-wrap">
            {/* FILTERS */}
            <div className='flex-auto'>
            <label htmlFor="supplier-category-search"
                className="block text-sm font-medium text-zinc-300"
            >Categoría del proveedor
            </label>
            <input
                type="text"
                id="supplier-category-search"
                name="supplier-category-search"
                className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
                focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                autoComplete='off'
                onChange={fetchInvoices}
                placeholder='Ingrese una categoría de proveedor'
            />
            </div>
            <div className='flex-auto'>
            <label htmlFor="supplier-name-search"
                className="block text-sm font-medium text-zinc-300"
            >Nombre del proveedor
            </label>
            <input
                type="text"
                id="supplier-name-search"
                name="supplier-name-search"
                className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
                focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                autoComplete='off'
                onChange={fetchInvoices}
                placeholder='Ingrese un nombre de proveedor'
            />
            </div>
            <div className='flex-auto'>
            <label htmlFor="server-info-2"
                className="block text-sm font-medium text-zinc-300"
            >Sucursal
            </label>
            <select
                id="server-info-2"
                name="server-info-2"
                className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
                focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                onChange={fetchInvoices}
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
                <th className="py-2 px-4 border-b text-left">Categoría del Proveedor</th>
                <th className="py-2 px-4 border-b text-left">Nombre del Proveedor</th>
                <th className="py-2 px-4 border-b text-right">Monto Máximo</th>
                <th className="py-2 px-4 border-b text-right">Monto Mínimo</th>
                <th className="py-2 px-4 border-b text-right">Monto Promedio</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((statistic, index) => (
                <tr key={index} className="border-y-2 border-zinc-600 hover:bg-zinc-700">
                    <td className="py-2 px-4 border-b text-left">{statistic.SupplierCategoryName}</td>
                    <td className="py-2 px-4 border-b text-left">{statistic.SupplierName}</td>
                    <td className="py-2 px-4 border-b text-right">{statistic.MaxAmount}</td>
                    <td className="py-2 px-4 border-b text-right">{statistic.MinAmount}</td>
                    <td className="py-2 px-4 border-b text-right">{statistic.AvgAmount}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
    )


}