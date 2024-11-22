CREATE OR ALTER PROCEDURE GetTopSuppliersByYear
    @MinYear INT,
    @MaxYear INT
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT
        Rank,
        SupplierName,
        Amount,
        TotalAmount,
        [Year]
    FROM (SELECT
            SupplierID,
            SupplierName,
            COUNT(SupplierID) AS Amount,
            SUM(TotalAmount) AS TotalAmount,
            YEAR(OrderDate) AS [Year],
            DENSE_RANK() OVER (PARTITION BY YEAR(OrderDate) ORDER BY COUNT(SupplierID) DESC) AS Rank
        FROM Website.PurchasesView
        GROUP BY
            YEAR(OrderDate),
            SupplierID,
            SupplierName)
        AS PurchaseData
    WHERE
        Rank <= 5
        AND [Year] BETWEEN @MinYear AND @MaxYear
END;
