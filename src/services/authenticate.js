import { api } from 'src/boot/axios'

const controller = 'api/authenticate/'

const auth = (data) => api.post(controller, data)

export {
  auth
}
