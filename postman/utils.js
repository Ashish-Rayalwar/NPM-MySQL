const { Collection, Item, Header } = require('postman-collection');


const postmanCollection = new Collection({
    info: {
      // Name of the collection
      name: 'clothup_test'
    },
    // Requests in this collection
    item: [],
  });
  
  const postmanFolder = new Collection({
      info: {
        // Name of the collection
        name: 'user'
      },
      // Requests in this collection
      item: [],
    });
  const postmanSubFolder = new Collection({
      info: {
        // Name of the collection
        name: 'user'
      },
      // Requests in this collection
      item: [],
    });


    const rawHeaderString =
  'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

// Parsing string to postman compatible format
const rawHeaders = Header.parse(rawHeaderString);

// Generate headers
const requestHeader = rawHeaders.map((h) => new Header(h));

// API endpoint
const apiEndpoint = 'https://httpbin.org/post';

// Name of the request
const requestName = 'Sample request name';

// Request body
const requestPayload = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};

// Add tests for request
const requestTests = `
pm.test('Sample test: Test for successful response', function() {
  pm.expect(pm.response.code).to.equal(200);
});
`


    module.exports = {postmanCollection,postmanSubFolder, postmanFolder,rawHeaders,requestTests,requestPayload,requestName,apiEndpoint,requestHeader}
