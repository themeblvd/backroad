const env = require('dotenv').config();
const backroad = require('../..'); // require('backroad')

const app = backroad(); // Creates new instance.

app.addContentType({
  name: 'Page',
  pluralName: 'Pages',
  endpoint: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      default: '' // optional
    },
    {
      name: 'content',
      type: 'markdown'
    }
  ]
});

app.start();
