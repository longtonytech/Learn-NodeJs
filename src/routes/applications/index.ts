import { IApplication, IData } from "@/types";
import { readData, writeData } from "@/utils";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const router = express.Router();
const createdAplication = (req: Request, id?: string): IApplication => ({
  id: id || uuidv4().slice(0, 8),
  userId: req.body.userId,
  name: req.body.name,
  deviceId: req.body.deviceId,
});
let response: IData = {};

response = readData();
router.get("/", (_req: Request, res: Response) => {
  const { applications } = response;
  if (applications) {
    res.json(applications);
  } else {
    res.status(404).json("Sorry, cant find Applications");
  }
});

router.get("/:id", (req: Request, res: Response) => {
  const { applications } = response;
  const application = applications?.find(
    (application) => application.id === req.params.id
  );
  if (application) {
    res.json(application);
  } else {
    res.status(404).json("Sorry, cant find Application");
  }
});

router.post("/", jsonParser, async (req: Request, res: Response) => {
  const application = createdAplication(req);
  const { applications } = response;
  applications?.push(application);
  const newData = JSON.stringify({ ...response, applications });
  const err = await writeData(newData);
  if (err) {
    res.status(500).json({
      message: err,
    });
  } else {
    res.json(application);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  let { applications } = response;
  const deleteApplication = applications?.find(
    (application) => application.id === req.params.id
  );
  if (deleteApplication) {
    applications = applications?.filter(
      (application) => application.id !== req.params.id
    );
    const newData = JSON.stringify({ ...response, applications });
    const err = await writeData(newData);
    if (err) {
      res.status(500).json({
        message: err,
      });
    } else {
      res.json(deleteApplication);
    }
  } else {
    res.status(400).json({
      message: "Application not found",
    });
  }
});

router.put("/:id", jsonParser, (req: Request, res: Response) => {
  const { applications } = response;
  let editApplication = applications?.find(
    (application) => application.id === req.params.id
  );
  if (editApplication) {
    const newApplications = applications?.map((application) => {
      if (application.id === req.params.id) {
        editApplication = createdAplication(req, req.params.id);
        return editApplication;
      } else {
        return application;
      }
    });

    const newData = JSON.stringify({
      ...response,
      applications: newApplications,
    });
    const err = writeData(newData);
    if (err) {
      res.status(500).json({
        message: err,
      });
    } else {
      res.json(editApplication);
    }
  } else {
    res.status(400).json({
      message: "Application not found",
    });
  }
});

export default router;
