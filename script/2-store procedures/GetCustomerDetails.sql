CREATE OR ALTER PROCEDURE GetCustomerDetails
    @CustomerID INT
AS
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
    SELECT 
        CustomerID,
        CustomerName,
        CustomerCategoryName,
        BuyingGroupName,
        PrimaryContactPerson,
        AlternateContactPerson,
        BillToCustomerID,
        BillToCustomerName,
        DeliveryMethodName,
        DeliveryCityName,
        DeliveryPostalCode,
        PhoneNumber,
        FaxNumber,
        PaymentDays,
        WebsiteURL,
        DeliveryAddressLine1,
        DeliveryAddressLine2,
        PostalPostalCode,
        DeliveryLocation
    FROM Website.CustomersView
    WHERE CustomerID = @CustomerID;