USE WideWorldImporters;

IF NOT EXISTS (SELECT * FROM sys.columns 
               WHERE Name = N'Deleted' 
               AND Object_ID = Object_ID(N'[Warehouse].[StockItems]'))
BEGIN
    ALTER TABLE [Warehouse].[StockItems]
        ADD Deleted BIT NOT NULL DEFAULT 0;
END

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'UserRoles' AND schema_id = SCHEMA_ID(N'Application'))
BEGIN
    CREATE TABLE Application.UserRoles
    (
        RoleID INT PRIMARY KEY IDENTITY(1,1),
        RoleName NVARCHAR(50) NOT NULL
    );

    INSERT INTO Application.UserRoles (RoleName) VALUES ('Admin');
    INSERT INTO Application.UserRoles (RoleName) VALUES ('Corporate');
END

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'Users' AND schema_id = SCHEMA_ID(N'Application'))
BEGIN
    CREATE TABLE Application.Users
    (
        UserID INT PRIMARY KEY IDENTITY(1,1),
        UserName NVARCHAR(50) NOT NULL,
        Password NVARCHAR(50) NOT NULL,
        FullName NVARCHAR(255) NOT NULL,
        Email NVARCHAR(255) NOT NULL,
        Role INT NOT NULL,
        Location NVARCHAR(255) NOT NULL,
        HireDate DATETIME NOT NULL DEFAULT GETDATE(),
        Active BIT NOT NULL DEFAULT 1,
        CONSTRAINT FK_UserRole FOREIGN KEY (Role) REFERENCES Application.UserRoles(RoleID)
    );

    INSERT INTO Application.Users
        VALUES
        ('corp', '1234', 'Corporate', 'otheremail@email.com', 2, 'Escazu', GETDATE(), 1),	 
        ('ladmin', '1234', 'Administrator', 'myemail@email.com', 1, 'Limon', GETDATE(), 1),
        ('sadmin', '1234', 'Administrator', 'youremail@email.com', 1, 'San Jose', GETDATE(), 1);
END

ALTER TABLE Application.Cities -- referenciado por DetermineCustomerAccess
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Application.Countries
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Application.DeliveryMethods
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Application.PaymentMethods
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Application.People
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Application.StateProvinces -- lo referencia DetermineCustomerAccess
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Application.TransactionTypes
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Purchasing.SupplierCategories
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Purchasing.Suppliers
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Sales.BuyingGroups
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Sales.CustomerCategories
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Sales.Customers -- lo referencia FilterCustomersBySalesTerritoryRole
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Warehouse.ColdRoomTemperatures
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Warehouse.Colors
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Warehouse.PackageTypes
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Warehouse.StockGroups
SET (SYSTEM_VERSIONING = OFF);
GO

ALTER TABLE Warehouse.StockItems
SET (SYSTEM_VERSIONING = OFF);
GO
