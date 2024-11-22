-- This procedure is for getting all the options for
-- creating or editing a product.
-- It returns various lists of options for the user to choose from.
-- it will be used in the product creation and editing forms.
CREATE OR ALTER PROCEDURE GetProductOptions
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    BEGIN TRANSACTION;
    SELECT
        SupplierID,
        SupplierName
    FROM Purchasing.Suppliers
    ORDER BY SupplierName ASC;

    SELECT
        ColorID,
        ColorName
    FROM Warehouse.Colors
    ORDER BY ColorName ASC;

    SELECT
        PackageTypeID,
        PackageTypeName
    FROM Warehouse.PackageTypes
    ORDER BY PackageTypeName ASC;

    SELECT
        StockGroupID,
        StockGroupName
    FROM Warehouse.StockGroups
    ORDER BY StockGroupName ASC;
    COMMIT TRANSACTION;
END;