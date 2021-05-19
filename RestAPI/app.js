const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/CORA_DS');
const articleRouter = express.Router();
const port = process.env.PORT;
const Article = require('./models/articleModel');

articleRouter.route('/articles').get((req, res) => {
  const { query } = req;
  Article.find(query, (err, articles) => {
    if (err) {
      return res.send(err);
    }
    return res.json(articles);
  });
});
articleRouter.route('/articles/:articleId').get((req, res) => {
  Article.findById(req.params.articleId, (err, article) => {
    if (err) {
      return res.send(err);
    }
    return res.json(article);
  });
});
app.use('/api', articleRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
