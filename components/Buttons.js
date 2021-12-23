export const DeleteButton = ({ onClick }) => {
  return (
    <a
      className="flex flex-row items-center justify-between gap-2 group cursor-pointer"
      aria-label="Delete"
      href="#"
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      <svg
        className="w-4 h-4 fill-soft-red desktop:group-hover:fill-pale-red"
        viewBox="0 0 12 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" />
      </svg>
      <p className="text-body font-medium text-soft-red desktop:group-hover:text-pale-red">
        Delete
      </p>
    </a>
  )
}
export const EditButton = ({ onClick }) => {
  return (
    <a
      className="flex flex-row items-center justify-between gap-2 group cursor-pointer"
      aria-label="Edit post"
      href="#"
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      <svg
        className="w-4 h-4 fill-moderate-blue desktop:group-hover:fill-light-grayish-blue"
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" />
      </svg>
      <p className="text-body font-medium text-moderate-blue desktop:group-hover:text-light-grayish-blue">
        Edit
      </p>
    </a>
  )
}
export const ReplyButton = ({ onClick }) => {
  return (
    <a
      className="flex flex-row items-center justify-between gap-2 group cursor-pointer"
      aria-label="Reply"
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
      <svg
        className="w-4 h-4 fill-moderate-blue desktop:group-hover:fill-light-grayish-blue"
        viewBox="0 0 14 13"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
      </svg>
      <p className="text-body font-medium text-moderate-blue desktop:group-hover:text-light-grayish-blue">
        Reply
      </p>
    </a>
  )
}

export function Button({ name, onClick }) {
  return (
    <button
      aria-label={name}
      onClick={onClick}
      className="bg-moderate-blue text-white text-body font-medium py-4 px-8 uppercase rounded rounded-xl
        desktop:hover:bg-light-grayish-blue"
    >
      {name}
    </button>
  )
}
