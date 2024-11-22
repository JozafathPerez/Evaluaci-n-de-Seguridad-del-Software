import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../context/AuthContext';

const ProductDetailsModal = ({ productID, onClose }) => {
  const [product, setProduct] = useState(null);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      console.log(productID);
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:3000/products/' + productID,
          params: {
            serverInfo: userInfo.Location
          }
        });
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          console.error(`Error fetching product (${error.response.status}): \n${error.response.data.message}`);
        } else {
          console.error('Error fetching product:', error);
        }
      }
    };

    fetchProduct();
  }, [productID]);

  if (!product) {
    console.error('Product not found');
    return;
  }

  const handleBackgroundClick = (e) => {
    if (e.target.id === 'product-modal-bg') {
      onClose();
    }
  };

  return (
    <div id="product-modal-bg" 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}>
      <div className="bg-zinc-800 p-6 pt-0 rounded-lg shadow-lg w-4/5 h-5/6 overflow-y-auto max-w-2xl">
        <div className="w-full flex sticky top-0 justify-between items-center
          p-4 mb-4 bg-zinc-800 border-b-2 border-b-sky-500">
          <h2 className="p-2 text-xl font-bold">Detalles de producto</h2>
          <button
            className="p-2 font-extrabold text-2xl rounded-xl text-zinc-200 text"
            onClick={onClose}
          >&times;</button>
        </div>
        <div className='flex-row space-y-4'>
          {product.Deleted === true && (
            <div className="p-4 mb-4 text-sm text-red-400 bg-red-950 rounded-lg" bg- role="alert">
              <span className="font-medium">Este producto ha sido eliminado.</span>
            </div>
          )}
          <p><strong>ID:</strong> {product.StockItemID}</p>
          <p><strong>Nombre:</strong> {product.StockItemName}</p>
          <p><strong>Grupo de Stock:</strong> {product.StockGroups}</p>
          <p><strong>Color:</strong> {product.ColorName}</p>
          <p><strong>Proveedor:</strong> {product.SupplierName}</p>
          <p><strong>Paquete de Unidad:</strong> {product.UnitPackage}</p>
          <p><strong>Paquete Exterior:</strong> {product.OuterPackage}</p>
          <p><strong>Cantidad por Paquete Exterior:</strong> {product.QuantityPerOuter}</p>
          <p><strong>Marca:</strong> {product.Brand}</p>
          <p><strong>Tamaño:</strong> {product.Size}</p>
          <p><strong>Tasa de Impuesto:</strong> {product.TaxRate}%</p>
          <p><strong>Precio por Unidad:</strong> ${product.UnitPrice}</p>
          <p><strong>Precio de Venta Sugerido:</strong> ${product.RecommendedRetailPrice}</p>
          <p><strong>Peso Típico por Unidad:</strong> {product.TypicalWeightPerUnit} kg</p>
          <p><strong>Detalles de Búsqueda:</strong> {product.SearchDetails}</p>
          <p><strong>Cantidad en Mano:</strong> {product.QuantityOnHand}</p>
          <p><strong>Ubicación en Almacén:</strong> {product.BinLocation}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;