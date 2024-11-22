CREATE OR ALTER PROCEDURE GetTopProductsByYear
    @MinYear INT,
    @MaxYear INT
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT
        Rank,
        StockItemName,
        Amount,
        [Year]
    FROM (SELECT
            il.StockItemID,
            il.StockItemName,
            SUM(il.Quantity * il.UnitPrice) AS Amount,
            YEAR(iv.InvoiceDate) AS [Year],
            DENSE_RANK() OVER (PARTITION BY YEAR(InvoiceDate) ORDER BY SUM(il.Quantity * il.UnitPrice) DESC) AS Rank
        FROM Website.InvoicesView AS iv
            INNER JOIN Website.InvoiceLinesView AS il
                ON iv.InvoiceID = il.InvoiceID
        GROUP BY
            YEAR(iv.InvoiceDate),
            il.StockItemID,
            il.StockItemName)
        AS SalesData
    WHERE
        Rank <= 5
        AND [YEAR] BETWEEN @MinYear AND @MaxYear
END;
