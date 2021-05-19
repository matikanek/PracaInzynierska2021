const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleModel = new Schema({
  CORA_ID: { type: Number },
  TITLE: { type: String },
  YEAR: { type: Number },
  AUTHORS: { type: String },
  CLASS: { type: String },
  CITED_BY: { type: [Number] },
  CITING: { type: [Number] },
  KEYWORDS: { type: [Number] },
});

module.exports = mongoose.model('articles', articleModel);
