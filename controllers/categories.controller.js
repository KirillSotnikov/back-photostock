const Category = require('../database/models/categories.model')
const {NotFoundError, UnauthorizedError, WrongParametersError} = require('../lib/errors')

module.exports.getAllCategories = async(req, res, next) => {
  try{
    const categories = await Category.find()
    res.json({
      status: 'success',
      data: {categories},
      total: categories.length
    })
  } catch(err) {
    next(new NotFoundError())
    // throw new NotFoundError()
    // console.log(err)
  }
}

module.exports.createCategory = async(req, res, next) => {
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
  } catch {
    next(new WrongParametersError())
    // throw new WrongParametersError()
    // console.log(err)
  }
}

module.exports.getCategoryById = async(req, res, next) => {
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
    next(new NotFoundError())
    // console.log(err)
  }
}