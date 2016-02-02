import fs = require("fs")
import path = require("path")

export namespace Config {
    const _appConfigName = "__appConfig"
    export function initialize(rootDirName: string) {
        const configPath = path.join(rootDirName, "config.json")
        const json = fs.readFileSync(configPath, "UTF-8")
        const config = JSON.parse(json)
        config.rootDit = rootDirName
        global[_appConfigName] = {
            get: () => {
                return Object.assign({}, config)
            }
        }
    }

    export function get(): AppConfig {
        return global[_appConfigName].get() as AppConfig
    }

    export interface AppConfig {
        rootDir: string,
        es: {
            host: string,
            port: number,
            auth?: {
                name: string,
                password: string
            },
            index: string
        }

    }
}

export default Config