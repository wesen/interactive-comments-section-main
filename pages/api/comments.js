import allComments from '../../frontend-mentor-project/comments.json'
import foo from '../../frontend-mentor-project/data.json'

export default function handler(req, res) {
  let commentsByParentId = allComments.reduce((res, comment) => {
    const parentId = comment['replyToId'] || null
    res.set(parentId, [...(res.get(parentId) || []), comment])
    return res
  }, new Map())
  const topLevelComments = commentsByParentId.get(null) || []
  for (let comment of allComments) {
    comment['replies'] = commentsByParentId.get(comment['id']) ?? []
  }

  res.status(200).json({
    currentUser: foo.currentUser,
    comments: topLevelComments,
  })
}
