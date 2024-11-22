CREATE OR ALTER PROCEDURE GetProductDetails
    @ProductID INT
AS
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT
        StockItemID,
        StockItemName,
        StockGroups,
        ColorName,
        SupplierName,
        UnitPackage,
        OuterPackage,
        QuantityPerOuter,
        Brand,
        [Size],
        TaxRate,
        UnitPrice,
        RecommendedRetailPrice,
        TypicalWeightPerUnit,
        SearchDetails,
        QuantityOnHand,
        BinLocation,
        Deleted
    FROM Website.InventoryView
    WHERE
        StockItemID = @ProductID;