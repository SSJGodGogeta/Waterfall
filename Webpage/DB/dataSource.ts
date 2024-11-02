import {DataSource} from "typeorm";
export const dataSource: DataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "waterfall_swe",
    password: "Sonntag",
    database: "waterfall_swe",
    synchronize: false,
    logging: true,
    entities: ["Webpage/dist/DB/Entities/*.js"], // U may need to reference the js files directly from /Webpage/dist/..
    //entities: [Absence, FlexTime, Group, Privilege, Project, Role, Staff, Timetable, User],
    subscribers: [],
});