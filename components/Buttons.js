export const DeleteButton = ({ onClick }) => {
  return (
    <div
      className="flex flex-row items-center justify-between gap-2"
      aria-label="Delete"
    >
      <img className="object-contain w-4" src="/icon-delete.svg" alt="" />
      <a
        className="text-body font-medium text-soft-red"
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onClick()
        }}
      >
        Delete
      </a>
    </div>
  )
}
export const EditButton = ({ onClick }) => {
  return (
    <div
      className="flex flex-row items-center justify-between gap-2"
      aria-label="Delete"
    >
      <img className="object-contain w-5" src="/icon-edit.svg" alt="" />
      <a className="text-body font-medium text-moderate-blue" href="#">
        Edit
      </a>
    </div>
  )
}
export const ReplyButton = ({ onClick }) => {
  return (
    <div
      className="flex flex-row items-center justify-between gap-2"
      aria-label="Reply"
    >
      <img className="object-contain w-5" src="/icon-reply.svg" alt="" />
      <a
        className="text-body font-medium text-moderate-blue"
        href="#"
        onClick={
          onClick
            ? (e) => {
                e.preventDefault()
                onClick()
              }
            : null
        }
      >
        Reply
      </a>
    </div>
  )
}
