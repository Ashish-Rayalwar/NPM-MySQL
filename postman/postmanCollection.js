const { Collection, Item, Header } = require("postman-collection");
const { requestHeader, requestPayload, requestTests } = require("./utils");
const fs = require("fs");
const path = require("path");
const basePath = path.join(__dirname, "../routes");
require("dotenv").config();
let BASE_URL = process.env.BASE_URL || "http://localhost:5000/api";
let collectionName = process.env.DB || "test";
function getFolders(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function extractRouteDetails(fileData, folder, file) {
  const routeDetails = [];
  const routePattern = /router\.(\w+)\(["'](\S+)["']\s*,\s*(\w+)\)/g;
  const lines = fileData.split("\n");
  file = file.replace(".js", "");

  for (const line of lines) {
    // Skip lines starting with //
    if (!line.trim().startsWith("//")) {
      let match;
      while ((match = routePattern.exec(line)) !== null) {
        const method = match[1];
        const path = match[2];
        const handler = match[3];
        const endpoint = `/${folder}/${file}${path}`;
        routeDetails.push({ method, path, endpoint, handler });
      }
    }
  }

  return routeDetails;
}

// Create the main collection
const postmanCollection = new Collection({
  info: {
    name: collectionName,
  },
  item: [],
});

const folders = getFolders(basePath);

folders.forEach((folder) => {
  // Create a folder for each route folder
  const postmanFolder = new Collection({
    info: {
      name: folder,
    },
    item: [],
  });

  const folderPath = path.join(basePath, folder);
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    // Create a subfolder for each route file
    const postmanSubFolder = new Collection({
      info: {
        name: file.replace(".js", ""),
      },
      item: [],
    });

    const filePath = path.join(folderPath, file);
    const fileData = fs.readFileSync(filePath, "utf-8");
    console.log(fileData, "fileData");
    const routeDetails = extractRouteDetails(fileData, folder, file);
    console.log(routeDetails, "routedetails");
    routeDetails.forEach((route) => {
      // console.log(route, "route");
      const method = route.method;
      let path;
      if (route.path == "/") {
        path = file;
      } else {
        path = route.path.replace("/", "");
      }

      const endpoint = route.endpoint;

      // Create a request for each route
      const postmanRequest = new Item({
        name: `${path}`,
        request: {
          header: Header.create(requestHeader),
          url: `${BASE_URL}${endpoint}`,
          method: method,
          body: {
            mode: "raw",
            raw: JSON.stringify(requestPayload),
          },
          auth: null,
        },
        event: [
          {
            listen: "test",
            script: {
              type: "JSON",
              exec: requestTests,
            },
          },
        ],
      });

      // Add the request to the subfolder
      postmanSubFolder.items.add(postmanRequest);
    });

    // Add the subfolder to the folder
    postmanFolder.items.add(postmanSubFolder);
  });

  // Add the folder to the main collection
  postmanCollection.items.add(postmanFolder);
});

// Write the final collection to a file
const collectionJSON = postmanCollection.toJSON();

function transformPostmanFormat(input) {
  const output = {
    info: input.info,
    item: input.item.map((topLevelItem) => ({
      name: topLevelItem.info.name,
      item: (topLevelItem.item || []).map((nestedItem) => ({
        name: nestedItem.info.name,
        item: (nestedItem.item || []).map((innerItem) => ({
          name: innerItem.name,
          request: innerItem.request,
          response: innerItem.response,
        })),
      })),
    })),
  };

  return output;
}

// Transform the collection format
const transformedCollection = transformPostmanFormat(collectionJSON);

// Write the transformed collection to a file
fs.writeFile(
  "./collection.json",
  JSON.stringify(transformedCollection, null, 2),
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File saved");
    }
  }
);
