// Waterfall/Webpage/API/routes/projectRoutes.ts
import {Router, Request, Response} from "express";
import {clearProjectCache, getProjectByKey, getProjectFromDBOrCache} from "../Service/ProjectService.js";
import {authenticate} from "../authenticationMiddleware.js";
import {Project} from "../../DB/Entities/Project.js";

const router = Router();
// GET all projects

router.get("/", authenticate, async (_req: Request, res: Response) => {
    try {
        const projects:Project[]|null = await getProjectFromDBOrCache();
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({message: "Failed to fetch projects"});
    }
});

router.get("/:id", authenticate, async (req: Request, res: Response) => {
    try {
        const projectId:number = parseInt(req.params.id);
        const project: Project|undefined = await getProjectByKey("project_id", projectId);
        res.json(project);
    } catch (error) {
        console.error("Error fetching privileges:", error);
        res.status(500).json({message: "Failed to fetch projects"});
    }
});

// TODO declared by Arman: a project has more than just a name as attribute. We should make them editable as well.
router.put("/:id", authenticate, async (req: Request, res: Response) => {
    const {project_name} = req.body;
    try {
        const projectId:number = parseInt(req.params.id);
        const project:Project|undefined = await getProjectByKey("project_id", projectId);
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
