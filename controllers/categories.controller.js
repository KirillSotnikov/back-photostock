const Category = require('../database/models/categories.model')
const {NotFoundError, UnauthorizedError, WrongParametersError} = require('../lib/errors')

module.exports.getAllCategories = async(req, res) => {
  try{
    const categories = await Category.find()
    res.json({
      status: 'success',
      data: {categories},
      total: categories.length
    })
  } catch(err) {
    throw new NotFoundError()
    // console.log(err)
  }
}

module.exports.createCategory = async(req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      label: req.body.filePath
    })

    await category.save()

    res.json({
      status: 'success',
      data: category
    })
  } catch (err) {
    throw new WrongParametersError()
    // console.log(err)
  }
}

module.exports.getCategoryById = async(req, res) => {
  try{
    await Category
      .findOne({_id: req.params.id})
      .populate('images')
      .exec((error, category) => {
        res.json({
          status: 'success',
          data: {category}
        })
      })
  } catch(err) {
    console.log(err)
  }
}



