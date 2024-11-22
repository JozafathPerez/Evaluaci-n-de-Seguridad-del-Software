import sql from 'mssql'

export const getServerByLocation = (location) => {
    let user = process.env.DB_USER;
    let password = process.env.DB_PASSWORD;
    let server;
    let port;
    let database;

    switch (location) {
        case 'Escazu': // Corporativo
            server = process.env.DB_SERVER_CRP;
            port = process.env.DB_PORT_CRP;
            database = process.env.DB_DATABASE_CRP;
            break;
        case 'Limon':
            server = process.env.DB_SERVER_LM;
            port = process.env.DB_PORT_LM;
            database = process.env.DB_DATABASE_LM;
            break;
        case 'San Jose':
            server = process.env.DB_SERVER_SJ;
            port = process.env.DB_PORT_SJ;
            database = process.env.DB_DATABASE_SJ;
            break;
        default:
            console.log('No location provided, defaulting to Limon');
            server = process.env.DB_SERVER_LM;
            port = process.env.DB_PORT_LM;
            database = process.env.DB_DATABASE_LM;
            break;
    }
    
    const dbSettings = {
        user: user,
        password: password,
        server: server,
        port: parseInt(port),
        database: database,
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    }

    return dbSettings
};

export const getConnection = async (dbSettings) => {
    console.log(dbSettings.database);

    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error);
    }
}