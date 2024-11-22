-- New linked server to connect to Limon

USE [master]
GO
EXEC sp_addlinkedserver 
    @server = 'Limon_WWI', -- Name of the linked server
    @srvproduct = '', -- Can be left empty for SQL Server
    @provider = 'SQLNCLI', -- SQL Server Native Client
    @datasrc = '192.168.100.67,1451'; -- IP address and port of the target SQL Server instance

GO
USE [master]
GO
EXEC sp_addlinkedsrvlogin 
    @rmtsrvname = 'Limon_WWI', -- Name of the linked server
    @useself = 'false', 
    @rmtuser = 'sa', -- Remote SQL Server username
    @rmtpassword = 'yourStrong#Password-'; -- Remote SQL Server password
GO

-- New linked server to connect to San Jose

USE [master]
GO
EXEC sp_addlinkedserver 
    @server = 'SanJose_WWI', -- Name of the linked server
    @srvproduct = '', -- Can be left empty for SQL Server
    @provider = 'SQLNCLI', -- SQL Server Native Client
    @datasrc = '192.168.100.67,1452'; -- IP address and port of the target SQL Server instance

GO
USE [master]
GO
EXEC sp_addlinkedsrvlogin 
    @rmtsrvname = 'SanJose_WWI', -- Name of the linked server
    @useself = 'false', 
    @rmtuser = 'sa', -- Remote SQL Server username
    @rmtpassword = 'yourStrong#Password-'; -- Remote SQL Server password
GO

-- testing!!!

SELECT * 
FROM OPENQUERY(Limon_WWI, 'SELECT * FROM [WideWorldImporters_LM].[Sales].[Customers]');


SELECT * 
FROM OPENQUERY(SanJose_WWI, 'SELECT * FROM [WideWorldImporters_SJ].[Sales].[Customers]');