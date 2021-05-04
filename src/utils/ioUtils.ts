import fs from 'fs';
import path from 'path';
const fsPromises = fs.promises;
import logger from '../config/logger';

let baseDir = '';

type DataEntity = 'grid' | string; // not sure if we need something other than grid

/**
 * Saves the passed data to the json file
 * @param entity
 * @param data
 */
export const writeData = async (entity: DataEntity, data: any) => {
    try {
        return await fsPromises.writeFile(`${getDataDir()}${entity}.json`, JSON.stringify(data), 'utf8');
    } catch (e) {
        console.error('Error writing json file:', e);
    }
};

/**
 * Reads the saved json file to return the json data
 * @param entity
 */
export const readData = async (entity: DataEntity) => {
    try {
        const gridData = await fsPromises.readFile(`${getDataDir()}${entity}.json`, 'utf8');
        return JSON.parse(gridData);
    } catch (e) {
        console.error('Error reading json file:', e);
    }
};

/**
 * Create the data directory if it doesn't exist
 * @param baseDir
 */
export const makeDataDir = async (baseDir: string) => {
    // if the folder exists do not cause an app crash
    try {
        const getRootDirList = await fsPromises.readdir(`${baseDir}`);
        if (!getRootDirList.includes('data')) {
            return await fsPromises.mkdir(`${baseDir}/data`);
        }
    } catch (e) {
        logger.error('error creating data directory', e);
    }
};

/**
 * Set the application base directory
 * @param __basedir
 */
export const setBaseDir = (__basedir: string) => {
    baseDir = __basedir;
};

/**
 * Return the data directory
 */
export const getDataDir = () => {
    return path.join(baseDir, './data/');
};
