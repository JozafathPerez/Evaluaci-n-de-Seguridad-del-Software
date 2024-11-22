CREATE OR ALTER PROCEDURE GetTopCustomersByYear
    @MinYear INT,
    @MaxYear INT
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT
        Rank,
        CustomerName,
        Amount,
        TotalAmount,
        [Year]
    FROM (SELECT
            CustomerID,
            CustomerName,
            COUNT(CustomerID) AS Amount,
            SUM(TotalAmount) AS TotalAmount,
            YEAR(InvoiceDate) AS [Year],
            DENSE_RANK() OVER (PARTITION BY YEAR(InvoiceDate) ORDER BY COUNT(CustomerID) DESC) AS Rank
        FROM (
            SELECT *
            FROM OPENQUERY(Limon_WWI, 'SELECT * FROM [WideWorldImporters_LM].[Website].[InvoicesView]')
            UNION
            SELECT *
            FROM OPENQUERY(SanJose_WWI, 'SELECT * FROM [WideWorldImporters_SJ].[Website].[InvoicesView]')
        ) AS iv
        
        GROUP BY
            YEAR(InvoiceDate),
            CustomerID,
            CustomerName)
        AS SalesData
    WHERE
        Rank <= 5
        AND [Year] BETWEEN @MinYear AND @MaxYear
END;
