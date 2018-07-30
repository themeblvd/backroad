const post = {
  id: 'post',
  endpoint: 'posts',
  name: 'Post',
  pluralName: 'Posts',
  fields: [
    {
      id: 'content',
      name: 'Content',
      type: 'rich-text',
      placeholder: 'Start writing...'
    },
    {
      id: 'category',
      type: 'select',
      options: ['Tutorials', 'Rants', 'Adventures']
    }
  ]
};

const page = {
  id: 'page',
  endpoint: 'pages',
  name: 'Page',
  pluralName: 'Pages',
  fields: [
    {
      id: 'content',
      type: 'rich-text',
      placeholder: 'Start writing...'
    }
  ]
};

const book = {
  id: 'book',
  endpoint: 'books',
  name: 'Book',
  pluralName: 'Books',
  fields: [
    {
      id: 'author',
      name: 'Author',
      type: 'text'
    },
    {
      id: 'desc',
      name: 'Description',
      type: 'textarea'
    },
    {
      id: 'genre',
      name: 'Genre',
      type: 'select',
      default: 'General',
      options: ['General', 'Adventure', 'Suspense', 'Romance', 'Comedy']
    }
  ]
};

module.exports = { post, page, book };
