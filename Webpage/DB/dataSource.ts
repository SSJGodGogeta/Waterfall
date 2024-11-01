import {DataSource} from "typeorm";
import {Privilege} from "./Entities/Privilege";
export const dataSource: DataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "waterfall_swe",
    password: "Sonntag",
    database: "waterfall_swe",
    synchronize: false,
    logging: true,
    entities: [Privilege],
    subscribers: [],
});