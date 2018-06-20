const env = require('dotenv').config();
const Backroad = require('../..'); // require('backroad')

const app = new Backroad();

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
