CREATE OR ALTER VIEW Website.CustomersView AS
SELECT
    c.CustomerID,
    c.CustomerName,
    cc.CustomerCategoryName,
    bg.BuyingGroupName,
    p.FullName AS PrimaryContactPerson,
    p2.FullName AS AlternateContactPerson,
    c2.CustomerID AS BillToCustomerID,
    c2.CustomerName AS BillToCustomerName,
    dm.DeliveryMethodName,
    ct.CityName AS DeliveryCityName,
    c.DeliveryPostalCode,
    c.PhoneNumber,
    c.FaxNumber,
    c.PaymentDays,
    c.WebsiteURL,
    c.DeliveryAddressLine1,
    c.DeliveryAddressLine2,
    c.PostalPostalCode,
    c.DeliveryLocation
FROM Sales.Customers AS c
    LEFT JOIN Sales.CustomerCategories AS cc
        ON c.CustomerCategoryID = cc.CustomerCategoryID
    LEFT JOIN Sales.BuyingGroups AS bg
        ON c.BuyingGroupID = bg.BuyingGroupID
    LEFT JOIN Application.People AS p 
        ON c.PrimaryContactPersonID = p.PersonID
    LEFT JOIN Application.People AS p2
        ON c.AlternateContactPersonID = p2.PersonID
    LEFT JOIN Sales.Customers AS c2
        ON c.BillToCustomerID = c2.CustomerID
    LEFT JOIN Application.DeliveryMethods AS dm
        ON c.DeliveryMethodID = dm.DeliveryMethodID
    LEFT JOIN Application.Cities AS ct
        ON c.DeliveryCityID = ct.CityID;