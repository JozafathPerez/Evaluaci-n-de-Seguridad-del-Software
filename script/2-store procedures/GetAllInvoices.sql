CREATE OR ALTER PROCEDURE GetAllInvoices (
    @CustomerName NVARCHAR(100),
    @MinDate DATE,
    @MaxDate DATE,
    @MinAmount DECIMAL(18, 2),
    @MaxAmount DECIMAL(18, 2),
    @PageNumber INT
)
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

    BEGIN TRANSACTION;
    
    DECLARE @page_size INT = 200;

    -- Query to get the page quantity matching the criteria
    SELECT
        CEILING(CAST(COUNT(*) AS FLOAT) / @page_size) AS TotalPages
    FROM Website.InvoicesView
    WHERE
        (@CustomerName IS NULL OR CustomerName LIKE '%' + @CustomerName + '%')
        AND (@MinDate IS NULL OR InvoiceDate >= @MinDate)
        AND (@MaxDate IS NULL OR InvoiceDate <= @MaxDate)
        AND (@MinAmount IS NULL OR TotalAmount >= @MinAmount)
        AND (@MaxAmount IS NULL OR TotalAmount <= @MaxAmount);

    -- Query to get the paginated results
    SELECT
        InvoiceID,
        CustomerName,
        DeliveryMethodName,
        FORMAT(InvoiceDate, 'dd \de MMM \del yyyy', 'es-ES') AS InvoiceDate,
        TotalAmount
    FROM Website.InvoicesView
    WHERE
        (@CustomerName IS NULL OR CustomerName LIKE '%' + @CustomerName + '%')
        AND (@MinDate IS NULL OR InvoiceDate >= @MinDate)
        AND (@MaxDate IS NULL OR InvoiceDate <= @MaxDate)
        AND (@MinAmount IS NULL OR TotalAmount >= @MinAmount)
        AND (@MaxAmount IS NULL OR TotalAmount <= @MaxAmount)
    ORDER BY CustomerName ASC
    OFFSET (@PageNumber - 1) * @page_size ROWS
    FETCH NEXT @page_size ROWS ONLY;

    COMMIT TRANSACTION;
END;