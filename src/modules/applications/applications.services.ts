import { IApplication } from "@/types";
import { formatEditApplication } from "./applications.utils";
import { ApplicationModel } from "./applications.models";

const getApplicationById = async (id: string) => {
  try {
    const application = await ApplicationModel.findById(id);
    return application;
  } catch (error) {
    throw error;
  }
};
const getApplicationByName = async (name?: string) => {
  try {
    const [application] = await ApplicationModel.find({ name: name });
    return application;
  } catch (error) {
    throw error;
  }
};
const getApplicationsByUserId = async (req: any) => {
  try {
    console.log(req);
    const applications = await ApplicationModel.find({
      userId: req.userId,
      $text: { $search: req.search },
    })
      .limit(req.limit)
      .skip(req.limit * req.page - req.limit);

    return applications;
  } catch (error) {
    throw error;
  }
};
const getApplicationsByWalletId = async (walletId?: string) => {
  try {
    const applications = await ApplicationModel.find({ walletId: walletId });
    return applications;
  } catch (error) {
    throw error;
  }
};

const createApplication = async (application: IApplication) => {
  const applicationModel = new ApplicationModel(application);
  try {
    const newApplication = await applicationModel.save();
    return newApplication;
  } catch (error) {
    throw error;
  }
};

const deleteApplication = async (id: string) => {
  try {
    const application = await ApplicationModel.findByIdAndRemove(id);
    return application;
  } catch (error) {
    throw error;
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
    throw error;
  }
};

export default {
  getApplicationById,
  createApplication,
  deleteApplication,
  editApplication,
  getApplicationByName,
  getApplicationsByUserId,
  getApplicationsByWalletId,
};
