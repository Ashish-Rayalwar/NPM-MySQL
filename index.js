const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const basePath = path.join(__dirname, "routes");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(multer().any());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

function printRoutes(basePath, currentPath = "") {
  const fullPath = path.join(basePath, currentPath);

  fs.readdirSync(fullPath).forEach(async (file) => {
    const filePath = path.join(fullPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      printRoutes(basePath, path.join(currentPath, file));
    } else if (stats.isFile() && file.endsWith(".js")) {
      const routePath = path.join(currentPath, path.basename(file, ".js"));
      console.log(routePath, "routePath");
      const requirePath = `require('${filePath}')`;
      // console.log(`${currentPath}\n${requirePath}, ${formatRoutePath(routePath)}\n`);

      const createRouterFunction = require(filePath);
      const router = express.Router(); // Assuming express is imported
      createRouterFunction(router); // Pass the router to your module
      app.use(`api/${formatRoutePath(routePath)}`, router);
      console.log(`Mounted routes for ${formatRoutePath(routePath)}`);
      console.log(
        `${currentPath}\n${requirePath}, ${formatRoutePath(routePath)}`
      );
      router.stack.forEach((layer) => {
        const route = layer.route;
        const method = Object.keys(route.methods)[0].toUpperCase();
        let path = route.path;
        console.log(
          `${method} ${formatRoutePath(routePath)}/${formatRoutePath(path)}`
        );
      });
    }
  });
}

// Helper function to format route paths
function formatRoutePath(path) {
  return path.replace(/\\/g, "/").replace(/^\/|\/$/g, ""); // Convert backslashes to forward slashes and remove leading/trailing slashes
}

printRoutes(basePath);

app.listen(5000, async () => {
  try {
    console.log(`server start on port 5000`);
  } catch (error) {
    return resizeBy.status(500).json({ status: false, message: error.message });
  }
});
