import { IApplication } from "@/types";
import { formatEditApplication } from "./applications.utils";
import { ApplicationModel } from "./applications.models";

const getApplications = async () => {
  let applications: IApplication[] = [];
  try {
    applications = await ApplicationModel.find({});
    return applications;
  } catch (error) {
    console.log(error);
  }
};
const getApplicationById = async (id: string) => {
  try {
    const application = await ApplicationModel.findById(id);
    return application;
  } catch (error) {
    console.log(error);
  }
};
const getApplicationByName = async (name?: string) => {
  try {
    const [application] = await ApplicationModel.find({ name: name });
    return application;
  } catch (error) {
    console.log(error);
  }
};
const getApplicationsByUserId = async (userId?: string) => {
  try {
    const applications = await ApplicationModel.find({ userId: userId });
    return applications;
  } catch (error) {
    console.log(error);
  }
};
const getApplicationsByWalletId = async (walletId?: string) => {
  try {
    const applications = await ApplicationModel.find({ walletId: walletId });
    return applications;
  } catch (error) {
    console.log(error);
  }
};

const createApplication = async (application: IApplication) => {
  const applicationModel = new ApplicationModel(application);
  try {
    const newApplication = await applicationModel.save();
    return newApplication;
  } catch (error) {
    console.log(error);
  }
};

const deleteApplication = async (id: string) => {
  try {
    const application = await ApplicationModel.findByIdAndRemove(id);
    return application;
  } catch (error) {
    console.log(error);
  }
};

const editApplication = async (id: string, body: any) => {
  const fields = Object.keys(ApplicationModel.schema.obj);
  const editApplication = formatEditApplication(fields, body);
  try {
    const application = await ApplicationModel.findByIdAndUpdate(
      id,
      editApplication,
      {
        new: true,
      }
    );
    return application;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getApplications,
  getApplicationById,
  createApplication,
  deleteApplication,
  editApplication,
  getApplicationByName,
  getApplicationsByUserId,
  getApplicationsByWalletId,
};
