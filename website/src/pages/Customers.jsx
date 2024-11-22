import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerDetailsModal from './CustomerDetailsModal';
import { useAuth } from '../context/AuthContext';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const {userInfo} = useAuth()

  const fetchCustomers = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:3000/customers',
        params: {
          serverInfo: userInfo.Location,
          customerName: document.getElementById('customerName').value || null,
          category: null,
          deliveryMethod: null
        }
      });
      setCustomers(response.data);
    } catch (error) {
      if (error.response) {
        console.error(`Error fetching customers (${error.response.status}): \n${error.response.data.message}`);
      } else {
        console.error('Error fetching customers:', error);
      }
    }
  };

  const resetAllFilters = () => {
    document.getElementById('customerName').value = '';
    fetchCustomers();
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Vista de clientes</h1>

      <div className="mb-4 flex space-x-4">
        <div className='flex-auto'>
          <label htmlFor="customerName"
            className="block text-sm font-medium text-zinc-300"
          >Nombre de cliente
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            autoComplete='off'
            onChange={fetchCustomers}
            placeholder='Ingrese un nombre de cliente'
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
              <th className="py-2 px-4 border-b text-left">Cliente</th>
              <th className="py-2 px-4 border-b text-left">Categoría</th>
              <th className="py-2 px-4 border-b text-left">Met. Envío</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.CustomerID} className="border-y-2 border-zinc-600 hover:bg-zinc-700" onClick={() => handleRowClick(customer.CustomerID)}>
                <td className="py-2 px-4 border-b text-right">{customer.CustomerID}</td>
                <td className="py-2 px-4 border-b text-left">{customer.CustomerName}</td>
                <td className="py-2 px-4 border-b text-left">{customer.CustomerCategoryName}</td>
                <td className="py-2 px-4 border-b text-left">{customer.DeliveryMethodName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCustomer && (
        <CustomerDetailsModal customerID={selectedCustomer} onClose={closeModal} />
      )}

    </div>
  );
}

export default Customers;