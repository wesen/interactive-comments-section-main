import { supabase } from '../../src/supabase'
import {
  cleanupDbUser,
  getAllComments,
  commentToDbComment,
  getSingleUser,
} from '../../src/helpers'

const handleGetAllComments = async function (res) {
  const singleUser = await getSingleUser()
  let { topLevelComments } = await getAllComments()

  res.status(200).json({
    currentUser: cleanupDbUser(singleUser),
    comments: topLevelComments,
  })
}

const handleCreateComment = async function (req, res) {
  const singleUser = await getSingleUser()
  const data = req.body

  const comment = commentToDbComment({ ...data, userId: singleUser.id })
  console.log('Inserting user', comment)

  const { data: result, error } = await supabase.from('comments').insert({
    ...comment,
    user_id: singleUser.id,
    created_at: new Date(),
  })

  if (error !== undefined && error !== null) {
    res.status(500).send({
      message: `Could not insert new comment`,
      error,
    })
    return
  }

  res.status(200).json({
    currentUser: cleanupDbUser(singleUser),
    comments: await getAllComments(),
  })
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await handleCreateComment(req, res)
  } else {
    await handleGetAllComments(res)
  }
}
