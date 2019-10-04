const Image = require('../database/models/images.model')
const {User} = require('../database/models/user.model')
const Comment = require('../database/models/comments.model')

module.exports.addComment = async(req, res) => {
  try {
    let userID = req.user._id
    let imageID = req.body.image_id

    const comment = new Comment({
      text: req.body.text,
      user_id: userID,
      image_id: imageID
    })

    await comment.save()

    const user = await User.findById(userID)
    await user.comments.unshift(comment._id)
    await user.save()

    const image = await Image.findById(imageID)
    await image.comments.unshift(comment._id)
    await image.save()

    res.json({
      status: 'success',
      data: {comment}
    })

  } catch (err) {
    console.log(err)
  }
}

module.exports.getCommentByImageId = async (req, res) => {
  try{
    await Comment
      .find({image_id: req.params.id})
      .populate('users')
      .exec((err, comments) => {
        res.json({
          status:'success',
          data: {comments}
        })
      })
  } catch (err) {
    console.log(err)
  }
  // console.log(comments)
}