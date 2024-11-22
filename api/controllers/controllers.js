import { response } from 'express';
import { getConnection, getServerByLocation } from '../database/connection.js';
import sql from 'mssql';

// CUSTOMERS
export const getAllCustomers = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const customerName = req.query.customerName || '';
        const category = req.query.category || '';
        const deliveryMethod = req.query.deliveryMethod || '';

        request.input('CustomerName', sql.VarChar(50), customerName);
        request.input('Category', sql.VarChar(50), category);
        request.input('DeliveryMethod', sql.VarChar(50), deliveryMethod);

        const result = await request.execute('GetAllCustomers');

        return res.json(result.recordset);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const getCustomerDetails = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const { id } = req.params;

        request.input('CustomerID', sql.Int, id);

        const result = await request.execute('GetCustomerDetails');

        return res.json(result.recordset[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const getAllSuppliers = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const supplierName = req.query.supplierName || '';
        const category = req.query.category || '';
        const deliveryMethod = req.query.deliveryMethod || '';

        request.input('SupplierName', sql.VarChar(50), supplierName);
        request.input('Category', sql.VarChar(50), category);
        request.input('DeliveryMethod', sql.VarChar(50), deliveryMethod);

        const result = await request.execute('GetAllSuppliers');

        return res.json(result.recordset);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const getSupplierDetails = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const { id } = req.params;

        request.input('SupplierID', sql.Int, id);

        const result = await request.execute('GetSupplierDetails');

        return res.json(result.recordset[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const getAllInvoices = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const customerName = req.query.customerName || '';
        const minDate = req.query.minDate || null;
        const maxDate = req.query.maxDate || null;
        const minAmount = req.query.minAmount || null;
        const maxAmount = req.query.maxAmount || null;
        const pageNumber = req.query.pageNumber || 1;

        request.input('CustomerName', sql.VarChar(50), customerName);
        request.input('MinDate', sql.Date, minDate);
        request.input('MaxDate', sql.Date, maxDate);
        request.input('MinAmount', sql.Decimal(18, 2), minAmount);
        request.input('MaxAmount', sql.Decimal(18, 2), maxAmount);
        request.input('PageNumber', sql.Int, pageNumber);

        const result = await request.execute('GetAllInvoices');

        const totalPages = result.recordsets[0][0].TotalPages;
        const invoices = result.recordsets[1];

        return res.json({ invoices, totalPages });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const getInvoiceDetails = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const { id } = req.params;

        request.input('InvoiceID', sql.Int, id);

        const result = await request.execute('GetInvoiceDetails');
        const lines = await request.execute('GetInvoiceLines');

        result.recordset[0].Lines = lines.recordset;

        return res.json(result.recordset[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const getAllProducts = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const productSearch = req.query.productName || '';
        const groupSearch = req.query.groupSearch || '';

        request.input('ProductSearch', sql.NVarChar(100), productSearch);
        request.input('GroupSearch', sql.NVarChar(100), groupSearch);

        const result = await request.execute('GetAllProducts');

        return res.json(result.recordset);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}
export const getProductDetails = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const { id } = req.params;

        request.input('ProductID', sql.Int, id);

        const result = await request.execute('GetProductDetails');

        return res.json(result.recordset[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const getProductOptions = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const result = await request.execute('GetProductOptions');

        const suppliers = result.recordsets[0];
        const colors = result.recordsets[1];
        const packageTypes = result.recordsets[2];
        const stockGroups = result.recordsets[3];

        return res.json({ suppliers, colors, packageTypes, stockGroups });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const addProduct = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const {
            productName, 
            stockGroup, 
            color, 
            supplier, 
            unitPackage, 
            outerPackage, 
            quantityPerOuter, 
            brand, 
            size, 
            taxRate, 
            unitPrice, 
            recommendedRetailPrice, 
            typicalWeight,
            quantityOnHand,
            binLocation
        } = req.body;

        request.input('ProductName', sql.NVarChar(100), productName);
        request.input('StockGroupID', sql.Int, stockGroup);
        request.input('ColorID', sql.Int, color || null);
        request.input('SupplierID', sql.Int, supplier);
        request.input('UnitPackageID', sql.Int, unitPackage);
        request.input('OuterPackageID', sql.Int, outerPackage);
        request.input('QuantityPerOuter', sql.Int, quantityPerOuter);
        request.input('Brand', sql.NVarChar(100), brand);
        request.input('Size', sql.NVarChar(100), size);
        request.input('TaxRate', sql.Decimal(18, 3), taxRate);
        request.input('UnitPrice', sql.Decimal(18, 2), unitPrice);
        request.input('RecommendedRetailPrice', sql.Decimal(18, 2), recommendedRetailPrice);
        request.input('TypicalWeightPerUnit', sql.Decimal(18, 3), typicalWeight);
        request.input('QuantityOnHand', sql.Int, quantityOnHand);
        request.input('BinLocation', sql.NVarChar(10), binLocation);

        const result = await request.execute('AddProduct');

        return res.status(200).json(result.recordset[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const updateProduct = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();
        
        const { id } = req.params;

        const {
            productName,
            color, 
            supplier, 
            unitPackage, 
            outerPackage, 
            quantityPerOuter, 
            brand, 
            size, 
            taxRate, 
            unitPrice, 
            recommendedRetailPrice, 
            typicalWeight,
            quantityOnHand,
            binLocation
        } = req.body;

        request.input('StockItemID', sql.Int, id);
        request.input('ProductName', sql.NVarChar(100), productName);
        request.input('ColorID', sql.Int, color || null);
        request.input('SupplierID', sql.Int, supplier);
        request.input('UnitPackageID', sql.Int, unitPackage);
        request.input('OuterPackageID', sql.Int, outerPackage);
        request.input('QuantityPerOuter', sql.Int, quantityPerOuter);
        request.input('Brand', sql.NVarChar(100), brand || null);
        request.input('Size', sql.NVarChar(100), size || null);
        request.input('TaxRate', sql.Decimal(18, 3), taxRate);
        request.input('UnitPrice', sql.Decimal(18, 2), unitPrice);
        request.input('RecommendedRetailPrice', sql.Decimal(18, 2), recommendedRetailPrice);
        request.input('TypicalWeightPerUnit', sql.Decimal(18, 3), typicalWeight);
        request.input('QuantityOnHand', sql.Int, quantityOnHand);
        request.input('BinLocation', sql.NVarChar(10), binLocation);

        const result = await request.execute('UpdateProduct');

        return res.status(200).json(result.recordset[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const deleteProduct = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const { id } = req.params;

        request.input('StockItemID', sql.Int, id);

        const result = await request.execute('DeleteProduct');

        return res.status(200).json(result.recordset[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const getMinMaxAvgSupplier = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const categorySearch = req.query.categorySearch || null;
        const supplierSearch = req.query.supplierSearch || null;

        request.input('CategorySearch', sql.NVarChar(100), categorySearch);
        request.input('SupplierSearch', sql.NVarChar(100), supplierSearch);

        const result = await request.execute('GetMaxMinAvgSuppliers');

        return res.json(result.recordset);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const getMinMaxAvgCustomer = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const categorySearch = req.query.categorySearch || null;
        const customerSearch = req.query.customerSearch || null;

        request.input('CategorySearch', sql.NVarChar(100), categorySearch);
        request.input('CustomerSearch', sql.NVarChar(100), customerSearch);

        const result = await request.execute('GetMaxMinAvgCustomerSales');

        return res.json(result.recordset);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const getTopProducts = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const {
            minYear,
            maxYear
        } = req.query;

        request.input('MinYear', sql.Int, minYear || 2000);
        request.input('MaxYear', sql.Int, maxYear || 2100);

        const result = await request.execute('GetTopProductsByYear');

        return res.json(result.recordset);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const getTopCustomers = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const {
            minYear,
            maxYear
        } = req.query;

        request.input('MinYear', sql.Int, minYear || 2000);
        request.input('MaxYear', sql.Int, maxYear || 2100);

        const result = await request.execute('GetTopCustomersByYear');

        return res.json(result.recordset);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const getTopSuppliers = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation(req.query.serverInfo);
        pool = await getConnection(server);
        const request = await pool.request();

        const {
            minYear,
            maxYear
        } = req.query;

        request.input('MinYear', sql.Int, minYear || 2000);
        request.input('MaxYear', sql.Int, maxYear || 2100);

        const result = await request.execute('GetTopSuppliersByYear');

        return res.json(result.recordset);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } finally {
        if (pool) await pool.close();
    }
}

export const checkLogin = async (req, res) => {
    let pool;
    try {
        const server = getServerByLocation('Limon');
        pool = await getConnection(server);
        const request = await pool.request();

        const { username, password } = req.body;

        request.input('Username', sql.NVarChar(50), username);
        request.input('Password', sql.NVarChar(50), password);

        const result = await request.execute('Authenticate');

        return res.json(result.recordset[0]);
    } catch (error) {
        if (error.number == 51000) {
            return res.status(401).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });    
    } finally {
        if (pool) await pool.close();
    }
}