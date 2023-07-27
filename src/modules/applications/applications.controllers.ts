import { Request, Response } from "express";
import ApplicationsServices from "@/modules/applications/applications.services";
import { formatCreateApplication } from "./applications.utils";

const getApplicationsByUserId = async (req: Request, res: Response) => {
  const applications = await ApplicationsServices.getApplicationsByUserId(
    req.params.userId
  );
  if (applications?.length && applications.length > 0) {
    res.json(applications);
  } else {
    res.status(404).json({
      message: "Sorry, cant find Applications",
    });
  }
};
const getApplicationsByWalletId = async (req: Request, res: Response) => {
  const applications = await ApplicationsServices.getApplicationsByWalletId(
    req.params.walletId
  );
  if (applications?.length && applications.length > 0) {
    res.json(applications);
  } else {
    res.status(404).json({
      message: "Sorry, cant find Applications",
    });
  }
};
const getApplications = async (_req: Request, res: Response) => {
  const applications = await ApplicationsServices.getApplications();
  if (applications?.length && applications.length > 0) {
    res.json(applications);
  } else {
    res.status(404).json({
      message: "Sorry, cant find Applications",
    });
  }
};
const getApplication = async (req: Request, res: Response) => {
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
};
const deleteApplicationsByUserId = async (req: Request, res: Response) => {
  const deleteApplications = await ApplicationsServices.getApplicationsByUserId(
    req.params.userId
  );
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
};
const deleteApplicationsByWalletId = async (req: Request, res: Response) => {
  const deleteApplications =
    await ApplicationsServices.getApplicationsByWalletId(req.params.walletId);
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
};

const editApplication = async (req: Request, res: Response) => {
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
};

export default {
  getApplications,
  getApplication,
  createApplication,
  deleteApplication,
  deleteApplicationsByUserId,
  editApplication,
  getApplicationsByUserId,
  getApplicationsByWalletId,
  deleteApplicationsByWalletId,
};
