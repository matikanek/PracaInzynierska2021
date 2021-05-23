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
  articleRouter
    .route('/articles/:articleId')
    .get((req, res) => {
      Article.findById(req.params.articleId, (err, article) => {
        if (err) {
          return res.send(err);
        }
        return res.json(article);
      });
    })
    .put((req, res) => {
      Article.findById(req.params.articleId, (err, article) => {
        if (err) {
          return res.send(err);
        }
        article.CORA_ID = req.body.CORA_ID;
        article.TITLE = req.body.TITLE;
        article.YEAR = req.body.YEAR;
        article.AUTHORS = req.body.AUTHORS;
        article.CLASS = req.body.CLASS;
        article.CITED_BY = req.body.CITED_BY;
        article.CITING = req.body.CITING;
        article.KEYWORDS = req.body.KEYWORDS;
        article.save();
        return res.json(article);
      });
    });

  return articleRouter;
}

module.exports = routes;
