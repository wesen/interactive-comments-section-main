import { getAllComments } from '../../../../src/helpers'
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
    const body = JSON.parse(req.body)
    const { data, error } = await supabase.from('comments').insert({
      user_id: 3,
      content: body.content,
      score: 0,
      created_at: Date.now(),
      post_id: 1,
      reply_to_id: comment_id,
    })
    if (error !== undefined) {
      res.status(500).send({
        message: `Could not insert new reply`,
      })
      return
    }
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
    if (error !== undefined && error !== null) {
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
    if (error !== undefined && error !== null) {
      res.status(500).send({
        message: `Could not upvote comment ${comment_id}`,
      })
      return
    }
  } else {
    res.status(500).send({
      message: `Unknown verb: ${verb}`,
    })
  }

  let { commentsById } = await getAllComments()
  res.status(200).json(commentsById.get(comment_id))
}
