import { api } from 'src/boot/axios'

const controller = 'api/users_profile/'

const getAll = () => api.get(controller)
const getOne = (id) => api.get(controller + id)
const insert = (data) => api.post(controller, data)
const update = (id, data) => api.put(controller + id, data)
const remove = (id) => api.delete(controller + id)

export {
  getAll,
  getOne,
  insert,
  update,
  remove
}
