CREATE OR ALTER PROCEDURE GetInvoiceDetails (
    @InvoiceID INT
)
AS
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT
        InvoiceID,
        CustomerName,
        CustomerID,
        DeliveryMethodName,
        CustomerPurchaseOrderNumber,
        ContactPerson,
        Salesperson,
        FORMAT(InvoiceDate, 'dd \de MMM \del yyyy', 'es-ES') AS InvoiceDate,
        DeliveryInstructions,
        TotalAmount
    FROM Website.InvoicesView
    WHERE InvoiceID = @InvoiceID;