import { useCurrentUser } from '../src/contexts/CurrentUser'
import { useEffect } from 'react'
import MediaQuery from 'react-responsive'
import { Button } from './Buttons'

export function ReplyForm({ className }) {
  const { currentUser, fetchCurrentUser } = useCurrentUser()

  useEffect(() => fetchCurrentUser(), [])

  if (currentUser) {
    const author = currentUser.username
    const avatar = currentUser.image.png ?? ''

    let avatarImage = (
      <img
        className="w-8 h-8 desktop:w-10 desktop:h-10"
        src={`${avatar}`}
        alt={`${author} avatar`}
      />
    )
    let sendButton = <Button name="Send" />
    let textarea = (
      <textarea
        className="w-full h-32 border
      rounded-lg border focus:border-moderate-blue border-light-gray
       text-body focus:border-moderate-blue placeholder:text-grayish-blue text-dark-blue p-4 resize-none
      focus:outline-none
      "
        placeholder="Add a comment..."
      />
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
