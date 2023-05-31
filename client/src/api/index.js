import axios from "axios";

const url1 = "/api/category";

export const kategorileriGetir=()=>axios.get(url1);
export const kategoriGetir=(id)=>axios.get(`${url1}/${id}`);
export const kategoriGuncelle=(id,formData)=>axios.patch(`${url1}/${id}`,formData);
export const kategoriSil = (id) => axios.delete(`${url1}/${id}`);

export const adminGirisYap=(formData)=>axios.post('/api/admin/signin',formData);