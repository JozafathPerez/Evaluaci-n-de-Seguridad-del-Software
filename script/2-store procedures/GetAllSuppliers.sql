CREATE OR ALTER PROCEDURE GetAllSuppliers (
    @SupplierName NVARCHAR(100),
    @Category NVARCHAR(50),
    @DeliveryMethod NVARCHAR(50)
)
AS
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT
        SupplierID,
        SupplierName,
        SupplierCategoryName,
        DeliveryMethodName
    FROM Website.SuppliersView
    WHERE
        (@SupplierName = NULL
            OR SupplierName LIKE '%' + @SupplierName + '%') AND 
        (@Category = NULL
            OR SupplierCategoryName LIKE '%' + @Category + '%') AND
        (@DeliveryMethod = NULL
            OR DeliveryMethodName LIKE '%' + @DeliveryMethod + '%')
    ORDER BY SupplierName ASC;