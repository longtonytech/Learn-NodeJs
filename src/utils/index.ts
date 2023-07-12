import fs from "fs";

export const readData = (): any => {
  try {
    const data = fs.readFileSync("db.json", "utf8");
    return JSON.parse(data.toString());
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
    return null;
  }
};

export const writeData = (data: string): any => {
  try {
    fs.writeFileSync("db.json", data, "utf8");
    console.log(`File is written successfully!`);
    return false;
  } catch (err) {
    console.log(`Error writing file: ${err}`);
    return err;
  }
};
