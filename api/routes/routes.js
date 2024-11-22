import { Router } from 'express';
import { addProduct, checkLogin, deleteProduct, getAllCustomers, getAllInvoices, getAllProducts, getAllSuppliers, 
    getCustomerDetails, getInvoiceDetails, getMinMaxAvgCustomer, getMinMaxAvgSupplier, 
    getProductDetails, getProductOptions, getSupplierDetails, getTopCustomers, getTopProducts, getTopSuppliers, updateProduct 
} from '../controllers/controllers.js';

const router = Router();

router.post('/login', checkLogin);

router.get('/customers', getAllCustomers);

router.get('/customers/:id', getCustomerDetails);

router.get('/suppliers', getAllSuppliers);

router.get('/suppliers/:id', getSupplierDetails);

router.get('/invoices', getAllInvoices);

router.get('/invoices/:id', getInvoiceDetails);

router.get('/products', getAllProducts);

router.get('/products/:id', getProductDetails);

router.get('/productoptions', getProductOptions);

router.post('/products', addProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);

router.get('/statistics/minmaxavg', getMinMaxAvgSupplier);

router.get('/statistics/minmaxavgcustomer', getMinMaxAvgCustomer);

router.get('/statistics/topproducts', getTopProducts);

router.get('/statistics/topcustomers', getTopCustomers);

router.get('/statistics/topsuppliers', getTopSuppliers);

export default router;