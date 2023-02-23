import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

const images = [
    "http://images.adsttc.com/media/images/63c0/a935/7643/4a39/8498/948f/large_jpg/casa-tunich-apiron_13.jpg?1673570670",
    "http://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80",
    "http://cf.bstatic.com/xdata/images/hotel/max1024x768/314234937.jpg?k=3a1bc77e40b4a7f18a7746999bb0e932becdedfa57df23820349ab09afb621ee&o=&hp=1",
    "http://www.real-estate-costa-blanca.com/uploaded_files/photos/fe4edcd654c99506f068af26a2c525c5_photo_760x1140_wt.JPG",
    "http://cf.bstatic.com/xdata/images/hotel/max1024x768/314234937.jpg?k=3a1bc77e40b4a7f18a7746999bb0e932becdedfa57df23820349ab09afb621ee&o=&hp=1",
];

const ImageScroller = () => {
    const [imageIdx, setImageIdx] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            if (imageIdx >= images.length - 1) {
                setImageIdx(0);
            } else {
                setImageIdx(imageIdx + 1);
            }
        }, 5000);
    });

    return (
        <Grid
            item
            sx={{
                backgroundImage: `url(${images[Math.floor(Math.random() * images.length)]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
                width: "100%",
            }}
       >
        
       </Grid>
    );
};

export default ImageScroller;
