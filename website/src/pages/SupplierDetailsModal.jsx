import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../context/AuthContext';

const SupplierDetailsModal = ({ supplierID, onClose }) => {
  const [supplier, setSupplier] = useState(null);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:3000/suppliers/' + supplierID,
          params: {
            serverInfo: userInfo.Location
          }
        });
        setSupplier(response.data);
        console.log(response.data.DeliveryLocation);
      } catch (error) {
        if (error.response) {
          console.error(`Error fetching supplier (${error.response.status}): \n${error.response.data.message}`);
        } else {
          console.error('Error fetching supplier:', error);
        }
      }
    };

    fetchSupplier();
  }, [supplierID]);

  if (!supplier) {
    console.error('Supplier not found');
    return;
  }

  const handleBackgroundClick = (e) => {
    if (e.target.id === 'supplier-modal-bg') {
      onClose();
    }
  };

  return (
    <div id="supplier-modal-bg" 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}>
      <div className="bg-zinc-800 p-6 pt-0 rounded-lg shadow-lg w-4/5 h-5/6 overflow-y-auto max-w-2xl">
        <div className="w-full flex sticky top-0 justify-between items-center
          p-4 mb-4 bg-zinc-800 border-b-2 border-b-sky-500">
          <h2 className="p-2 text-xl font-bold">Detalles del Proveedor</h2>
          <button
            className="p-2 font-extrabold text-2xl rounded-xl text-zinc-200 text"
            onClick={onClose}
          >&times;</button>
        </div>
        <div className='flex-row space-y-4'>
          <p><strong>ID:</strong> {supplier.SupplierID}</p>
          <p><strong>Nombre:</strong> {supplier.SupplierName}</p>
          <p><strong>Categoría:</strong> {supplier.SupplierCategoryName}</p>
          <p><strong>Contacto Principal:</strong> {supplier.PrimaryContactPerson}</p>
          <p><strong>Teléfono del Contacto Principal:</strong> {supplier.PrimaryContactPhone}</p>
          <p><strong>Email del Contacto Principal:</strong> {supplier.PrimaryContactEmail}</p>
          <p><strong>Contacto Alternativo:</strong> {supplier.AlternateContactPerson}</p>
          <p><strong>Email del Contacto Alternativo:</strong> {supplier.AlternateContactEmail}</p>
          <p><strong>Teléfono del Contacto Alternativo:</strong> {supplier.AlternateContactPhone}</p>
          <p><strong>Método de Entrega:</strong> {supplier.DeliveryMethodName}</p>
          <p><strong>Ciudad de Entrega:</strong> {supplier.DeliveryCityName}</p>
          <p><strong>Código Postal de Entrega:</strong> {supplier.DeliveryPostalCode}</p>
          <p><strong>Número de Teléfono:</strong> {supplier.PhoneNumber}</p>
          <p><strong>Número de Fax:</strong> {supplier.FaxNumber}</p>
          <p><strong>URL del Sitio Web:</strong> <a className='text-sky-400' href={supplier.WebsiteURL} target="_blank" rel="noopener noreferrer">{supplier.WebsiteURL}</a></p>
          <p><strong>Dirección de Entrega Línea 1:</strong> {supplier.DeliveryAddressLine1}</p>
          <p><strong>Dirección de Entrega Línea 2:</strong> {supplier.DeliveryAddressLine2}</p>
          <p><strong>Sucursal de la Cuenta Bancaria:</strong> {supplier.BankAccountBranch}</p>
          <p><strong>Nombre de la Cuenta Bancaria:</strong> {supplier.BankAccountName}</p>
          <p><strong>Días de Pago:</strong> {supplier.PaymentDays}</p>
          <MapContainer
            className="bg-red-500 h-64 w-full rounded-xl"
            center={[supplier.DeliveryLocation.points[0].x, supplier.DeliveryLocation.points[0].y]} 
            zoom={16} 
            scrollWheelZoom={false} >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[supplier.DeliveryLocation.points[0].x, supplier.DeliveryLocation.points[0].y]}>
              <Popup>
                Ubicación del proveedor
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailsModal;