CREATE OR ALTER PROCEDURE GetMaxMinAvgSuppliers
    @CategorySearch NVARCHAR(100) = NULL,
    @SupplierSearch NVARCHAR(100) = NULL
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT
        s.SupplierCategoryName,
        s.SupplierName,
        CAST(MIN(stl.OrderedOuters * stl.ExpectedUnitPricePerOuter) AS DECIMAL(18,2)) AS MinAmount,
        CAST(MAX(stl.OrderedOuters * stl.ExpectedUnitPricePerOuter) AS DECIMAL(18,2)) AS MaxAmount,
        CAST(AVG(stl.OrderedOuters * stl.ExpectedUnitPricePerOuter) AS DECIMAL(18,2)) AS AvgAmount
    FROM 
        (SELECT 
            SupplierID,
            SupplierName,
            SupplierCategoryName,
            PrimaryContactPerson,
            PrimaryContactPhone,
            PrimaryContactEmail,
            AlternateContactPerson,
            AlternateContactEmail,
            AlternateContactPhone,
            DeliveryMethodName,
            DeliveryCityName,
            DeliveryPostalCode,
            PhoneNumber,
            FaxNumber,
            WebsiteURL,
            DeliveryAddressLine1,
            DeliveryAddressLine2,
            BankAccountBranch,
            BankAccountName,
            PaymentDays
        FROM OPENQUERY(Limon_WWI, 'SELECT * FROM [WideWorldImporters_LM].[Website].[SuppliersView]')
        UNION
        SELECT 
            SupplierID,
            SupplierName,
            SupplierCategoryName,
            PrimaryContactPerson,
            PrimaryContactPhone,
            PrimaryContactEmail,
            AlternateContactPerson,
            AlternateContactEmail,
            AlternateContactPhone,
            DeliveryMethodName,
            DeliveryCityName,
            DeliveryPostalCode,
            PhoneNumber,
            FaxNumber,
            WebsiteURL,
            DeliveryAddressLine1,
            DeliveryAddressLine2,
            BankAccountBranch,
            BankAccountName,
            PaymentDays
        FROM OPENQUERY(SanJose_WWI, 'SELECT * FROM [WideWorldImporters_SJ].[Website].[SuppliersView]')
        ) AS s

        INNER JOIN 
            (SELECT *
            FROM OPENQUERY(Limon_WWI, 'SELECT * FROM [WideWorldImporters_LM].[Purchasing].[PurchaseOrders]')
            UNION
            SELECT *
            FROM OPENQUERY(SanJose_WWI, 'SELECT * FROM [WideWorldImporters_SJ].[Purchasing].[PurchaseOrders]')
            ) AS st
        ON s.SupplierID = st.SupplierID

        INNER JOIN
            (SELECT *
            FROM OPENQUERY(Limon_WWI, 'SELECT * FROM [WideWorldImporters_LM].[Purchasing].[PurchaseOrderLines]')
            UNION
            SELECT *
            FROM OPENQUERY(SanJose_WWI, 'SELECT * FROM [WideWorldImporters_SJ].[Purchasing].[PurchaseOrderLines]')
            ) AS stl
        ON st.PurchaseOrderID = stl.PurchaseOrderID

    WHERE
        (@CategorySearch IS NULL OR s.SupplierCategoryName LIKE '%' + @CategorySearch + '%') AND
        (@SupplierSearch IS NULL OR s.SupplierName LIKE '%' + @SupplierSearch + '%')
    GROUP BY
        ROLLUP (s.SupplierCategoryName, s.SupplierName)
    ORDER BY
        s.SupplierCategoryName,
        s.SupplierName
END;
