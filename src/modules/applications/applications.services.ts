import { IData, IResponse, IApplication } from "@/types";
import { readData, writeData } from "@/utils";
import { formatApplication } from "./applications.utils";
let data: IData = readData();

const getApplications = () => {
  data = readData();
  const { applications } = data;
  return applications;
};
const getApplication = (id: string) => {
  data = readData();
  const { applications } = data;
  const application = applications?.find(
    (application) => application.id === id
  );
  return application;
};
const getApplicationByName = (name?: string) => {
  data = readData();
  const { applications } = data;
  const application = applications?.find(
    (application) => application.name === name
  );
  return application;
};
const createdApplication = async (application: IApplication) => {
  const data: IData = readData();
  let res: IResponse = {};
  const { applications } = data;
  const checkedApplication = getApplicationByName(application.name);
  if (checkedApplication) {
    res.error = "Email has existed";
  } else {
    applications?.push(application);
    const newData = JSON.stringify({ ...data, applications });
    const err = await writeData(newData);
    res = {
      application: application,
      error: err,
    };
  }
  return res;
};

const deleteApplication = async (id: string) => {
  data = readData();
  let { applications } = data;
  let res: IResponse = {};
  const deleteApplication = applications?.find(
    (application) => application.id === id
  );
  if (deleteApplication) {
    applications = applications?.filter((application) => application.id !== id);
    const newData = JSON.stringify({ ...data, applications });
    const err = await writeData(newData);
    res = {
      application: deleteApplication,
      error: err,
    };
  } else {
    res.error = "Application not found";
  }
  return res;
};
const editApplication = async (id: string, newApplication: IApplication) => {
  data = readData();
  let { applications } = data;
  let res: {
    application?: IApplication;
    error?: unknown | boolean;
  } = {};
  let editApplication = applications?.find(
    (application) => application.id === id
  );
  if (editApplication) {
    const checkedApplication = getApplicationByName(newApplication.name);
    if (checkedApplication) {
      res.error = "Email has existed";
    } else {
      const newApplications = applications?.map((application) => {
        if (application.id === id) {
          editApplication = formatApplication(newApplication, application);
          return editApplication;
        } else {
          return application;
        }
      });
      const newData = JSON.stringify({
        ...data,
        applications: newApplications,
      });

      const err = await writeData(newData);
      res = {
        application: editApplication,
        error: err,
      };
    }
  } else {
    res.error = "Application not found";
  }
  return res;
};

export default {
  getApplications,
  getApplication,
  createdApplication,
  deleteApplication,
  editApplication,
};
