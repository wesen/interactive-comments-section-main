import { useCurrentUser } from '../src/contexts/CurrentUser'
import { useEffect, useState } from 'react'
import { Button } from './Buttons'

export function ReplyForm({ className, onSubmit, content }) {
  const { currentUser, fetchCurrentUser } = useCurrentUser()
  const [areaContent, setAreaContent] = useState(content || '')

  useEffect(() => fetchCurrentUser(), [])

  if (currentUser) {
    const author = currentUser.username
    const avatar = currentUser.image.png ?? ''

    return (
      <div>
        <div
          className={`
        ${className || ''}
       p-4
       bg-white rounded rounded-xl overflow-hidden
       font-rubik
          grid gap-4 grid-cols-2
          items-center
       desktop:flex desktop:flex-row desktop:items-start
       desktop:justify-between


          `}
        >
          <img
            className="w-8 h-8 desktop:w-10 desktop:h-10
              row-start-2"
            src={`${avatar}`}
            alt={`${author} avatar`}
          />
          <textarea
            className="
              row-start-1 col-span-2
              w-full h-32 border
      rounded-lg border focus:border-moderate-blue border-light-gray
       text-body focus:border-moderate-blue placeholder:text-grayish-blue text-dark-blue p-4 resize-none
      focus:outline-none
      "
            placeholder="Add a comment..."
            onChange={(e) => {
              setAreaContent(e.target.value)
            }}
            value={areaContent}
          />
          <Button
            className="justify-self-end"
            name="Send"
            onClick={() => {
              if (onSubmit) {
                const res = onSubmit(areaContent)
                if (res) {
                  setAreaContent('')
                }
              }
            }}
          />
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
