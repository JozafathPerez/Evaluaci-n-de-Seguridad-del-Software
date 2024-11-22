import { useState, useEffect } from 'react';
import axios from 'axios';
import SupplierDetailsModal from './SupplierDetailsModal';
import { useAuth } from '../context/AuthContext';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const { userInfo } = useAuth();

  const fetchSuppliers = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:3000/suppliers',
        params: {
          serverInfo: userInfo.Location,
          supplierName: document.getElementById('supplier-name').value || null,
          category: document.getElementById('category-search').value || null,
          deliveryMethod: null
        }
      });
      setSuppliers(response.data);
    } catch (error) {
      if (error.response) {
        console.error(`Error fetching suppliers (${error.response.status}): \n${error.response.data.message}`);
      } else {
        console.error('Error fetching suppliers:', error);
      }
    }
  };

  const resetAllFilters = () => {
    document.getElementById('supplier-name').value = '';
    document.getElementById('category-search').value = '';
    fetchSuppliers();
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleRowClick = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const closeModal = () => {
    setSelectedSupplier(null);
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Módulo de proveedores</h1>

      <div className="mb-4 flex space-x-4">
        <div className='flex-auto'>
          <label htmlFor="supplier-name"
            className="block text-sm font-medium text-zinc-300"
          >Nombre del proveedor
          </label>
          <input
            type="text"
            id="supplier-name"
            name="supplier-name"
            className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            autoComplete='off'
            onChange={fetchSuppliers}
            placeholder='Ingrese un nombre de proveedor'
          />
        </div>
        <div className='flex-auto'>
          <label htmlFor="category-search"
            className="block text-sm font-medium text-zinc-300"
          >Categoría proveedor
          </label>
          <input
            type="text"
            id="category-search"
            name="category-search"
            className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            autoComplete='off'
            onChange={fetchSuppliers}
            placeholder='Ingrese un nombre de proveedor'
          />
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

      <div className="overflow-y-auto flex-grow rounded-xl shadow-lg shadow-zinc-900">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-sky-700 text-white">
            <tr>
              <th className="py-2 px-4 border-b text-right">ID</th>
              <th className="py-2 px-4 border-b text-left">Proveedor</th>
              <th className="py-2 px-4 border-b text-left">Categoría</th>
              <th className="py-2 px-4 border-b text-left">Met. Envío</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.SupplierID} className="border-y-2 border-zinc-600 hover:bg-zinc-700" onClick={() => handleRowClick(supplier.SupplierID)}>
                <td className="py-2 px-4 border-b text-right">{supplier.SupplierID}</td>
                <td className="py-2 px-4 border-b text-left">{supplier.SupplierName}</td>
                <td className="py-2 px-4 border-b text-left">{supplier.SupplierCategoryName}</td>
                <td className="py-2 px-4 border-b text-left">{supplier.DeliveryMethodName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSupplier && (
        <SupplierDetailsModal supplierID={selectedSupplier} onClose={closeModal} />
      )}

    </div>
  );
}

export default Suppliers;