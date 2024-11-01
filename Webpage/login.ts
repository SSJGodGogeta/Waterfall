import {dataSource} from "./DB/dataSource";
import {Privilege} from "./DB/Entities/Privilege";
// to run this, execute this command in the terminal:
// npx ts-node Webpage/login.ts

async function main() {
    console.log("Hello World!");
    try {
        await dataSource.initialize();
        console.log("Data source has been initialized!");
        console.log("Entities:", dataSource.entityMetadatas); // Log all registered entities
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        return; // Exit the function if there's an error
    }


    const privilegeRepo = dataSource.getRepository(Privilege);
    const privilege = await privilegeRepo.find();
    for (const p of privilege) {
        if (p) {
            console.log(p.privilege_techcode);
        } else {
            console.log("No privileges found.");
        }

    }

}

main()