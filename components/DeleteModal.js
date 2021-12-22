export function DeleteModal({ onCancel, onDelete }) {
  let _node = null
  const handleCancel = () => {
    console.log('CANCEL')
    onCancel()
  }
  const handleDelete = () => {
    console.log('DELETE')
    onDelete()
  }
  return (
    <>
      <div
        className="z-50
          flex items-center justify-center
          fixed inset-0
          outline-none
          overflow-x-hidden overflow-y-auto
          "
        onClick={(e) => {
          e.preventDefault()
          if (!_node.contains(e.target)) {
            handleCancel()
          }
        }}
      >
        <div
          ref={(node) => {
            _node = node
          }}
          className="relative w-auto my-6 mx-auto max-w-sm bg-white rounded rounded-xl"
        >
          <div className="p-6 flex flex-col justify-between gap-4">
            <h2 className="text-heading-lg font-medium">Delete comment</h2>
            <p className="text-body text-grayish-blue">
              Are you sure you want to delete this comment? This will remove the
              comment and {"can't"} be undone.
            </p>
            <div className="flex flex-row gap-4 mt-1">
              <button
                className="
                    rounded rounded-xl bg-grayish-blue text-white
                    uppercase font-medium font-body
                    desktop:hover:bg-light-gray
                    desktop:hover:text-dark-blue
                     p-4 w-1/2"
                onClick={(e) => {
                  e.preventDefault()
                  handleCancel()
                }}
              >
                No, cancel
              </button>
              <button
                className="
                    rounded rounded-xl bg-soft-red text-white
                    uppercase font-medium font-body
                    desktop:hover:bg-pale-red
                     p-4 w-1/2"
                onClick={(e) => {
                  e.preventDefault()
                  handleDelete()
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
