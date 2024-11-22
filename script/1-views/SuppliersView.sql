CREATE OR ALTER VIEW Website.SuppliersView AS
    SELECT
        s.SupplierID,
        s.SupplierName,
        sc.SupplierCategoryName,
        p.FullName AS PrimaryContactPerson,
        p.PhoneNumber AS PrimaryContactPhone,
        p.FullName AS PrimaryContactEmail,
        p2.FullName AS AlternateContactPerson,
        p2.EmailAddress AS AlternateContactEmail,
        p2.PhoneNumber AS AlternateContactPhone,
        dm.DeliveryMethodName,
        ct.CityName AS DeliveryCityName,
        s.DeliveryPostalCode,
        s.PhoneNumber,
        s.FaxNumber,
        s.WebsiteURL,
        s.DeliveryAddressLine1,
        s.DeliveryAddressLine2,
        s.DeliveryLocation,
        s.BankAccountBranch,
        s.BankAccountName,
        s.PaymentDays
    FROM Purchasing.Suppliers AS s
        INNER JOIN Purchasing.SupplierCategories AS sc
            ON s.SupplierCategoryID = sc.SupplierCategoryID
        INNER JOIN Application.People AS p
            ON s.PrimaryContactPersonID = p.PersonID
        INNER JOIN Application.People AS p2
            ON s.AlternateContactPersonID = p2.PersonID
        INNER JOIN Application.DeliveryMethods AS dm
            ON s.DeliveryMethodID = dm.DeliveryMethodID
        INNER JOIN Application.Cities AS ct
            ON s.DeliveryCityID = ct.CityID;
        