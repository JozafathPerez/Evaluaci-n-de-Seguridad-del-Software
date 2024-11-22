CREATE OR ALTER VIEW Website.PurchasesView AS
SELECT
    p.PurchaseOrderID,
    s.SupplierID,
    s.SupplierName,
    p.OrderDate,
    CAST((SELECT SUM(pl.OrderedOuters * pl.ExpectedUnitPricePerOuter)
        FROM Purchasing.PurchaseOrderLines AS pl
        WHERE p.PurchaseOrderID = pl.PurchaseOrderID)
        AS DECIMAL(18, 2))
        AS TotalAmount
FROM Purchasing.PurchaseOrders AS p
    INNER JOIN Purchasing.Suppliers AS s
        ON p.SupplierID = s.SupplierID