CREATE OR ALTER PROCEDURE Authenticate (
    @Username NVARCHAR(100),
    @Password NVARCHAR(100)
)
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

    BEGIN TRANSACTION;
    DECLARE @user_id INT;
    DECLARE @user_password NVARCHAR(100);
    DECLARE @user_salt NVARCHAR(100);
    DECLARE @user_hashed_password NVARCHAR(100);
    DECLARE @user_role NVARCHAR(100);
    DECLARE @active BIT;

    -- Get the user information
    SELECT
        @user_id = UserID,
        @user_password = [Password],
        @user_role = [Role],
        @active = Active
    FROM Application.Users
    WHERE UserName = @Username;

    -- Check if the user exists
    IF @user_id IS NULL
    BEGIN
        THROW 51000, 'Invalid username or password.', 1;
    END

    -- check the password
    IF
        @user_password <> @Password
    BEGIN
        THROW 51000, 'Invalid username or password.', 1;
    END

    -- check if the user is active
    IF @active = 0
    BEGIN
        THROW 51000, 'User is not active.', 1;
    END

    -- Return the user info
    SELECT
        UserID,
        FullName,
        UserName,
        Email,
        [Role],
        [Location]
    FROM Application.Users
    WHERE UserID = @user_id;
    COMMIT TRANSACTION;
END;
