import { Request, Response } from "express";
import ApplicationsServices from "@/modules/applications/applications.services";
import { formatCreateApplication } from "./applications.utils";

const getApplications = async (_req: Request, res: Response) => {
  const applications = await ApplicationsServices.getApplications();
  if (applications) {
    res.json(applications);
  } else {
    res.status(404).json({
      message: "Sorry, cant find Applications",
    });
  }
};
const getApplication = async (req: Request, res: Response) => {
  const application = await ApplicationsServices.getApplicationById(
    req.params.id
  );
  if (application) {
    res.json(application);
  } else {
    res.status(404).json({
      message: "Sorry, cant find Application",
    });
  }
};

const createApplication = async (req: Request, res: Response) => {
  const application = formatCreateApplication(req.body);
  const checkedApplication = await ApplicationsServices.getApplicationByName(
    application.name
  );
  if (checkedApplication) {
    res.status(400).json({
      message: "Email has existed",
    });
    return;
  }
  const resApplication = await ApplicationsServices.createApplication(
    application
  );
  if (!resApplication) {
    res.status(400).json({
      message: "Something wrong",
    });
  } else {
    res.json(resApplication);
  }
};

const deleteApplication = async (req: Request, res: Response) => {
  const deleteApplication = await ApplicationsServices.getApplicationById(
    req.params.id
  );
  if (!deleteApplication) {
    res.status(400).json({
      message: "Application not found",
    });
    return;
  }
  const resApplication = await ApplicationsServices.deleteApplication(
    req.params.id
  );
  if (!resApplication) {
    res.status(500).json({
      message: "Something wrong",
    });
  } else {
    res.json(resApplication);
  }
};

const editApplication = async (req: Request, res: Response) => {
  let editApplication = await ApplicationsServices.getApplicationById(
    req.params.id
  );
  if (!editApplication) {
    res.status(400).json({
      message: "Application not found",
    });
    return;
  }
  const checkedApplication = await ApplicationsServices.getApplicationByName(
    req.body.name
  );

  if (checkedApplication) {
    res.status(400).json({
      message: "ApplicationAddress has existed",
    });
    return;
  }
  const resApplication = await ApplicationsServices.editApplication(
    req.params.id,
    req.body
  );

  if (!resApplication) {
    res.status(500).json({
      message: "Something wrong",
    });
  } else {
    res.json(resApplication);
  }
};

export default {
  getApplications,
  getApplication,
  createApplication,
  deleteApplication,
  editApplication,
};
