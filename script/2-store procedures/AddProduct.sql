CREATE OR ALTER PROCEDURE AddProduct
    @ProductName NVARCHAR(100),
    @StockGroupID INT,
    @ColorID INT,
    @SupplierID INT,
    @UnitPackageID INT,
    @OuterPackageID INT,
    @QuantityPerOuter INT,
    @Brand NVARCHAR(100),
    @Size NVARCHAR(100),
    @TaxRate DECIMAL(18, 3),
    @UnitPrice DECIMAL(18, 2),
    @RecommendedRetailPrice DECIMAL(18, 2),
    @TypicalWeightPerUnit DECIMAL(18, 3),
    @QuantityOnHand INT,
    @BinLocation NVARCHAR(10)
AS
BEGIN TRY
    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

    BEGIN TRANSACTION;

    INSERT INTO [Warehouse].[StockItems]
        ([StockItemName]
        ,[SupplierID]
        ,[ColorID]
        ,[UnitPackageID]
        ,[OuterPackageID]
        ,[Brand]
        ,[Size]
        ,[LeadTimeDays]
        ,[QuantityPerOuter]
        ,[IsChillerStock]
        ,[Barcode]
        ,[TaxRate]
        ,[UnitPrice]
        ,[RecommendedRetailPrice]
        ,[TypicalWeightPerUnit]
        ,[MarketingComments]
        ,[InternalComments]
        ,[Photo]
        ,[CustomFields]
        ,[LastEditedBy])
    VALUES
        (@ProductName,
        @SupplierID,
        @ColorID,
        @UnitPackageID,
        @OuterPackageID,
        @Brand,
        @Size,
        14,
        @QuantityPerOuter,
        0,
        NULL,
        @TaxRate,
        @UnitPrice,
        @RecommendedRetailPrice,
        @TypicalWeightPerUnit,
        NULL,
        NULL,
        NULL,
        NULL,
        1);

    DECLARE @StockItemID INT;
    SET @StockItemID = (
        SELECT TOP 1 [StockItemID]
        FROM [Warehouse].[StockItems]
        WHERE [StockItemName] = @ProductName
        ORDER BY [StockItemID] DESC
    )

    INSERT INTO [Warehouse].[StockItemHoldings]
        ([StockItemID]
        ,[QuantityOnHand]
        ,[BinLocation]
        ,[LastStocktakeQuantity]
        ,[LastCostPrice]
        ,[ReorderLevel]
        ,[TargetStockLevel]
        ,[LastEditedBy]
        ,[LastEditedWhen])
    VALUES
        (@StockItemID,
        @QuantityOnHand,
        @BinLocation,
        0,
        @UnitPrice,
        10,
        100,
        1,
        GETDATE());

    INSERT INTO [Warehouse].[StockItemStockGroups]
        ([StockItemID]
        ,[StockGroupID]
        ,[LastEditedBy]
        ,[LastEditedWhen])
    VALUES
        (@StockItemID,
        @StockGroupID,
        1,
        GETDATE());

    SELECT @StockItemID AS StockItemID;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    THROW;
END CATCH;