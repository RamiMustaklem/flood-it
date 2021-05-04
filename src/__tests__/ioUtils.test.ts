const MOCK_DIR = ['dist', 'node_modules', 'src']

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn().mockResolvedValue(null),
    readFile: jest.fn().mockResolvedValue(JSON.stringify({ random: 'key' })),
    readdir: jest.fn().mockResolvedValue(MOCK_DIR),
    mkdir: jest.fn().mockResolvedValue(true),
  },
}))

jest.mock('path', () => ({
  join: jest.fn().mockReturnValue('/path/to/root/data/'),
}))

import fs from 'fs'
import path from 'path'
const fsPromises = fs.promises
import {
  getDataDir,
  makeDataDir,
  readData,
  setBaseDir,
  writeData,
} from '../utils/ioUtils'

const baseDirPassed = '/path/to/root'

describe('ioUtils testing', () => {
  beforeAll(() => {
    setBaseDir(baseDirPassed)
  })

  it('should set the base directory of the app and return data directory', () => {
    const returnedDataDirPath = getDataDir()
    expect(path.join).toHaveBeenCalled()
    expect(returnedDataDirPath).toBe(`${baseDirPassed}/data/`)
  })

  it('should create a data directory at the root path', async () => {
    await makeDataDir(baseDirPassed)
    await expect(fsPromises.readdir).toHaveBeenCalledWith(baseDirPassed)
    await expect(fsPromises.readdir(baseDirPassed)).resolves.toEqual(MOCK_DIR)
    await expect(fsPromises.mkdir).toHaveBeenCalledWith(`${baseDirPassed}/data`)
    await expect(fsPromises.mkdir(`${baseDirPassed}/data`)).resolves.toBe(true)
  })

  it('should read from a specified json file', async () => {
    const filename = `/path/to/root/data/test.json`
    const data = { random: 'key' }
    await readData('test')
    await expect(fsPromises.readFile).toHaveBeenCalledWith(filename, 'utf8')
    await expect(fsPromises.readFile(filename)).resolves.toBe(
      JSON.stringify(data)
    )
  })

  it('should write to a specified json file', async () => {
    const data = { random: 'key' }
    await writeData('test', data)
    await expect(fsPromises.writeFile).toHaveBeenCalledWith(
      `/path/to/root/data/test.json`,
      JSON.stringify(data),
      'utf8'
    )
  })

  it('should not create a data directory when it exists', async () => {
    jest.resetAllMocks()
    jest.mock('fs', () => ({
      promises: {
        writeFile: jest.fn().mockResolvedValue(null),
        readFile: jest
          .fn()
          .mockResolvedValue(JSON.stringify({ random: 'key' })),
        readdir: jest.fn().mockResolvedValue([...MOCK_DIR, 'data']),
        mkdir: jest.fn().mockResolvedValue(true),
      },
    }))
    await makeDataDir(baseDirPassed)
    await expect(fsPromises.readdir).toHaveBeenCalledWith(baseDirPassed)
    await expect(fsPromises.mkdir).not.toHaveBeenCalled()
  })
})
