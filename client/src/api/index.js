import axios from "axios";

const url1 = "/api/category";
const url2 = "/api/seri";
const url3 = "/api/car";
const url4 = "/api/product";
const url5 = "/api/brand";
const url6 = "/api/admin";

const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('adminProfile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('adminProfile')).token}`
  }
  return req;
});

export const kategorileriGetir = () => API.get(url1);
export const kategoriGetir = (id) => API.get(`${url1}/${id}`);
export const kategoriEkle = (formData) => API.post(url1, formData);
export const kategoriGuncelle = (id, formData) => API.patch(`${url1}/${id}`, formData);
export const kategoriSil = (id) => API.delete(`${url1}/${id}`);

export const serileriGetir = () => API.get(url2);
export const seriGetir = (id) => API.get(`${url2}/${id}`);
export const seriEkle = (formData) => API.post(url2, formData);
export const seriGuncelle = (id, formData) => API.patch(`${url2}/${id}`, formData);
export const seriSil = (id) => API.delete(`${url2}/${id}`);

export const arabalariGetir = () => API.get(url3);
export const arabaGetir = (id) => API.get(`${url3}/${id}`);
export const arabaEkle = (formData) => API.post(url3, formData);
export const arabaGuncelle = (id, formData) => API.patch(`${url3}/${id}`, formData);
export const arabaSil = (id) => API.delete(`${url3}/${id}`);

export const urunleriGetir = () => API.get(url4);
export const urunGetir = (id) => API.get(`${url4}/${id}`);
export const urunToplamlarıGetir = () => API.get(`${url4}/total/total`);
export const topluUrunGuncelle = (formData) => API.post(`${url4}/bulk/price`, formData);
export const urunEkle = (formData) => API.post(url4, formData);
export const urunGuncelle = (id, formData) => API.patch(`${url4}/${id}`, formData);
export const urunSil = (id) => API.delete(`${url4}/${id}`);
export const urunBul = (query) => {
  return API.get(`${url4}/search/search`, {
    params: { q: query },
  });
};

export const markalariGetir = () => API.get(url5);
export const markaGetir = (id) => API.get(`${url5}/${id}`);
export const markaEkle = (formData) => API.post(url5, formData);
export const markaGuncelle = (id, formData) => API.patch(`${url5}/${id}`, formData);
export const markaSil = (id) => API.delete(`${url5}/${id}`);

export const adminleriGetir = () => API.get(url6);
export const adminGetir = (id) => API.get(`${url6}/${id}`);
export const adminEkle = (formData) => API.post(`${url6}/signup`, formData);
export const adminGuncelle = (id, formData) => API.patch(`${url6}/${id}`, formData);
export const adminSil = (id) => API.delete(`${url6}/${id}`);

export const adminGirisYap=(formData)=>axios.post('/api/admin/signin',formData);