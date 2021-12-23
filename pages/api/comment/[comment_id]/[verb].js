import { getAllComments, getDbComment } from '../../../../src/helpers'
import { supabase } from '../../../../src/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).send({
      message: 'Only POST requests allowed',
    })
  }
  let { comment_id, verb } = req.query
  comment_id = parseInt(comment_id)

  if (verb === 'reply') {
    const { content } = req.body
    const { data, error } = await supabase.from('comments').insert({
      user_id: 2,
      content: content,
      score: 0,
      created_at: new Date(),
      post_id: 1,
      reply_to_id: comment_id,
    })
    if (error != null) {
      res.status(500).send({
        message: `Could not insert new reply`,
        error,
      })
      return
    }
    if (data.length < 1) {
      res.status(500).send({
        message: `Could not insert new comment`,
        error: 'No result returned from DB',
      })
      return
    }
    comment_id = data[0].id
  } else if (verb === 'upvote') {
    const { data: comment, error: getCommentError } = await supabase
      .from('comments')
      .select()
      .eq('id', comment_id)
      .single()
    if (comment === undefined) {
      res.status(404).send({
        message: `Could not find comment ${comment_id}`,
        error: getCommentError,
        comment_id: comment_id,
      })
      return
    }
    const { data, error } = await supabase
      .from('comments')
      .update({ score: comment.score + 1 })
      .eq('id', comment_id)
    if (error != null) {
      res.status(500).send({
        message: `Could not upvote comment ${comment_id}`,
        error,
      })
      return
    }
  } else if (verb === 'downvote') {
    const { data: comment, error: getCommentError } = await supabase
      .from('comments')
      .select()
      .eq('id', comment_id)
      .single()
    if (comment === undefined) {
      res.status(404).send({
        message: `Could not find comment ${comment_id}`,
      })
      return
    }
    const { data, error } = await supabase
      .from('comments')
      .update({ score: Math.max(0, comment.score - 1) })
      .eq('id', comment_id)
    if (error != null) {
      res.status(500).send({
        message: `Could not upvote comment ${comment_id}`,
        error,
      })
      return
    }
  } else {
    res.status(500).send({
      message: `Unknown verb: ${verb}`,
    })
  }

  let updatedComment = await getDbComment(comment_id)
  if (updatedComment == null) {
    res.status(500).send({
      message: `Could not retrieve newly created comment`,
      error: `Could not retrieve newly created comment`,
    })
    return
  }
  res.status(200).json(updatedComment)
}
