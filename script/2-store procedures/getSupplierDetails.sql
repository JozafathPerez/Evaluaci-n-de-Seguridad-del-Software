CREATE OR ALTER PROCEDURE GetSupplierDetails (
    @SupplierID INT
)
AS
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT 
        SupplierID,
        SupplierName,
        SupplierCategoryName,
        PrimaryContactPerson,
        PrimaryContactPhone,
        PrimaryContactEmail,
        AlternateContactPerson,
        AlternateContactEmail,
        AlternateContactPhone,
        DeliveryMethodName,
        DeliveryCityName,
        DeliveryPostalCode,
        PhoneNumber,
        FaxNumber,
        WebsiteURL,
        DeliveryAddressLine1,
        DeliveryAddressLine2,
        DeliveryLocation,
        BankAccountBranch,
        BankAccountName,
        PaymentDays
    FROM Website.SuppliersView
    WHERE SupplierID = @SupplierID;