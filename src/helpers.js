import { supabase } from './supabase'
import TimeAgo from 'javascript-time-ago'

const timeAgo = new TimeAgo('en-US')

export const cleanupDbUser = (singleUser) => {
  if (singleUser === undefined || singleUser === null) {
    return null
  }
  return {
    ...singleUser,
    image: {
      png: `./images/avatars/image-${singleUser?.username}.png`,
    },
  }
}

export const getSingleUser = async function () {
  const { data: singleUser, error: userError } = await supabase
    .from('users')
    .select()
    .eq('id', 3)
    .single()
  return singleUser
}

export const cleanupDbComment = (c) => {
  const createdAt = Date.parse(c.created_at)

  return {
    id: c.id,
    content: c.content,
    createdAt: timeAgo.format(createdAt),
    score: c.score,
    replyingTo: c.replying_to?.user_id?.username,
    replyToId: c.reply_to_id,
    user: cleanupDbUser(c.user),
  }
}

export const commentToDbComment = (c) => {
  return {
    id: c.id,
    content: c.content,
    score: 0,
    reply_to_id: c.replyingToId,
    post_id: 1,
  }
}

export let getAllComments = async function () {
  const { data: allComments, error: commentError } = await supabase
    .from('comments')
    .select(
      `id, content, score, created_at,  user: user_id(id, username), reply_to_id, replying_to: reply_to_id(user_id(username))`,
    )

  const cleanedComments = allComments.map(cleanupDbComment)

  let commentsByParentId = cleanedComments.reduce((res, comment) => {
    const parentId = comment['replyToId'] || null
    res.set(parentId, [...(res.get(parentId) || []), comment])
    return res
  }, new Map())

  for (let comment of cleanedComments) {
    comment['replies'] = commentsByParentId.get(comment['id']) ?? []
  }

  const commentsById = cleanedComments.reduce((res, comment) => {
    res.set(comment.id, comment)
    return res
  }, new Map())

  const topLevelComments = commentsByParentId.get(null) || []

  return { comments: cleanedComments, topLevelComments, commentsById }
}
