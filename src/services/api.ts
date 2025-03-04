import axios from 'axios';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify'; 
import Cookies from 'js-cookie';  

const apiTodolist = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
});

apiTodolist.interceptors.request.use(config => {
  const userData = Cookies.get('userData'); 
  const token = userData && JSON.parse(userData).token;  
  const userId = userData && JSON.parse(userData).userId;
  config.headers.authorization = `Bearer ${token}`;
  config.headers['UserId'] = userId;
  return config;
}, error => {
  toast.error('Erro ao fazer a requisição.');
  return Promise.reject(error);
});


apiTodolist.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;

    if (response) {
      const { status } = response;

      if (status === 500) {
        toast.error('Token inválido ou expirado. Faça login novamente.');
        Cookies.remove('token');  
        Cookies.remove('userData'); 
        redirect("/login");
      } else if (status === 501) {
        toast.error('Recurso não encontrado.');
      } 
    }
    return Promise.reject(error);
  }
);

export default apiTodolist;
