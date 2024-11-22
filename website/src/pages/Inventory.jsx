import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetailsModal from './ProductDetailsModal';
import { LuClipboardEdit, LuDelete, LuPackagePlus, LuTrash } from 'react-icons/lu';
import ProductCreateModal from './ProductCreateModal';
import ProductEditModal from './ProductEditModal';
import { useAuth } from '../context/AuthContext';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [createProduct, setCreateProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const { userInfo } = useAuth();

  const fetchProducts = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:3000/products',
        params: {
          serverInfo: userInfo.Location,
          productName: document.getElementById('product-name').value || null,
          groupSearch: document.getElementById('group-search').value || null
        }
      });
      setProducts(response.data);
    } catch (error) {
      if (error.response) {
        console.error(`Error fetching products (${error.response.status}): \n${error.response.data.message}`);
      } else {
        console.error('Error fetching products:', error);
      }
    }
  };

  const resetAllFilters = () => {
    document.getElementById('product-name').value = '';
    document.getElementById('group-search').value = '';
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const createProductModal = () => {
    setCreateProduct(true);
  }

  const closeCreateProductModal = () => {
    setCreateProduct(false);
    fetchProducts();
  }

  const openEditProductModal = (productID) => {
    setEditProduct(productID);
  }

  const closeEditProductModal = () => {
    setEditProduct(null);
    fetchProducts();
  }

  const deleteProduct = async (productID) => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: 'http://localhost:3000/products/' + productID,
        params: {
          serverInfo: userInfo.Location
        }
      });
      console.log(response.data);
      fetchProducts();
    } catch (error) {
      if (error.response) {
        console.error(`Error deleting product (${error.response.status}): \n${error.response.data.message}`);
      } else {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Módulo de inventario</h1>

      <div className="mb-4 flex space-x-4">
        <div className='flex-auto'>
          <label htmlFor="product-name"
            className="block text-sm font-medium text-zinc-300"
          >Nombre del producto
          </label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            autoComplete='off'
            onChange={fetchProducts}
            placeholder='Ingrese un nombre de producto'
          />
        </div>
        <div className='flex-auto'>
          <label htmlFor="group-search"
            className="block text-sm font-medium text-zinc-300"
          >Grupo de producto
          </label>
          <input
            type="text"
            id="group-search"
            name="group-search"
            className="w-full bg-zinc-700 border border-zinc-500 rounded-xl h-9 px-2
              focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            autoComplete='off'
            onChange={fetchProducts}
            placeholder='Ingrese una agrupación'
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
              <th className="py-2 px-4 border-b text-left">Producto</th>
              <th className="py-2 px-4 border-b text-left">Grupos</th>
              <th className="py-2 px-4 border-b text-right">Cantidad</th>
              <th className="py-2 px-4 border-b text-right"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.StockItemID} className="border-y-2 border-zinc-600 hover:bg-zinc-700" onClick={() => handleRowClick(product.StockItemID)}>
                <td className="py-2 px-4 border-b text-right">{product.StockItemID}</td>
                <td className="py-2 px-4 border-b text-left">{product.StockItemName}</td>
                <td className="py-2 px-4 border-b text-left">{product.StockGroups}</td>
                <td className="py-2 px-4 border-b text-right">{product.QuantityOnHand}</td>
                <td className="py-2 px-1 border-b text-right space-y-1 w-20">
                  <button
                    className="p-1 bg-sky-500 rounded-xl text-white hover:bg-sky-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditProductModal(product.StockItemID);
                    }}
                  ><LuClipboardEdit className='inline-block text-lg'></LuClipboardEdit> </button>
                  <button
                    className="p-1 bg-red-700 rounded-xl text-white hover:bg-red-600 ml-2"
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (confirm('¿Está seguro que desea eliminar este producto?')) {
                        await deleteProduct(product.StockItemID);
                      }
                    }}
                  ><LuTrash className='inline-block text-lg'></LuTrash> </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fixed bottom-6 right-6">
        <button
          className="p-3 bg-green-600 rounded-xl text-white hover:bg-green-500"
          onClick={() => createProductModal()}
        >
          <LuPackagePlus className="inline-block text-3xl" />
        </button>
      </div>

      {selectedProduct && (
        <ProductDetailsModal productID={selectedProduct} onClose={closeModal} />
      )}

      {createProduct && (
        <ProductCreateModal onClose={closeCreateProductModal} />
      )}

      {editProduct && (
        <ProductEditModal productID={editProduct} onClose={closeEditProductModal}></ProductEditModal>
      )}

    </div>
  );
}

export default Products;