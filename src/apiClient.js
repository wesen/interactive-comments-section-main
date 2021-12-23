const apiCall = (url, body = undefined, options = {}) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body && JSON.stringify(body),
    ...options,
  }).then(
    (res) =>
      new Promise(async (resolve, reject) => {
        let body = await res.json()
        if (res.status === 200 && body.error == null) {
          resolve(body)
        } else {
          reject(body.error || body)
        }
      }),
  )
}

export const createComment = (content) => {
  return apiCall('/api/comments', {
    content: content,
  })
}

export const updateComment = (id, content) => {
  return apiCall(`/api/comment/${id}`, {
    content,
  })
}

export const upvoteComment = (id) => {
  return apiCall(`/api/comment/${id}/upvote`)
}

export const downvoteComment = (id) => {
  return apiCall(`/api/comment/${id}/downvote`)
}

export const deleteComment = (id) => {
  return apiCall(`/api/comment/${id}`, null, {
    method: 'DELETE',
  })
}

export const replyComment = (id, replyContent) => {
  return apiCall(`/api/comment/${id}/reply`, {
    content: replyContent,
  })
}
