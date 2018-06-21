const env = require('dotenv').config();
const backroad = require('../..'); // require('backroad')

const app = backroad(); // Creates new instance.

app.addContentType({
  name: 'Page',
  pluralName: 'Pages',
  endpoint: 'pages',
  fields: [
    {
      name: 'content',
      type: 'markdown',
      default: 'Some optional default content...'
    }
  ]
});

app.start();
