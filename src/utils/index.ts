import fs from "fs";

export const readData = (): any => {
  fs.readFile("db.json", (error, data) => {
    if (error) {
      console.error(error);
      throw error;
    }
    return JSON.parse(data.toString());
  });
};

export const writeData = (data: string): any => {
  fs.writeFile("db.json", data, "utf8", (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
      return err;
    } else {
      console.log(`File is written successfully!`);
      return false;
    }
  });
};
