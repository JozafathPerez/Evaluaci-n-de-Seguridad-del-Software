CREATE OR ALTER PROCEDURE GetAllProducts
    @ProductSearch nvarchar(100),
    @GroupSearch nvarchar(100)
AS
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT
        StockItemID,
        StockItemName,
        StockGroups,
        QuantityOnHand
    FROM Website.InventoryView
    WHERE
        (@ProductSearch IS NULL
            OR StockItemName LIKE '%' + @ProductSearch + '%') AND
        (@GroupSearch IS NULL
            OR StockGroups LIKE '%' + @GroupSearch + '%') AND
        Deleted = 0
    ORDER BY StockItemName ASC;