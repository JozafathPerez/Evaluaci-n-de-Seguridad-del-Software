CREATE OR ALTER VIEW Website.InventoryView AS
SELECT
    si.StockItemID,
    si.StockItemName,
    (
        SELECT
            STRING_AGG(sg.StockGroupName, ', ')
        FROM Warehouse.StockItemStockGroups AS sisg
            INNER JOIN Warehouse.StockGroups AS sg
                ON sisg.StockGroupID = sg.StockGroupID
        WHERE si.StockItemID = sisg.StockItemID
    ) AS StockGroups,
    s.SupplierName,
    ISNULL(c.ColorName, 'Sin color asignado') AS ColorName,
    upt.PackageTypeName AS UnitPackage,
    opt.PackageTypeName AS OuterPackage,
    si.QuantityPerOuter,
    ISNULL(si.Brand, 'Sin marca asignada') AS Brand,
    ISNULL(si.[Size], 'Sin tamaño asignado') AS [Size],
    CAST(si.TaxRate AS DECIMAL(18, 2)) AS TaxRate,
    CAST(si.UnitPrice AS DECIMAL(18, 2)) AS UnitPrice,
    CAST(si.RecommendedRetailPrice AS DECIMAL(18, 2)) AS RecommendedRetailPrice,
    CAST(si.TypicalWeightPerUnit AS DECIMAL(18, 2)) AS TypicalWeightPerUnit,
    si.SearchDetails,
    sh.QuantityOnHand,
    sh.BinLocation,
    si.Deleted
FROM Warehouse.StockItems AS si
    LEFT JOIN Purchasing.Suppliers AS s
        ON si.SupplierID = s.SupplierID
    LEFT JOIN Warehouse.Colors AS c
        ON si.ColorID = c.ColorID
    LEFT JOIN Warehouse.PackageTypes AS upt
        ON si.UnitPackageID = upt.PackageTypeID
    LEFT JOIN Warehouse.PackageTypes AS opt
        ON si.OuterPackageID = opt.PackageTypeID
    LEFT JOIN Warehouse.StockItemHoldings AS sh
        ON si.StockItemID = sh.StockItemID