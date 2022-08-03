import axios from 'axios';
import { toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';

toast.configure();

axios.interceptors.response.use((config: any) => {
  return config
}, (error: any) => {
  const jsonError = error.toJSON();
  console.log(jsonError);
  console.log(error.response.data);
  console.log(jsonError.status);

  if (!jsonError.status) {
    console.log(jsonError.status);
    console.log('Unexpected Error!');
    console.log(jsonError.message);

    if (!jsonError.message.toLowerCase().includes('status')) console.log('GOT HERE!');
    toast.error(jsonError.message);
    return Promise.reject(error);
  } else {
    if (typeof error.response.data.error === 'string') {
        console.log(!error.response.data.error);
        toast.error(`${error.response.data.error}`);
    }

    return Promise.reject(error);
  }
});

const services = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default services;
