import fs from 'fs';
import path from 'path';
const fsPromises = fs.promises;

let baseDir = '';

type DataEntity = 'grid' | string; // not sure if we need something other than grid

export const writeData = async (entity: DataEntity, data: any) => {
    try {
        return await fsPromises.writeFile(`${getDataDir()}${entity}.json`, JSON.stringify(data), 'utf8');
    } catch (e) {
        console.error('Error writing json file:', e);
    }
};

export const readData = async (entity: DataEntity) => {
    try {
        const gridData = await fsPromises.readFile(`${getDataDir()}${entity}.json`, 'utf8');
        return JSON.parse(gridData);
    } catch (e) {
        console.error('Error reading json file:', e);
    }
};

// TODO: create /data/ dir if it doesn't exist
export const setBaseDir = (__basedir: string) => {
    baseDir = __basedir;
};

export const getDataDir = () => {
    return path.join(baseDir, './data/');
};
