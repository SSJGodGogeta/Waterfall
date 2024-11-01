import {Privilege} from "./DB/Entities/Privilege.js";
import {dataSource} from "./DB/dataSource.js";

async function main() {
    console.log("Hello World!");
    await dataSource.initialize();
    const privilege = await Privilege.find();
    console.log(privilege);
}
await main();