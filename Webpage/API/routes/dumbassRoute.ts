import {Request, Response, Router} from "express";

const router = Router();
router.get("", async (_req: Request, res: Response) => {
    const message: string = "Dies ist eine Nachricht von Arman. Du Idiot, sollst nicht localhost:3000 aufrufen. Dies ist der port des Backend Servers!\nDu musst die Webseite laden. Diese ist auf einen anderen Port (siehe app.ts). Benutze die intigrierte Websotrm/VS code Funktion um die Webseite in einen Live Server zu öffnen";
    console.error(message);
    res.json(message);
});
export default router;