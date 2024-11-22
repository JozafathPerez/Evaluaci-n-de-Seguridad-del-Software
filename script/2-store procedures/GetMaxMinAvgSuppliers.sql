CREATE OR ALTER PROCEDURE GetMaxMinAvgSuppliers
    @CategorySearch NVARCHAR(100) = NULL,
    @SupplierSearch NVARCHAR(100) = NULL
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT
        s.SupplierCategoryName,
        s.SupplierName,
        CAST(MIN(stl.OrderedOuters * stl.ExpectedUnitPricePerOuter) AS DECIMAL(18,2)) AS MinAmount,
        CAST(MAX(stl.OrderedOuters * stl.ExpectedUnitPricePerOuter) AS DECIMAL(18,2)) AS MaxAmount,
        CAST(AVG(stl.OrderedOuters * stl.ExpectedUnitPricePerOuter) AS DECIMAL(18,2)) AS AvgAmount
    FROM Website.SuppliersView s
        INNER JOIN Purchasing.PurchaseOrders st
            ON s.SupplierID = st.SupplierID
        INNER JOIN Purchasing.PurchaseOrderLines stl
            ON st.PurchaseOrderID = stl.PurchaseOrderID
    WHERE
        (@CategorySearch IS NULL OR s.SupplierCategoryName LIKE '%' + @CategorySearch + '%') AND
        (@SupplierSearch IS NULL OR s.SupplierName LIKE '%' + @SupplierSearch + '%')
    GROUP BY
        ROLLUP (s.SupplierCategoryName, s.SupplierName)
    ORDER BY
        s.SupplierCategoryName,
        s.SupplierName
END;