
import {useRef , useState} from "react"
import {LuUpload,LuUser , LuTrash } from "react-icons/lu";


export default function ProfilePhotoSelecter({image,setImage}){
    const inputRef = useRef(null); //this is use to acces the direct html
    const [previewUrl,setPreviewUrl]= useState(); //preview url

    const handleImage= async (e)=>{
        e.preventDefault();
        const file = e.target.file[0];
        if(file){
            //if we recieve the image we update it 
            setImage(file);
        }

        const preview = URL.createObjectURL(file); //as the input image is Object so now we have convert it to the url to display 

        setPreviewUrl(preview);
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
        <div>
            <input type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImage}
                className="hidden"
            />
        {
            !image ? (
                    <div>
                           <LuUser/>
                           <button
                           type="button"
                            onClick={onChooseFile}

                           >
                            <LuUpload/>
                           </button>
                    </div>
            ):(
                <div>
                    <img src="previewUrl" alt="profile photo" />

                    <button type="button"
                    onClick={handleRemoveImage}>
                        <LuTrash/>
                    </button>

                </div>
            )
        }




        </div>
    )
}