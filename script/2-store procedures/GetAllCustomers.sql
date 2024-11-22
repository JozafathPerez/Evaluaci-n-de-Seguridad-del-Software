CREATE OR ALTER PROCEDURE GetAllCustomers
    @CustomerName NVARCHAR(100),
    @Category NVARCHAR(50),
    @DeliveryMethod NVARCHAR(50)
AS
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

    SELECT
        CustomerID,
        CustomerName,
        CustomerCategoryName,
        DeliveryMethodName
    FROM Website.CustomersView
    WHERE
        (@CustomerName = NULL
            OR CustomerName LIKE '%' + @CustomerName + '%') AND 
        (@Category = NULL
            OR CustomerCategoryName LIKE '%' + @Category + '%') AND
        (@DeliveryMethod = NULL
            OR DeliveryMethodName LIKE '%' + @DeliveryMethod + '%')
    ORDER BY CustomerName ASC;