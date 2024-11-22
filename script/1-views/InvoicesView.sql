CREATE OR ALTER VIEW Website.InvoicesView AS
SELECT
    i.InvoiceID,
    c.CustomerName,
    c.CustomerID,
    dm.DeliveryMethodName,
    i.CustomerPurchaseOrderNumber,
    cp.FullName AS ContactPerson,
    sp.FullName AS Salesperson,
    i.InvoiceDate,
    i.DeliveryInstructions,
    CAST((SELECT SUM(il.ExtendedPrice)
        FROM Sales.InvoiceLines AS il
        WHERE il.InvoiceID = i.InvoiceID)
        AS DECIMAL(18, 2))
        AS TotalAmount
FROM Sales.Invoices AS i
    INNER JOIN Sales.Customers AS c
        ON i.CustomerID = c.CustomerID
    INNER JOIN Application.DeliveryMethods AS dm
        ON c.DeliveryMethodID = dm.DeliveryMethodID
    INNER JOIN Application.People AS cp -- contact person
        ON i.ContactPersonID = cp.PersonID
    INNER JOIN Application.People AS sp -- sales person
        ON i.SalespersonPersonID = sp.PersonID