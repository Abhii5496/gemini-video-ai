import { getLoggedInStorage } from "./mega-login";

export async function getMegaFile(name = "") {
  const storage = await getLoggedInStorage();
  //   const megaFiles = storage.root.children.map((e) => e.name);

  const file = storage.find(name);

  console.log(file);
  if (!file) {
    alert("File not found!");
    return;
  }
  //   console.log(file);
  const link = await file.link();
  console.log(link);
  return link;
}

export async function uploadToMega(file) {
  if (file) {
    const storage = await getLoggedInStorage();
    const folderName = "Gemini";

    let megaFolder = storage.find(folderName);

    if (!megaFolder) {
      try {
        megaFolder = await storage.mkdir(folderName);
        console.log("Folder created");
      } catch (error) {
        console.error("Error creating folder:", error);
        alert("Could not create the folder!");
        return;
      }
    }

    // console.log(megaFolder);
    const fileData = await file.arrayBuffer();
    try {
      console.log("starting ....");
      const result = await megaFolder.upload(
        { name: file.name },
        new Uint8Array(fileData)
      ).complete;
      console.log("The file was uploaded!", result);
      const link = getMegaFile(file.name);
      return link;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  } else {
    console.log("No file selected");
  }
}
