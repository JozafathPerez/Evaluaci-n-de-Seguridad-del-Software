import { useState, useEffect } from 'react';
import axios from 'axios';
import InvoiceDetailsModal from './InvoiceDetailsModal';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useAuth } from '../context/AuthContext';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const { userInfo } = useAuth();

  const fetchInvoices = async (resetPage = true) => {
    if (resetPage) {
      setPage(1);
    }
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:3000/invoices',
        params: {
          serverInfo: userInfo.Location,
          customerName: document.getElementById('customer-search').value || null,
          minDate: document.getElementById('min-date').value || null,
          maxDate: document.getElementById('max-date').value || null,
          minAmount: document.getElementById('min-amount').value || null,
          maxAmount: document.getElementById('max-amount').value || null,
          pageNumber: page
        }
      });
      setInvoices(response.data.invoices);
      setMaxPage(response.data.totalPages);
    } catch (error) {
      if (error.response) {
        console.error(`Error fetching invoices (${error.response.status}): \n${error.response.data.message}`);
      } else {
        console.error('Error fetching invoices:', error);
      }
    }
  };

  const resetAllFilters = () => {
    document.getElementById('customer-search').value = '';
    document.getElementById('min-date').value = '';
    document.getElementById('max-date').value = '';
    document.getElementById('min-amount').value = '';
    document.getElementById('max-amount').value = '';
    fetchInvoices();
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleRowClick = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeModal = () => {
    setSelectedInvoice(null);
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Módulo de ventas</h1>

      {/* header */}
      <div className="mb-4 flex space-x-4 flex-wrap">
        <div className='flex-auto'>
          <label htmlFor="customer-search"
            className="block text-sm font-medium text-zinc-300"
          >Nombre del cliente
          </label>
          <input
            type="text"
            id="customer-search"
            name="customer-search"
            className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            autoComplete='off'
            onChange={fetchInvoices}
            placeholder='Ingrese un nombre de cliente'
          />
        </div>
        <div className='flex flex-auto space-x-4'>
          <div className='flex-auto'>
            <label htmlFor="min-date"
              className="block text-sm font-medium text-zinc-300"
            >Fecha mínima
            </label>
            <input
              type="date"
              id="min-date"
              name="min-date"
              className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
                focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
              onChange={fetchInvoices}
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <div className='flex-auto'>
            <label htmlFor="max-date"
              className="block text-sm font-medium text-zinc-300"
            >Fecha máxima
            </label>
            <input
              type="date"
              id="max-date"
              name="max-date"
              className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
                focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
              onChange={fetchInvoices}
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </div>
        <div className='flex flex-auto space-x-4'>
          <div className='flex-auto'>
            <label htmlFor="min-amount"
              className="block text-sm font-medium text-zinc-300"
            >Monto mínimo
            </label>
            <input
              type="number"
              id="min-amount"
              name="min-amount"
              className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
                focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              onChange={fetchInvoices}
              placeholder='Ingrese un monto mínimo'
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <div className='flex-auto'>
            <label htmlFor="max-amount"
              className="block text-sm font-medium text-zinc-300"
            >Monto máximo
            </label>
            <input
              type="number"
              id="max-amount"
              name="max-amount"
              className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
                focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              onChange={fetchInvoices}
              placeholder='Ingrese un monto máximo'
              style={{ colorScheme: 'dark' }}
            />
          </div>
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

      {/* table */}
      <div className="overflow-y-auto flex-grow rounded-xl shadow-lg shadow-zinc-900">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-sky-700 text-white">
            <tr>
              <th className="py-2 px-4 border-b text-right">ID</th>
              <th className="py-2 px-4 border-b text-left">Cliente</th>
              <th className="py-2 px-4 border-b text-left">Mét. Envío</th>
              <th className="py-2 px-4 border-b text-left">Fecha</th>
              <th className="py-2 px-4 border-b text-right">Monto</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.InvoiceID} className="border-y-2 border-zinc-600 hover:bg-zinc-700" onClick={() => handleRowClick(invoice.InvoiceID)}>
                <td className="py-2 px-4 border-b text-right">{invoice.InvoiceID}</td>
                <td className="py-2 px-4 border-b text-left">{invoice.CustomerName}</td>
                <td className="py-2 px-4 border-b text-left">{invoice.DeliveryMethodName}</td>
                <td className="py-2 px-4 border-b text-left">{invoice.InvoiceDate}</td>
                <td className="py-2 px-4 border-b text-right">{invoice.TotalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <div className="flex justify-center mt-4">
          <button
            className="p-2 mx-1 bg-sky-500 font-medium rounded-xl text-black hover:bg-sky-400
              disabled:opacity-50"
            onClick={() => {
              setPage((previous) => previous - 1);
              fetchInvoices(false);
            }}
            disabled={page === 1}
          >
            <LuChevronLeft className="w-6 h-6" />
          </button>
          <span className="px-4 py-2 mx-1 font-medium rounded-xl text-white">
            Página {page} de {maxPage}
          </span>
          <button
            className="p-2 mx-1 bg-sky-500 font-medium rounded-xl text-black hover:bg-sky-400
              disabled:opacity-50"
            onClick={() => {
              setPage((previous) => previous + 1);
              fetchInvoices(false);
            }}
            disabled={page === maxPage}
          >
            <LuChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {selectedInvoice && (
        <InvoiceDetailsModal invoiceID={selectedInvoice} onClose={closeModal} />
      )}

    </div>
  );
}

export default Invoices;