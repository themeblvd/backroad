const express = require('express');
const jwtValidate = require('express-jwt');

/**
 * Creates an Express router instance to
 * handle articles.
 *
 * @param {Object} config       Applicatoin configuration.
 * @param {Object} contentTypes All registered content types.
 * @param {Array}  schemas      All currently created schemas.
 * @return {Object} Express.Router() instance.
 */
function articlesRouter(config, contentTypes, schemas) {
  const router = express.Router();
  const { secret } = config;
  const { Article } = schemas;

  /**
   * Get articles (always public).
   *
   * This produces raw articles of all content
   * types. While publicly accessible, the /articles
   * endpoint is more intended for use by the
   * admin client.
   *
   * So in most cases, when publicly querying
   * articles you'll use the content type-specific
   * endpoint like `/api/v1/<content-type>/`,
   * which will flatten fields into each article object.
   */
  router.get('/', function(req, res) {
    // Get an individual article, by the slug.
    if (req.query.slug) {
      Article.findOne({ slug: req.query.slug }, function(err, article) {
        if (err) {
          return res
            .status(404)
            .send({ message: `Could not find article with slug "${req.query.slug}".` });
        }
        return res.status(200).send(article);
      });
    } else {
      // Get a set of articles.
      const query = {};

      if (req.query.content_type) {
        query.content_type = req.query.content_type;
      }

      if (req.query.created_by) {
        query.created_by = req.query.created_by;
      }

      // ?field_name=<field>&field_value=<value>
      if (req.query.field_name && req.query.field_value) {
        query[`fields.${req.query.field_name}`] = req.query.field_value;
      }

      const orderBy = req.query.orderBy ? req.query.orderBy : 'createdAt';
      const order = req.query.order ? req.query.order : 'desc';
      const per_page = req.query.per_page ? Number(req.query.per_page) : 0;
      const page = req.query.page ? Number(req.query.page) : 1;

      Article.find(query)
        .sort({ [orderBy]: order })
        .exec(function(err, articles) {
          if (err) {
            return res.status(500).send(err);
          }

          if (per_page) {
            const start = per_page * page - per_page;
            const end = per_page * page;
            return res.status(200).send(articles.slice(start, end));
          }

          return res.status(200).send(articles);
        });
    }
  });

  router.get('/:id', function(req, res) {});

  /**
   * Add a new article.
   *
   * NOTE: Request will fail without content_type
   * query parameter (i.e. `/api/v1/articles/?content_type=foo`).
   *
   * @TODO standard sanitization for req.body.fields, based on content type.
   */
  router.post('/', jwtValidate({ secret }), function(req, res) {
    const currentContentType = req.query.content_type;

    if (!currentContentType) {
      return res.status(500).send({
        message: 'The "content_type" query parameter is required for creating new articles.'
      });
    }

    if (!contentTypes.find(type => type.id === currentContentType)) {
      return res.status(500).send({
        message: "The content type doesn't exist or isn't registered."
      });
    }

    const article = new Article({
      ...req.body,
      created_by: req.user.username,
      content_type: currentContentType
    });

    article.save((err, newArticle) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send(newArticle);
    });
  });

  /**
   * Edit an article.
   */
  router.put('/:id', jwtValidate({ secret }), function(req, res) {
    const data = req.body;

    if (data.content_type) {
      delete data.content_type; // Contnet type can't be changed.
    }

    Article.findByIdAndUpdate(req.params.id, data, { new: true }, (err, updatedArticle) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send(updatedArticle);
    });
  });

  /**
   * Delete an article.
   */
  router.delete('/:id', jwtValidate({ secret }), function(req, res) {
    Article.findByIdAndRemove(req.params.id, err => {
      if (err) return res.status(500).send(err);
      return res.sendStatus(204);
    });
  });

  return router;
}

/**
 * Export factory function.
 */
module.exports = articlesRouter;
