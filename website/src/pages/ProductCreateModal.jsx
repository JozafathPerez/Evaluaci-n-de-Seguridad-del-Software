import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { LuSave } from 'react-icons/lu';
import { useAuth } from '../context/AuthContext';

const ProductCreateModal = ({ productID = null , onClose }) => {
  const [productOptions, setProductOptions] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchProductOptions = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:3000/productoptions/',
          params: {
            serverInfo: userInfo.Location
          }
        });
        setProductOptions(response.data);
      } catch (error) {
        if (error.response) {
          console.error(`Error fetching product (${error.response.status}): \n${error.response.data.message}`);
        } else {
          console.error('Error fetching product:', error);
        }
      }
    };

    fetchProductOptions();
  }, [productID]);

  const createProduct = async (e) => {
    e.preventDefault();
    const productData = validateInputs();
    if (productData) {
      try {
        const response = await axios({
          method: 'POST',
          url: 'http://localhost:3000/products/',
          data: productData,
          params: {
            serverInfo: userInfo.Location
          }
        });
        if (response.status === 200) {
          alert('Producto guardado exitosamente');
          onClose();
        }
      } catch (error) {
        if (error.response) {
          console.error(`Error updating product (${error.response.status}): \n${error.response.data.message}`);
          alert(`Error (${error.response.status}): \n${error.response.data.message}`);
        } else {
          console.error('Error updating product:', error);
        }
      }
    }
  };

  const validateInputs = () => {
    const productName = document.getElementById('product-name-input').value;
    const stockGroup = document.getElementById('stock-group').value;
    const color = document.getElementById('color').value;
    const supplier = document.getElementById('supplier').value;
    const unitPackage = document.getElementById('unit-package').value;
    const outerPackage = document.getElementById('outer-package').value;
    const quantityPerOuter = document.getElementById('quantity-per-outer').value;
    const brand = document.getElementById('brand').value;
    const size = document.getElementById('size').value;
    const taxRate = document.getElementById('tax-rate').value;
    const unitPrice = document.getElementById('unit-price').value;
    const recommendedRetailPrice = document.getElementById('recommended-retail-price').value;
    const typicalWeight = document.getElementById('typical-weight').value;
    const quantityOnHand = document.getElementById('quantity-on-hand').value;
    const binLocation = document.getElementById('bin-location').value;
    
    if (!productName || !stockGroup || !color || !supplier || !unitPackage || !outerPackage || !quantityPerOuter || !brand || !size || !taxRate || !unitPrice || !recommendedRetailPrice || !typicalWeight || !quantityOnHand || !binLocation) {
      alert('Por favor, llene todos los campos');
      return false;
    }

    return {
      productName, stockGroup, color, supplier, unitPackage, outerPackage, quantityPerOuter, brand, size, taxRate, unitPrice, recommendedRetailPrice, typicalWeight, quantityOnHand, binLocation
    }

  };

  return (
    <div id="product-modal-bg" 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-zinc-800 p-6 pt-0 rounded-lg shadow-lg w-4/5 h-5/6 overflow-y-auto max-w-2xl">
        <div 
          className="w-full flex sticky top-0 justify-between items-center
          p-4 mb-4 bg-zinc-800 border-b-2 border-b-sky-500">
          <h2 className="p-2 text-xl font-bold text-white">
            Crear un producto
          </h2>
          <button
            className="p-2 font-extrabold text-2xl rounded-xl text-white"
            onClick={onClose}
          >&times;</button>
        </div>
        <form className='flex-row space-y-4'>
          <div>
            <label htmlFor="product-name-input" className="text-white"><strong>Nombre:</strong></label>
            <input id="product-name-input" type="text" defaultValue={selectedProduct?.StockItemName || ''} 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label htmlFor="stock-group" className="text-white"><strong>Grupo de Stock:</strong></label>
            <select id="stock-group" 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500">
              {productOptions?.stockGroups?.map(group => (
                <option key={group.StockGroupID} value={group.StockGroupID}>{group.StockGroupName}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="color" className="text-white"><strong>Color:</strong></label>
            <select id="color" 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500">
              {productOptions?.colors?.map(color => (
                <option key={color.ColorID} value={color.ColorID}>{color.ColorName}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="supplier" className="text-white"><strong>Proveedor:</strong></label>
            <select id="supplier" 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500">
              {productOptions?.suppliers?.map(supplier => (
                <option key={supplier.SupplierID} value={supplier.SupplierID}>{supplier.SupplierName}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="unit-package" className="text-white"><strong>Paquete de Unidad:</strong></label>
            <select id="unit-package" 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500">
              {productOptions?.packageTypes?.map(packageType => (
                <option key={packageType.PackageTypeID} value={packageType.PackageTypeID}>{packageType.PackageTypeName}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="outer-package" className="text-white"><strong>Paquete Exterior:</strong></label>
            <select id="outer-package" 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500">
              {productOptions?.packageTypes?.map(packageType => (
                <option key={packageType.PackageTypeID} value={packageType.PackageTypeID}>{packageType.PackageTypeName}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quantity-per-outer" className="text-white"><strong>Cantidad por Paquete Exterior:</strong></label>
            <input id="quantity-per-outer" type="text" defaultValue={selectedProduct?.QuantityPerOuter || ''} 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label htmlFor="brand" className="text-white"><strong>Marca:</strong></label>
            <input id="brand" type="text" defaultValue={selectedProduct?.Brand || ''} 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label htmlFor="size" className="text-white"><strong>Tamaño:</strong></label>
            <input id="size" type="text" defaultValue={selectedProduct?.Size || ''} 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label htmlFor="tax-rate" className="text-white"><strong>Tasa de Impuesto:</strong></label>
            <input id="tax-rate" type="text" defaultValue={selectedProduct?.TaxRate || ''} 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label htmlFor="unit-price" className="text-white"><strong>Precio por Unidad:</strong></label>
            <input id="unit-price" type="text" defaultValue={selectedProduct?.UnitPrice || ''} 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label htmlFor="recommended-retail-price" className="text-white"><strong>Precio de Venta Sugerido:</strong></label>
            <input id="recommended-retail-price" type="text" defaultValue={selectedProduct?.RecommendedRetailPrice || ''} 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label htmlFor="typical-weight" className="text-white"><strong>Peso Típico por Unidad:</strong></label>
            <input id="typical-weight" type="text" defaultValue={selectedProduct?.TypicalWeightPerUnit || ''} 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label htmlFor="quantity-on-hand" className="text-white"><strong>Cantidad en Mano:</strong></label>
            <input id="quantity-on-hand" type="text" defaultValue={selectedProduct?.QuantityOnHand || ''} 
              className="w-full p-2 bg-zinc-700 border border-zinc-500 rounded-lg h-fit px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label htmlFor="bin-location" className="text-white"><strong>Ubicación en Almacén:</strong></label>
            <input id="bin-location" type="text" defaultValue={selectedProduct?.BinLocation || ''} 
              className="w-full p-2 rounded bg-zinc-700 text-white" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-sky-500 text-white p-2 rounded-xl"
              onClick={createProduct}>
              <LuSave className='inline-block'/> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCreateModal;