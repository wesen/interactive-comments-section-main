import { useCurrentUser } from '../src/contexts/CurrentUser'
import { useEffect } from 'react'
import MediaQuery from 'react-responsive'

export function ReplyForm({ className }) {
  const { currentUser, fetchCurrentUser } = useCurrentUser()

  useEffect(() => fetchCurrentUser(), [])

  if (currentUser) {
    const author = currentUser.username
    const avatar = currentUser.image.png ?? ''

    const isPostFromCurrentUser =
      author === ((currentUser && currentUser.username) ?? '')
    let avatarImage = (
      <img
        className="w-8 h-8 desktop:w-10 desktop:h-10"
        src={`${avatar}`}
        alt={`${author} avatar`}
      />
    )
    let sendButton = (
      <button
        aria-label="Send"
        className="bg-moderate-blue text-white text-body font-medium py-4 px-8 uppercase rounded rounded-xl"
      >
        Send
      </button>
    )
    let textarea = (
      <textarea className="w-full h-32 border rounded-lg text-body text-grayish-blue p-4 resize-none">
        Add a comment...
      </textarea>
    )
    return (
      <div>
        <section
          className={`
        ${className || ''}
       flex flex-col gap-4 
       desktop:flex-row desktop:items-start
       justify-between
       p-4
       bg-white rounded rounded-xl overflow-hidden
       font-rubik
       `}
        >
          <MediaQuery maxWidth={1440 - 1}>
            {textarea}
            <div className="flex flex-row items-center justify-between">
              {avatarImage}
              {sendButton}
            </div>
          </MediaQuery>
          <MediaQuery minWidth={1440}>
            {avatarImage}
            {textarea}
            {sendButton}
          </MediaQuery>
        </section>
      </div>
    )
  } else {
    return <></>
  }
}
