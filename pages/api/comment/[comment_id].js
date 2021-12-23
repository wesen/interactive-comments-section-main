import { supabase } from '../../../src/supabase'
import { getAllComments, getDbComment } from '../../../src/helpers'

const deleteComment = async (comment_id, res) => {
  const { data, error } = await supabase
    .from('comments')
    .delete()
    .eq('id', comment_id)
  console.log('deleted', data)
  if (error !== undefined && error !== null) {
    res.status(500).send({
      message: `Could not delete comment: ${comment_id}`,
      error,
    })
    return
  }
  res.status(200).json({ deleted_id: comment_id })
}

const updateComment = async (comment_id, { content }, res) => {
  const { data, error } = await supabase
    .from('comments')
    .update({ content })
    .eq('id', comment_id)

  console.log('updateComment', data)
  if (data.length < 1) {
    res.status(500).send({
      message: `Could not insert new comment`,
      error: 'No result returned from DB',
    })
  }

  if (error !== undefined && error !== null) {
    res.status(500).send({
      message: `Could not update comment: ${comment_id}`,
      error,
    })
    return
  }

  let updatedComment = await getDbComment(data[0].id)
  if (updatedComment == null) {
    res.status(500).send({
      message: `Could not retrieve newly created comment`,
      error: `Could not retrieve newly created comment`,
    })
    return
  }
  res.status(200).json(updatedComment)
}

export default async function handler(req, res) {
  let { comment_id } = req.query
  comment_id = parseInt(comment_id)

  if (req.method === 'DELETE') {
    await deleteComment(comment_id, res)
  } else if (req.method === 'POST') {
    await updateComment(comment_id, req.body, res)
  } else {
    res.status(500).send({
      message: `Unsupported method: ${req.method}`,
    })
  }
}
