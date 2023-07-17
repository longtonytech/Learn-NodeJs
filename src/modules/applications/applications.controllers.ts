import { Request, Response } from "express";
import ApplicationsServices from "@/modules/applications/applications.services";
import { checkEmty, createdApplication } from "./applications.utils";
import { requiredApplicationsFields } from "./applications.models";

const getApplications = (_req: Request, res: Response) => {
  const applications = ApplicationsServices.getApplications();
  if (applications) {
    res.json(applications);
  } else {
    res.status(404).json("Sorry, cant find Applications");
  }
};
const getApplication = (req: Request, res: Response) => {
  const application = ApplicationsServices.getApplication(req.params.id);
  if (application) {
    res.json(application);
  } else {
    res.status(404).json("Sorry, cant find Application");
  }
};

const createApplication = async (req: Request, res: Response) => {
  const application = createdApplication(req.body);
  const errors = checkEmty(requiredApplicationsFields, application);
  if (Object.keys(errors).length === 0) {
    const response = await ApplicationsServices.createdApplication(application);
    if (response.error) {
      if (response.application) {
        res.status(500).json({
          message: response.error,
        });
      } else {
        res.status(400).json({
          message: response.error,
        });
      }
    } else {
      res.json(response.application);
    }
  } else {
    res.status(400).json(errors);
  }
};

const deleteApplication = async (req: Request, res: Response) => {
  const response = await ApplicationsServices.deleteApplication(req.params.id);
  if (response.application) {
    if (response.error) {
      res.status(500).json({
        message: response.error,
      });
    } else {
      res.json(response.application);
    }
  } else {
    res.status(400).json({
      message: response.error,
    });
  }
};
const editApplication = async (req: Request, res: Response) => {
  const application = createdApplication(req.body, req.params.id);
  const errors = checkEmty(requiredApplicationsFields, application);
  if (Object.keys(errors).length === 0) {
    const response = await ApplicationsServices.editApplication(
      req.params.id,
      application
    );
    if (response.application) {
      if (response.error) {
        res.status(500).json({
          message: response.error,
        });
      } else {
        res.json(response.application);
      }
    } else {
      res.status(400).json({
        message: response.error,
      });
    }
  } else {
    res.status(400).json(errors);
  }
};

export default {
  getApplications,
  getApplication,
  createApplication,
  deleteApplication,
  editApplication,
};
