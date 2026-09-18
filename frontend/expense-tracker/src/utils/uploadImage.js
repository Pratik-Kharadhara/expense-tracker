import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosPath";


export default async function uploadImage(imageFile){
    const formData = new FormData();
    //apend image to form data
    formData.append('image',imageFile);

    try{
        const reposne = await axiosInstance.post(API_PATHS.IMAGE.IMAGE_UPLOAD,formData,{
            headers:{
                //set header for file upload
                'Content-Type':'multipart/form-data',
            },
        });
        return reposne.data;
    }
    catch(error){
        console.error("Error while uploading image",error);
        throw error;
    }

}