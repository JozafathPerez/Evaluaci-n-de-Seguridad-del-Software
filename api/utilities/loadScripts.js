import { getConnection, getServerByLocation } from '../database/connection.js';
import sql from 'mssql';
import fs from 'node:fs';
import path from 'node:path';

const excludedFiles = ['Corporativo.sql', 'Alterations.sql'];

const loadScriptFromFile = async (filePath, server) => {
    if (path.extname(filePath) !== '.sql') {
        console.log(`Skipping non-SQL file: ${filePath}`);
        return;
    } else if (excludedFiles.includes(path.basename(filePath))) {
        console.log(`Skipping excluded file: ${filePath}`);
        return;
    }

    let pool;
    try {
        const script = fs.readFileSync(filePath, 'utf8');
        
        const dbSettings = getServerByLocation(server);
        pool = await getConnection(dbSettings);
        const request = await pool.request();

        const result = await request.query(script);
        console.log(`Script ${filePath} executed successfully`);
        pool.close();
    } catch (error) {
        console.error(`Error executing script ${filePath}: ${error.message}`);
        if (pool) {
            pool.close();
        }
    } finally {
    }
}

const loadAllScripts = async (folderPath, server) => {
    console.log(`Loading scripts from ${folderPath} to ${server}`);
    try {
        const files = fs.readdirSync(folderPath);
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                await loadAllScripts(filePath, server); // Recursively load scripts from subdirectories
            } else if (fs.statSync(filePath).isFile()) {
                await loadScriptFromFile(filePath, server);
            }
        }
    } catch (error) {
        console.error(`Error loading scripts: ${error.message}`);
    }
    console.log(`Done loading scripts from ${folderPath}`);
}

(async () => {
    await loadAllScripts('../script', 'Limon');
})();