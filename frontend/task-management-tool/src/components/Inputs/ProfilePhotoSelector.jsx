import React, { useRef, useState } from 'react'
import {LuUser, LuUpload, LuTrash} from "react-icons/lu"



function ProfilePhotoSelector(image,setImage) {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file){
            //Update the image State
            setImage(file);

            //Generate preview Url from the file
            
            const preview = URL.createObjectURL(file);
            setPreviewUrl(file)
        }

    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
    <div>
    
    <input 
        type="file"
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className=''
        />
    
    </div>

  )
}


export default ProfilePhotoSelector