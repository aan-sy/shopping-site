import axios from 'axios';

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UNSIGNED_UPLOAD_PRESET)

  return axios.post(import.meta.env.VITE_CLOUDINARY_API, formData).then(res => res.data);
}