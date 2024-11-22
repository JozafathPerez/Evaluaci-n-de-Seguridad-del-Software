CREATE OR ALTER VIEW Website.InvoiceLinesView AS
SELECT
    il.InvoiceID,
    si.StockItemID,
    si.StockItemName,
    il.Quantity,
    CAST(il.UnitPrice AS DECIMAL(18, 2)) AS UnitPrice,
    CAST(il.TaxRate AS DECIMAL(18, 2)) AS TaxRate,
    CAST(il.TaxAmount AS DECIMAL(18, 2)) AS TaxAmount,
    CAST(il.ExtendedPrice AS DECIMAL(18, 2)) AS ExtendedPrice
FROM Sales.InvoiceLines AS il
    INNER JOIN Warehouse.StockItems AS si
        ON il.StockItemID = si.StockItemID