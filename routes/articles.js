const Article = require('../models/Article')
const router = require('express').Router()

// Ajouter un article
router.post('/add', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    cover: req.body.cover,
    category: req.body.category
  });
  try {
    const newArticle = await article.save();
    res.status(201).json({ newArticle });
  } catch (err) {
    res.status(400).json({ message: err });
  }
})

// Afficher tous les articles
router.get('/', async (req, res) => {
  const article = await Article.find().populate('category', 'title')
  try {
    res.status(201).json({ article });
  } catch (err) {
    res.status(400).json({ message: err });
  }
} )

// Afficher les articles par catégory
router.get('/bycategories/:id', async (req, res) => {
  const articles = await Article.find({ category: req.params.id }).populate('category', 'title')

  try {
    res.status(201).json({articles})
  }  catch (err) {
    res.status(400).json({ message: err });
  }

})

// Mettre à jour un article
router.put('/:id', async (req, res) => {

  try {
    await Article.updateOne(
      {_id: req.params.id},
      {title: req.body.title,
      content: req.body.content,
      cover: req.body.cover,
      category: req.body.category}
    )
    res.status(201).send('Article mis à jour avec succès !')
  } catch (err) {
    res.status(400).json({ message: err });
  }
})

// Supprimer un article
router.delete('/:id', async (req, res) => {
  try {
    await Article.deleteOne({_id : req.params.id})
    res.status(201).send('Article supprimé avec succès !')
  } catch (err) {
    res.status(400).json({ message: err });
  }
})

module.exports = router;