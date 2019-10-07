const Image = require('../database/models/images.model')
const {User} = require('../database/models/user.model')
const Comment = require('../database/models/comments.model')
const {WrongData, NotFoundError} = require('../lib/errors')

module.exports.addComment = async(req, res, next) => {
  try {
    let userID = req.user._id
    let imageID = req.params.id

    const comment = new Comment({
      text: req.body.text,
      user: userID,
      image_id: imageID
    })

    await comment.save()

    // const user = await User.findById(userID)
    // await user.comments.unshift(comment._id)
    // await user.save()

    const image = await Image.findById(imageID)
    await image.comments.unshift(comment._id)
    await image.save()

    res.json({
      status: 'success',
      data: {comment}
    })

  } catch (err) {
    // console.log(err)
    next(new WrongData())
  }
}

module.exports.getCommentByImageId = async (req, res, next) => {
  try{
    await Comment
      .find({image_id: req.params.id})
      .populate('user')
      .exec((err, comments) => {
        res.json({
          status:'success',
          data: {comments}
        })
      })
  } catch (err) {
    // console.log(err)
    next(new NotFoundError())
  }
  // console.log(comments)
}