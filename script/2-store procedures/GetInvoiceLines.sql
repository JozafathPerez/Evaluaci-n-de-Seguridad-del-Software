CREATE OR ALTER PROCEDURE GetInvoiceLines (
    @InvoiceID INT
)
AS
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT
        InvoiceID,
        StockItemID,
        StockItemName,
        Quantity,
        UnitPrice,
        TaxRate,
        TaxAmount,
        ExtendedPrice
    FROM Website.InvoiceLinesView
    WHERE InvoiceID = @InvoiceID;