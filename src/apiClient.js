export const createComment = (content) => {
  return fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: content }),
  })
    .then((res) => res.json())
    .then(
      (data) =>
        new Promise((resolve, reject) => {
          if (data.error !== undefined) {
            reject(data.error)
          } else {
            resolve(data.comments)
          }
        }),
    )
}

export const updateComment = (id, content) => {
  console.log('POST body content', content)
  return fetch(`/api/comment/${id}`, {
    method: 'POST',
    body: content,
  })
    .then((res) => res.json())
    .then(
      (data) =>
        new Promise((resolve, reject) => {
          if (data.error !== undefined) {
            reject(data.error)
          } else {
            resolve(data.comments)
          }
        }),
    )
}

export const deleteComment = (id, content) => {
  return fetch(`/api/comment/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then(
      (data) =>
        new Promise((resolve, reject) => {
          if (data.error !== undefined) {
            reject(data.error)
          } else {
            resolve(data.comments)
          }
        }),
    )
}
