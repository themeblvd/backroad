# Back Road

Back Road is a headless CMS framework built with the MERN stack (MongoDB, Express, React, and NodeJS).

My ultimate goal with this project is to create a framework that helps developers give their clients an admin interface to manage content. That content is then served to a public API which can be consumed by whatever technology the developer wants to use on the front-end.

## Current Progress

Although it's still very much a work in progress, check out the screenshots below that explain its current functionality, to this point.

Here's the implementation code powering the example used in the screenshots.

```
const backroad = require('backroad');
const { post, page, book, movie } = require('./content-types');

/**
 * Create new Back Road application.
 */
const app = backroad();

/**
 * Add custom content types.
 */
app.contentTypes.add(post);
app.contentTypes.add(page);
app.contentTypes.add(book);
app.contentTypes.add(movie);

/**
 * Run the application!
 */
app.start();
```

When no `admin` role user exists in the database, starting up the server and visiting the application redirects you to an installation process, where you can create the first admin user.

![Sreenshot](https://raw.githubusercontent.com/themeblvd/backroad/master/screenshot-1.jpg)

After that, the application is installed, and you can log in.

![Sreenshot](https://raw.githubusercontent.com/themeblvd/backroad/master/screenshot-2.jpg)

Upon logging in, you're presented with this dashboard. Currently, this is just an overview all created content from all content types. In the future, hopefully this dashboard can be made more useful.

![Sreenshot](https://raw.githubusercontent.com/themeblvd/backroad/master/screenshot-3.jpg)

All content types need to be added via the API methods of the framework. You can see in this example, we've got Posts, Pages, Books, and Movies. Each content type the developer adds can then be managed separately by the user.

![Sreenshot](https://raw.githubusercontent.com/themeblvd/backroad/master/screenshot-4.jpg)

When the user adds or edits content of a certain type, they're presented with the specific fields set up by the developer for that content type.

![Sreenshot](https://raw.githubusercontent.com/themeblvd/backroad/master/screenshot-5.jpg)

And you can see below that the example content type, Movie, has different fields set up for it.

The code example above had the content type configuration objects tucked away in another file to keep things clean. But here's an example, of what the code to make the "Movie" content type looks like, in full.

```
app.contentTypes.add({
  id: 'movie',
  name: 'Movie',
  endpoint: 'movies',
  pluralName: 'Movies',
  fields: [
    {
      id: 'desc',
      name: 'Movie Description',
      help: 'Enter a description',
      type: 'textarea'
    },
    {
      id: 'genre',
      name: 'Movie Genre',
      type: 'select',
      options: ['Action', 'Romance', 'Comedy']
    }
  ]
});
```

And you can see the result, based on the configuration object passed to the `contentTypes` API.

![Sreenshot](https://raw.githubusercontent.com/themeblvd/backroad/master/screenshot-6.jpg)

And of course, user management is going to be an important aspect of any CMS. There are currently two roles a user can have, `admin` or `editor`. At this point, the difference is basically just that an admin can edit users and an editor can't, other than their own profile.

![Sreenshot](https://raw.githubusercontent.com/themeblvd/backroad/master/screenshot-7.jpg)

And here's what it looks like when editing a user.

![Sreenshot](https://raw.githubusercontent.com/themeblvd/backroad/master/screenshot-8.jpg)
