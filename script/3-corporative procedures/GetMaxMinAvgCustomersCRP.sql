CREATE OR ALTER PROCEDURE GetMaxMinAvgCustomerSales
    @CategorySearch NVARCHAR(100) = NULL,
    @CustomerSearch NVARCHAR(100) = NULL
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT
        ISNULL(c.CustomerCategoryName, 'Gran Total') AS CustomerCategoryName,
        CASE 
            WHEN c.CustomerCategoryName IS NULL AND c.CustomerName IS NULL THEN NULL
            ELSE ISNULL(c.CustomerName, 'Sub Total')
        END AS CustomerName,
        CAST(MAX(i.TotalAmount) AS DECIMAL(18,2)) AS MaxAmount,
        CAST(MIN(i.TotalAmount) AS DECIMAL(18,2)) AS MinAmount,
        CAST(AVG(i.TotalAmount) AS DECIMAL(18,2)) AS AvgAmount
    FROM (
        SELECT 
            CustomerID,
            CustomerName,
            CustomerCategoryName,
            BuyingGroupName,
            PrimaryContactPerson,
            AlternateContactPerson,
            BillToCustomerID,
            BillToCustomerName,
            DeliveryMethodName,
            DeliveryCityName,
            DeliveryPostalCode,
            PhoneNumber,
            FaxNumber,
            PaymentDays,
            WebsiteURL,
            DeliveryAddressLine1,
            DeliveryAddressLine2,
            PostalPostalCode
        FROM OPENQUERY(Limon_WWI, 'SELECT * FROM [WideWorldImporters_LM].[Website].[CustomersView]')
        UNION
        SELECT 
            CustomerID,
            CustomerName,
            CustomerCategoryName,
            BuyingGroupName,
            PrimaryContactPerson,
            AlternateContactPerson,
            BillToCustomerID,
            BillToCustomerName,
            DeliveryMethodName,
            DeliveryCityName,
            DeliveryPostalCode,
            PhoneNumber,
            FaxNumber,
            PaymentDays,
            WebsiteURL,
            DeliveryAddressLine1,
            DeliveryAddressLine2,
            PostalPostalCode
        FROM OPENQUERY(SanJose_WWI, 'SELECT * FROM [WideWorldImporters_SJ].[Website].[CustomersView]')
        ) AS c

        INNER JOIN (
            SELECT *
            FROM OPENQUERY(Limon_WWI, 'SELECT * FROM [WideWorldImporters_LM].[Website].[InvoicesView]')
            UNION
            SELECT *
            FROM OPENQUERY(SanJose_WWI, 'SELECT * FROM [WideWorldImporters_SJ].[Website].[InvoicesView]')
        ) AS i
        ON i.CustomerID = c.CustomerID
        
    WHERE
        (@CategorySearch IS NULL OR c.CustomerCategoryName LIKE '%' + @CategorySearch + '%') AND
        (@CustomerSearch IS NULL OR c.CustomerName LIKE '%' + @CustomerSearch + '%')
    GROUP BY
        ROLLUP (c.CustomerCategoryName, c.CustomerName)
    ORDER BY
        c.CustomerCategoryName,
        c.CustomerName;
END;