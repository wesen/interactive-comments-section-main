import { supabase } from '../../../src/supabase'

const deleteComment = async (comment_id, res) => {
  const { data, error } = await supabase
    .from('comments')
    .delete()
    .eq('id', comment_id)
  if (error !== undefined && error !== null) {
    res.status(500).send({
      message: `Could not delete comment: ${comment_id}`,
      error,
    })
    return
  }
  res.status(200).send()
}

const updateComment = async (comment_id, data, res) => {}

export default async function handler(req, res) {
  let { comment_id } = req.query
  comment_id = parseInt(comment_id)

  if (req.method === 'DELETE') {
    await deleteComment(comment_id, res)
  } else if (req.method === 'POST') {
    await updateComment(comment_id, JSON.parse(req.body), res)
  } else {
    res.status(500).send({
      message: `Unsupported method: ${req.method}`,
    })
  }
}
