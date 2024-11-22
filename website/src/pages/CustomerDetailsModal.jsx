import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../context/AuthContext';

const CustomerDetailsModal = ({ customerID, onClose }) => {
  const [customer, setCustomer] = useState(null);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:3000/customers/' + customerID,
          params: {
            serverInfo: userInfo.Location
          }
        });
        setCustomer(response.data);
        console.log(response.data.DeliveryLocation);
      } catch (error) {
        if (error.response) {
          console.error(`Error fetching customer (${error.response.status}): \n${error.response.data.message}`);
        } else {
          console.error('Error fetching customer:', error);
        }
      }
    };

    fetchCustomer();
  }, [customerID]);

  if (!customer) {
    console.error('Customer not found');
    return;
  }

  const handleBackgroundClick = (e) => {
    if (e.target.id === 'costumer-modal-bg') {
      onClose();
    }
  };

  return (
    <div id="costumer-modal-bg" 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}>
      <div className="bg-zinc-800 p-6 pt-0 rounded-lg shadow-lg w-4/5 h-5/6 overflow-y-auto max-w-2xl">
        <div className="w-full flex sticky top-0 justify-between items-center
          p-4 mb-4 bg-zinc-800 border-b-2 border-b-sky-500">
          <h2 className="p-2 text-xl font-bold">Detalles del Cliente</h2>
          <button
            className="p-2 font-extrabold text-2xl rounded-xl text-zinc-200 text"
            onClick={onClose}
          >&times;</button>
        </div>
        <div className='flex-row space-y-4'>
          <p><strong>ID:</strong> {customer.CustomerID}</p>
          <p><strong>Nombre:</strong> {customer.CustomerName}</p>
          <p><strong>Categoría:</strong> {customer.CustomerCategoryName}</p>
          <p><strong>Método de Entrega:</strong> {customer.DeliveryMethodName}</p>
          <p><strong>Grupo de Compra:</strong> {customer.BuyingGroupName}</p>
          <p><strong>Contacto Principal:</strong> {customer.PrimaryContactPerson}</p>
          <p><strong>Contacto Alternativo:</strong> {customer.AlternateContactPerson}</p>
          <p><strong>ID del Cliente de Facturación:</strong> {customer.BillToCustomerID}</p>
          <p><strong>Nombre del Cliente de Facturación:</strong> {customer.BillToCustomerName}</p>
          <p><strong>Ciudad de Entrega:</strong> {customer.DeliveryCityName}</p>
          <p><strong>Código Postal de Entrega:</strong> {customer.DeliveryPostalCode}</p>
          <p><strong>Número de Teléfono:</strong> {customer.PhoneNumber}</p>
          <p><strong>Número de Fax:</strong> {customer.FaxNumber}</p>
          <p><strong>Días de Pago:</strong> {customer.PaymentDays}</p>
          <p><strong>URL del Sitio Web:</strong> <a className='text-sky-400' href={customer.WebsiteURL} target="_blank" rel="noopener noreferrer">{customer.WebsiteURL}</a></p>
          <p><strong>Dirección de Entrega Línea 1:</strong> {customer.DeliveryAddressLine1}</p>
          <p><strong>Dirección de Entrega Línea 2:</strong> {customer.DeliveryAddressLine2}</p>
          <p><strong>Código Postal:</strong> {customer.PostalPostalCode}</p>
          <MapContainer
            className="bg-red-500 h-64 w-full rounded-xl"
            center={[customer.DeliveryLocation.points[0].x, customer.DeliveryLocation.points[0].y]} 
            zoom={16} 
            scrollWheelZoom={false} >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[customer.DeliveryLocation.points[0].x, customer.DeliveryLocation.points[0].y]}>
              <Popup>
                Ubicación del cliente
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;