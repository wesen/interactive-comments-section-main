import { ACTIONS, reducer } from './reducer'

test('test set comments', () => {
  expect(
    reducer(
      { comments: [] },
      {
        type: ACTIONS.SET_COMMENTS,
        payload: [],
      },
    ),
  ).toStrictEqual({ comments: [] })
})

const makeContentComment = (id, content, replies = [], score = 0) => {
  return {
    id,
    content,
    replies,
    score,
    replyToId: null,
  }
}

const makeComment = (id, replies = [], score = 0) => {
  return makeContentComment(id, `foo-${id}`, replies, score)
}

const makeContentReply = (id, content, replyToId, replies = [], score = 0) => {
  return {
    id,
    content,
    replies,
    score,
    replyToId,
  }
}

const makeReply = (id, replyToId, replies = [], score = 0) => {
  return makeContentReply(id, `foo-${id}`, replyToId, replies, score)
}

test('test add comment simple', () => {
  expect(
    reducer(
      { comments: [] },
      {
        type: ACTIONS.ADD_COMMENT,
        payload: makeComment(1),
      },
    ),
  ).toStrictEqual({
    comments: [makeComment(1)],
  })
})

test('test add comment to simple', () => {
  expect(
    reducer(
      {
        comments: [makeComment(1)],
      },
      {
        type: ACTIONS.ADD_COMMENT,
        payload: makeComment(2),
      },
    ),
  ).toStrictEqual({
    comments: [makeComment(1), makeComment(2)],
  })
})

test('test add simple reply', () => {
  expect(
    reducer(
      {
        comments: [makeComment(1)],
      },
      {
        type: ACTIONS.ADD_COMMENT,
        payload: makeReply(2, 1),
      },
    ),
  ).toStrictEqual({
    comments: [makeComment(1, [makeReply(2, 1)])],
  })
})

test('test add simple second reply', () => {
  expect(
    reducer(
      {
        comments: [makeComment(1), makeComment(2)],
      },
      {
        type: ACTIONS.ADD_COMMENT,
        payload: makeReply(3, 2),
      },
    ),
  ).toStrictEqual({
    comments: [makeComment(1), makeComment(2, [makeReply(3, 2)])],
  })
})

test('test add simple nested reply', () => {
  expect(
    reducer(
      {
        comments: [makeComment(1, [makeReply(2, 1)])],
      },
      {
        type: ACTIONS.ADD_COMMENT,
        payload: makeReply(3, 2),
      },
    ),
  ).toStrictEqual({
    comments: [makeComment(1, [makeReply(2, 1, [makeReply(3, 2)])])],
  })
})

test('test add nested second reply', () => {
  expect(
    reducer(
      {
        comments: [
          makeComment(1, [
            makeReply(2, 1, [makeReply(5, 2)]),
            makeReply(3, 1),
            makeReply(4, 1),
          ]),
        ],
      },
      {
        type: ACTIONS.ADD_COMMENT,
        payload: makeReply(6, 2),
      },
    ),
  ).toStrictEqual({
    comments: [
      makeComment(1, [
        makeReply(2, 1, [makeReply(5, 2), makeReply(6, 2)]),
        makeReply(3, 1),
        makeReply(4, 1),
      ]),
    ],
  })
})
test('test add triple nested second reply', () => {
  expect(
    reducer(
      {
        comments: [
          makeComment(1, [
            makeReply(2, 1, [makeReply(5, 2)]),
            makeReply(3, 1),
            makeReply(4, 1),
          ]),
        ],
      },
      {
        type: ACTIONS.ADD_COMMENT,
        payload: makeReply(6, 5),
      },
    ),
  ).toStrictEqual({
    comments: [
      makeComment(1, [
        makeReply(2, 1, [makeReply(5, 2, [makeReply(6, 5)])]),
        makeReply(3, 1),
        makeReply(4, 1),
      ]),
    ],
  })
})

test('test delete comment', () => {
  expect(
    reducer(
      {
        comments: [makeComment(1), makeComment(2)],
      },
      {
        type: ACTIONS.DELETE_COMMENT,
        payload: { id: 1 },
      },
    ),
  ).toStrictEqual({
    comments: [makeComment(2)],
  })
})

test('test delete reply reply', () => {
  expect(
    reducer(
      {
        comments: [makeComment(1, [makeReply(2, 1)])],
      },
      {
        type: ACTIONS.DELETE_COMMENT,
        payload: { id: 2 },
      },
    ),
  ).toStrictEqual({
    comments: [makeComment(1)],
  })
})

test('test delete second reply', () => {
  expect(
    reducer(
      {
        comments: [makeComment(1), makeComment(2), makeComment(3)],
      },
      {
        type: ACTIONS.DELETE_COMMENT,
        payload: { id: 2 },
      },
    ),
  ).toStrictEqual({
    comments: [makeComment(1), makeComment(3)],
  })
})

test('test update content', () => {
  expect(
    reducer(
      {
        comments: [makeComment(1), makeComment(2), makeComment(3)],
      },
      {
        type: ACTIONS.UPDATE_COMMENT,
        payload: { id: 2, content: 'oh yeah' },
      },
    ),
  ).toStrictEqual({
    comments: [
      makeComment(1),
      makeContentComment(2, 'oh yeah'),
      makeComment(3),
    ],
  })
})

test('test update reply', () => {
  expect(
    reducer(
      {
        comments: [makeComment(1, [makeComment(2), makeComment(3)])],
      },
      {
        type: ACTIONS.UPDATE_COMMENT,
        payload: { id: 2, content: 'oh yeah' },
      },
    ),
  ).toStrictEqual({
    comments: [
      makeComment(1, [makeContentComment(2, 'oh yeah'), makeComment(3)]),
    ],
  })
})

test('test update score', () => {
  expect(
    reducer(
      {
        comments: [makeComment(1, [], 2)],
      },
      {
        type: ACTIONS.UPDATE_COMMENT,
        payload: {
          id: 1,
          score: 2,
        },
      },
    ),
  ).toStrictEqual({
    comments: [makeComment(1, [], 2)],
  })
})
