CREATE OR ALTER PROCEDURE UpdateProduct
    @StockItemID INT,
    @ProductName NVARCHAR(100),
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
    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

    BEGIN TRANSACTION;
    UPDATE [Warehouse].[StockItems]
    SET [StockItemName] = @ProductName,
        [SupplierID] = @SupplierID,
        [ColorID] = @ColorID,
        [UnitPackageID] = @UnitPackageID,
        [OuterPackageID] = @OuterPackageID,
        [Brand] = @Brand,
        [Size] = @Size,
        [QuantityPerOuter] = @QuantityPerOuter,
        [TaxRate] = @TaxRate,
        [UnitPrice] = @UnitPrice,
        [RecommendedRetailPrice] = @RecommendedRetailPrice,
        [TypicalWeightPerUnit] = @TypicalWeightPerUnit,
        [LastEditedBy] = 1
    WHERE [StockItemID] = @StockItemID;

    IF NOT EXISTS (SELECT 1 FROM [Warehouse].[StockItemHoldings] WHERE [StockItemID] = @StockItemID)
    BEGIN
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
    END
    ELSE
    BEGIN
        UPDATE [Warehouse].[StockItemHoldings]
        SET [QuantityOnHand] = @QuantityOnHand,
            [BinLocation] = @BinLocation,
            [LastCostPrice] = @UnitPrice,
            [LastEditedBy] = 1
        WHERE [StockItemID] = @StockItemID;
    END

    SELECT @StockItemID AS StockItemID;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    THROW;
END CATCH;