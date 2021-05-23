const express = require('express');

function routes(Article) {
  const articleRouter = express.Router();
  articleRouter
    .route('/articles')
    .post((req, res) => {
      const article = new Article(req.body);

      article.save();
      return res.json(article);
    })
    .get((req, res) => {
      const { query } = req;
      Article.find(query, (err, articles) => {
        if (err) {
          return res.send(err);
        }
        return res.json(articles);
      });
    });
  articleRouter.use('/articles/:articleId', (req, res, next) => {
    Article.findById(req.params.articleId, (err, article) => {
      if (err) {
        return res.send(err);
      }
      if (article) {
        req.article = article;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  articleRouter
    .route('/articles/:articleId')
    .get((req, res) => {
      res.json(req.article);
    })
    .put((req, res) => {
      const { article } = req;
      article.CORA_ID = req.body.CORA_ID;
      article.TITLE = req.body.TITLE;
      article.YEAR = req.body.YEAR;
      article.AUTHORS = req.body.AUTHORS;
      article.CLASS = req.body.CLASS;
      article.CITED_BY = req.body.CITED_BY;
      article.CITING = req.body.CITING;
      article.KEYWORDS = req.body.KEYWORDS;
      req.article.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(article);
      });
    })
    .patch((req, res) => {
      const { article } = req;

      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        article[key] = value;
      });
      req.article.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(article);
      });
    })
    .delete((req, res) => {
      req.article.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return articleRouter;
}

module.exports = routes;
