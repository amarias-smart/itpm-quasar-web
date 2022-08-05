import { api } from 'src/boot/axios'

const controller = 'api/projects/'
const controller2 = 'api/projects_summary/'
const controller3 = 'api/projects_summary_count/'

const getAll = () => api.get(controller)
const getOne = (id) => api.get(controller + id)
const insert = (data) => api.post(controller, data)
const update = (id, data) => api.put(controller + id, data)
const remove = (id) => api.delete(controller + id)
const summary = () => api.get(controller2)
const summaryCount = () => api.get(controller3)

export {
  getAll,
  getOne,
  insert,
  update,
  remove,

  summary,
  summaryCount
}
