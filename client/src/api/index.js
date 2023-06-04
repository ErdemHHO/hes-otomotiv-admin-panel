import axios from "axios";

const url1 = "/api/category";
const url2 = "/api/seri";
const url3 = "/api/car";
const url4 = "/api/product";
const url5 = "/api/brand";

export const kategorileriGetir=()=>axios.get(url1);
export const kategoriGetir=(id)=>axios.get(`${url1}/${id}`);
export const kategoriEkle=(formData)=>axios.post(url1,formData);
export const kategoriGuncelle=(id,formData)=>axios.patch(`${url1}/${id}`,formData);
export const kategoriSil = (id) => axios.delete(`${url1}/${id}`);


export const serileriGetir=()=>axios.get(url2);
export const seriGetir=(id)=>axios.get(`${url2}/${id}`);
export const seriEkle=(formData)=>axios.post(url2,formData);
export const seriGuncelle=(id,formData)=>axios.patch(`${url2}/${id}`,formData);
export const seriSil = (id) => axios.delete(`${url2}/${id}`);

export const arabalariGetir=()=>axios.get(url3);
export const arabaGetir=(id)=>axios.get(`${url3}/${id}`);
export const arabaEkle=(formData)=>axios.post(url3,formData);
export const arabaGuncelle=(id,formData)=>axios.patch(`${url3}/${id}`,formData);
export const arabaSil = (id) => axios.delete(`${url3}/${id}`);

export const urunleriGetir=()=>axios.get(url4);
export const urunGetir=(id)=>axios.get(`${url4}/${id}`);
export const urunEkle=(formData)=>axios.post(url4,formData);
export const urunGuncelle=(id,formData)=>axios.patch(`${url4}/${id}`,formData);
export const urunSil = (id) => axios.delete(`${url4}/${id}`);

export const markalariGetir=()=>axios.get(url5);
export const markaGetir=(id)=>axios.get(`${url5}/${id}`);
export const markaEkle=(formData)=>axios.post(url5,formData);
export const markaGuncelle=(id,formData)=>axios.patch(`${url5}/${id}`,formData);
export const markaSil = (id) => axios.delete(`${url5}/${id}`);

export const adminGirisYap=(formData)=>axios.post('/api/admin/signin',formData);