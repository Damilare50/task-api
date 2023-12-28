/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    PORT: number
    JWT_EXPIRY: string
    JWT_SECRET: string
  }
  export const config: Config
  export type Config = IConfig
}
