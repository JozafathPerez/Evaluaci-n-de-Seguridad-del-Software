CREATE OR ALTER PROCEDURE DeleteProduct
    @StockItemID INT
AS
BEGIN TRY
    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

    BEGIN TRANSACTION;
    
    UPDATE [Warehouse].[StockItems]
        SET Deleted = 1
    WHERE [StockItemID] = @StockItemID;

    SELECT @StockItemID AS StockItemID;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    THROW;
END CATCH;



