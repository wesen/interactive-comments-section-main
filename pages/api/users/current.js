import foo from '../../../frontend-mentor-project/data.json'

export default function handler(req, res) {
  res.status(200).json(foo.currentUser)
}
