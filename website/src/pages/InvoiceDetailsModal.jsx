import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerDetailsModal from './CustomerDetailsModal';
import 'leaflet/dist/leaflet.css';
import ProductDetailsModal from './ProductDetailsModal';
import { useAuth } from '../context/AuthContext';

const InvoiceDetailsModal = ({ invoiceID, onClose }) => {
  const [invoice, setInvoice] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:3000/invoices/' + invoiceID,
          params: {
            serverInfo: userInfo.Location
          }
        });
        setInvoice(response.data);
      } catch (error) {
        if (error.response) {
          console.error(`Error fetching invoice (${error.response.status}): \n${error.response.data.message}`);
        } else {
          console.error('Error fetching invoice:', error);
        }
      }
    };

    fetchInvoice();
  }, [invoiceID]);

  if (!invoice) {
    console.error('Invoice not found');
    return;
  }

  const handleBackgroundClick = (e) => {
    if (e.target.id === 'invoice-modal-bg') {
      onClose();
    }
  };

  const openCustomer = () => {
    setSelectedCustomer(invoice.CustomerID);
  };

  const closeCustomerModal = () => {
    setSelectedCustomer(null);
  };

  const openProduct = (productID) => {
    setSelectedProduct(productID);
  }

  const closeProductModal = () => {
    setSelectedProduct(null);
  }

  return (
    <div id="invoice-modal-bg" 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}>
      <div className="bg-zinc-800 p-6 pt-0 rounded-lg shadow-lg w-4/5 h-5/6 overflow-y-auto max-w-2xl">
        <div className="w-full flex sticky top-0 justify-between items-center
          p-4 mb-4 bg-zinc-800 border-b-2 border-b-sky-500">
          <h2 className="p-2 text-xl font-bold">Detalles de venta</h2>
          <button
            className="p-2 font-extrabold text-2xl rounded-xl text-zinc-200 text"
            onClick={onClose}
          >&times;</button>
        </div>
        <div className='flex-row space-y-4'>
          <p><strong>Factura:</strong> {invoice.InvoiceID}</p>
          <p><strong>Cliente:</strong> <span className="cursor-pointer text-sky-500" onClick={openCustomer}>
            {invoice.CustomerName}</span></p>
          <p ><strong>ID del Cliente:</strong> {invoice.CustomerID}</p>
          <p><strong>Método de Entrega:</strong> {invoice.DeliveryMethodName}</p>
          <p><strong>Número de Orden de Compra:</strong> {invoice.CustomerPurchaseOrderNumber}</p>
          <p><strong>Persona de Contacto:</strong> {invoice.ContactPerson}</p>
          <p><strong>Vendedor:</strong> {invoice.Salesperson}</p>
          <p><strong>Fecha de la Factura:</strong> {invoice.InvoiceDate}</p>
          <p><strong>Instrucciones de Entrega:</strong> {invoice.DeliveryInstructions}</p>
          <p><strong>Total:</strong> {invoice.TotalAmount}</p>
          <hr className='border-1 border-sky-500' />
          {/* table */}
          <h3 className="text-xl font-bold">Líneas de Factura:</h3>
          <div className="flex-grow overflow-y-auto">
            <table className="min-w-full">
              <thead className="top-0 bg-sky-700 text-white">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Producto</th>
                  <th className="py-2 px-4 border-b text-left">Cantidad</th>
                  <th className="py-2 px-4 border-b text-left">Precio</th>
                  <th className="py-2 px-4 border-b text-left">Impuesto</th>
                  <th className="py-2 px-4 border-b text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.Lines.map((line, index) => (
                  <tr className="border-y-2 border-zinc-600 hover:bg-zinc-700"
                    onClick={() => openProduct(line.StockItemID)}
                    key={index}>
                    <td className="py-2 px-4 border-b text-left">{line.StockItemName}</td>
                    <td className="py-2 px-4 border-b text-left">{line.Quantity}</td>
                    <td className="py-2 px-4 border-b text-left">${line.UnitPrice}</td>
                    <td className="py-2 px-4 border-b text-left">{line.TaxRate}%</td>
                    <td className="py-2 px-4 border-b text-left">${line.ExtendedPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedCustomer && (
        <CustomerDetailsModal customerID={selectedCustomer} onClose={closeCustomerModal} />
      )}
      {selectedProduct && (
        <ProductDetailsModal productID={selectedProduct} onClose={closeProductModal} />
      )}
    </div>
  );
};

export default InvoiceDetailsModal;