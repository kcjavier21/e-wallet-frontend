import axios from 'axios'
import { toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

toast.configure()

axios.interceptors.response.use(
  (config: any) => {
    return config
  },
  (error: any) => {
    const jsonError = error.toJSON()
    
    if (!jsonError.status) toast.error(jsonError.message)

    return Promise.reject(error)
  }
)

const services = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
}

export default services
