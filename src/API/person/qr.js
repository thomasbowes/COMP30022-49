import React, { useState } from "react";
import { useShowProfile } from "../../BackEndAPI/profileAPI";
import QRCode from "qrcode";

const ShowQrCode = () => {
    const [imageUrl, setImageUrl] = useState();
    const {load, profile, error} = useShowProfile();

    const generateQR = async () => {
        try {
            const response = await QRCode.toDataURL(profile.firstName);
            setImageUrl(response)
        }catch (error){
            console.log(error);
        }
    }

    if (profile.firstName){
        generateQR();
    }

    return (
        <React.Fragment>
            <div className="sub-container">
                {imageUrl ? (<img src={imageUrl} alt="img" />):null}
            </div>
        </React.Fragment>
  )
}
export default ShowQrCode;