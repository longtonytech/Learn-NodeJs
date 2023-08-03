import { Request, Response } from "express";
import ApplicationsServices from "@/modules/applications/applications.services";
import { formatCreateApplication } from "./applications.utils";
import { IRequestType } from "@/types";

const getApplicationsByUserId = async (
  req: Request & IRequestType,
  res: Response
) => {
  try {
    const applications = await ApplicationsServices.getApplicationsByUserId({
      userId: req.userId,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 2,
      search: req.query.search || "",
    });
    if (applications?.length && applications.length > 0) {
      res.json(applications);
    } else {
      res.status(404).json({
        message: "Sorry, cant find Applications",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const getApplication = async (req: Request, res: Response) => {
  try {
    const application = await ApplicationsServices.getApplicationById(
      req.params.applicationId
    );
    if (application) {
      res.json(application);
    } else {
      res.status(404).json({
        message: "Sorry, cant find Application",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const createApplication = async (
  req: Request & IRequestType,
  res: Response
) => {
  try {
    const application = formatCreateApplication(req);
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
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const deleteApplication = async (req: Request, res: Response) => {
  try {
    const deleteApplication = await ApplicationsServices.getApplicationById(
      req.params.applicationId
    );
    if (!deleteApplication) {
      res.status(400).json({
        message: "Application not found",
      });
      return;
    }
    const resApplication = await ApplicationsServices.deleteApplication(
      deleteApplication.id
    );
    if (!resApplication) {
      res.status(500).json({
        message: "Something wrong",
      });
    } else {
      res.json(resApplication);
    }
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};
const deleteApplicationsByUserId = async (
  req: Request & IRequestType,
  res: Response
) => {
  try {
    if (req.userId !== req.params.userId) {
      return res.status(400).json({
        message: "Unauthorized!",
      });
    }
    const deleteApplications =
      await ApplicationsServices.getApplicationsByUserId(req.params.userId);
    if (deleteApplications!.length > 0) {
      const resWallets = await Promise.all(
        deleteApplications!.map((deleteApplication) =>
          ApplicationsServices.deleteApplication(deleteApplication.id)
        )
      );
      res.json(resWallets);
    } else {
      res.status(400).json({
        message: "Applications not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const editApplication = async (req: Request, res: Response) => {
  try {
    const editApplication = await ApplicationsServices.getApplicationById(
      req.params.applicationId
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
        message: "Application has existed",
      });
      return;
    }
    const resApplication = await ApplicationsServices.editApplication(
      editApplication.id,
      req.body
    );

    if (!resApplication) {
      res.status(500).json({
        message: "Something wrong",
      });
    } else {
      res.json(resApplication);
    }
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export default {
  getApplication,
  createApplication,
  deleteApplication,
  deleteApplicationsByUserId,
  editApplication,
  getApplicationsByUserId,
};
