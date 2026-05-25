
import {useRef , useState} from "react"
import {LuUpload,LuUser , LuTrash } from "react-icons/lu";


export default function ProfilePhotoSelecter({image,setImage}){
    const inputRef = useRef(null); //this is use to acces the direct html
    const [previewUrl,setPreviewUrl]= useState(); //preview url

    const handleImage= async (e)=>{
        e.preventDefault();
        const file = e.target.files[0];
    try{
            if(file){
            //if we recieve the image we update it 
            setImage(file);
        }
       
    }
    catch(e){
        console.log(e);
    }
            const preview = URL.createObjectURL(file); //as the input image is Object so now we have convert it to the url to display 

            setPreviewUrl(preview);
        console.log(previewUrl)
    }
    //to remove the selected image 
const handleRemoveImage=()=>{
    setImage(null);
    setPreviewUrl(null);
}

//to chose the image
const onChooseFile = ()=>{
    inputRef.current.click(); //this will select the current selected image
}

    return (
        <div className="relative flex items-center justify-center">
            <input type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImage}
                className="hidden"
            />
        {
            !image ? (
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-slate-100 text-slate-500">
                           <LuUser className="h-10 w-10"/>
                           <button
                           type="button"
                            onClick={onChooseFile}
                            className="absolute -right-1 -bottom-1 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:bg-slate-700"

                           >
                            <LuUpload className="h-4 w-4"/>
                           </button>
                    </div>
            ):(
                <div className="relative flex h-24 w-24 items-center justify-center">
                    <img src={previewUrl} alt="profile photo"
                    className="h-24 w-24 rounded-full object-cover ring-2 ring-slate-200" />

                    <button type="button"
                    onClick={handleRemoveImage}
                    className="absolute -right-1 -bottom-1 flex h-9 w-9 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg transition hover:bg-rose-500">
                        <LuTrash className="h-4 w-4"/>
                    </button>

                </div>
            )
        }




        </div>
    )
}