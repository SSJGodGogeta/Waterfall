// Waterfall/Webpage/API/routes/projectRoutes.ts
import {Router, Request, Response} from "express";
import {Project} from "../../DB/Entities/Project.js";
import {clearProjectCache, getProjectFromDBOrCache} from "../Service/ProjectService.js";
import {authenticate} from "../authenticationMiddleware.js";

const router = Router();
// GET all projects

router.get("/", authenticate, async (_req: Request, res: Response) => {
    try {
        const projects = await getProjectFromDBOrCache();
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({message: "Failed to fetch projects"});
    }
});

router.put("/:id", authenticate, async (req: Request, res: Response) => {
    const projectId = parseInt(req.params.id);
    const {project_name} = req.body;

    try {
        const project = await Project.findOneBy({project_id: projectId});
        if (!project) {
            res.status(404).json({message: "Project not found"});
            return;
        }

        project.project_name = project_name;
        await project.save();
        clearProjectCache();
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error updating project"});
        return;
    }
});


export default router;
