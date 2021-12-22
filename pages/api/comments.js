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
  const data = JSON.parse(req.body)

  let { topLevelComments } = await getAllComments()

  const { data: result, error } = await supabase
    .from('users')
    .insert(commentToDbComment(data))

  if (error !== undefined && error !== null) {
    res.status(500).send({
      message: `Could not insert new comment`,
      error,
    })
    return
  }

  res.status(200).json({
    currentUser: cleanupDbUser(singleUser),
    comments: topLevelComments,
  })
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await handleCreateComment(req, res)
  } else {
    await handleGetAllComments(res)
  }
}
