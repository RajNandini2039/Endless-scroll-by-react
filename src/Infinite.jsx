import React, { useEffect, useState, useRef } from "react";
import './Infinite.css';



const accessKey = "q5pJfeX2dXS8FuJJFcOp5ty9hVJGFbn--z-Cdw8pUnc";
const count = 15;

const Infinite =  () => {
    const imagesRef = useRef(null);
    const [photos, setPhotos]  = useState([]);
    const [loading, setLoading] = useState(false);

    const getphotos = async () => {
        setLoading(true);
        try{
            const response = await fetch(`https://api.unsplash.com/photos/random?count=${count}&client_id=${accessKey}`);
            const data = await response.json();
            setPhotos((prev) =>  [...prev, ...data]);
        } catch (error){
            console.error("Error to fetching images : ", error);
            imagesRef.current.innerText = "Failed to load images. Please try again later.";
            imagesRef.current.style.color = "red";
        }
        setLoading(false);
    };
    useEffect(() => {
        getphotos();
        const handleScroll =  () => {
            if(window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading){
                getphotos();

            }
        };
        window.addEventListener("scroll" , handleScroll);
        return () => window.removeEventListener("scroll" , handleScroll);
    }, []);

    useEffect(() => {
        const scrollBtn = document.querySelector(".btn-up");
        const toggleBtnVisibility = () => {
          if (window.scrollY > 200) {
            scrollBtn.style.display = "flex";
          } else {
            scrollBtn.style.display = "none";
          }
        };
    
        window.addEventListener("scroll", toggleBtnVisibility);
        return () => window.removeEventListener("scroll", toggleBtnVisibility);
      }, []);
    
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
   return (
    <div id="wrapper">
      <h1 id="heading">ENDLESS SCROLL</h1>
      <div className="images" ref={imagesRef}>
        {photos.map((photo) => (
          <a
            key={photo.id}
            href={photo.links.html}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={photo.urls.regular}
              alt={photo.alt_description || "Unsplash image"}
            />
          </a>
        ))}
      </div>
      {loading && (
        <div className="loader-container">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      )}
      <button className="btn-up" onClick={scrollToTop}>
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </div>
  );
 }
 export default Infinite;