const { Collection, Item, Header } = require('postman-collection');
const fs = require('fs');
const path = require('path');
const express = require('express');

const basePath = path.join(__dirname, '../routes');
const postmanCollection = new Collection({
    info: {
        name: 'ClothupTest',
    },
    item: [],
});

function createPostmanCollection(basePath, currentFileName, currentPath = '', parentFolder = postmanCollection) {
    const fullPath = path.join(basePath, currentPath);
    console.log(basePath, "basepath");
    console.log(fullPath, "fullPath");

    const folderName = path.basename(currentPath);

    console.log(folderName, "folderName");
    console.log(currentFileName, "currentFileName");

    let currentFolder = new Collection({
        name: currentFileName,
        item: [],
    });

    parentFolder.items.add(currentFolder);

    console.log(fs.readdirSync(fullPath), "filesystem");

    fs.readdirSync(fullPath).forEach(async (file) => {
        console.log(file, "file");
        const filePath = path.join(fullPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            // Only consider JavaScript files at the root level
            console.log("working");
            const routePath = path.join(currentPath, path.basename(file, '.js'));
            console.log(routePath, "routePath");
            const requirePath = `require('${filePath}')`;
            console.log(requirePath, "requirePath");
            await createPostmanCollection(basePath, file, path.join(currentPath, file), currentFolder);
        } else if (stats.isFile() && file.endsWith('.js')) {
            const routePath = path.join(currentPath, path.basename(file, '.js'));
            console.log("working with file:", file);
            const requirePath = `require('${filePath}')`;
            console.log(routePath, "routePath");
            console.log(requirePath, "requirePath");
            const createRouterFunction = require(filePath);
            const router = express.Router();
            createRouterFunction(router);
            router.stack.forEach((layer) => {
                const route = layer.route;
                const method = Object.keys(route.methods)[0].toUpperCase();
                console.log(routePath,"routePath");
                let formattedRoutePath = formatRoutePath(routePath);
                let formattedPath = formatRoutePath(route.path);

                const item = new Item({
                    name: `${formattedPath}`,
                    request: {
                        method: method,
                        header: [
                            new Header({
                                key: 'Content-Type',
                                value: 'application/json',
                            }),
                            new Header({
                                key: 'Authorization',
                                value: 'YourAuthorizationHeaderValue', // Add your Authorization header value
                            }),
                            // Add other headers as needed
                        ],
                        url: `http://localhost:5000/${formattedRoutePath}/${formattedPath}`,
                        body: {
                            mode: 'raw',
                            raw: JSON.stringify({ key1: 'value1', key2: 'value2', key3: 'value3' }),
                        },
                    },
                    event: [
                        {
                            listen: 'test',
                            script: {
                                type: 'text/javascript',
                                exec: `
pm.test('Sample test: Test for successful response', function() {
  pm.expect(pm.response.code).to.equal(200);
});
`,
                            },
                        },
                    ],
                });

                currentFolder.items.add(item);
            });
        }
    });
}

// Ignore for the root directory
createPostmanCollection(basePath, "root");



function formatRoutePath(routePath) {
    // Add your logic to format the routePath as needed
    return routePath.replace(/^\//, ''); // Remove leading '/'
}



const collectionJSON = postmanCollection.toJSON();

fs.writeFile('./collection.json', JSON.stringify(collectionJSON, null, 2), (err) => {
    if (err) { console.log(err); }
    console.log('File saved');
});
