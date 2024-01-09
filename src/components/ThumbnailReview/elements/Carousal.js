import { useState } from "react";

const slideStyles = {
  width: "100%",
  height: "100%",
  margin: "0px",
  padding: "0px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};




const sliderStyles = {
  position: "relative",
  height: "100%",
};


const ControlledCarousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
    borderTopLeftRadius: "15px",
    borderRightBottomRadius: "15px",
  };

  return (
    <div style={sliderStyles}>
      <div>
        
      </div>
      <div style={slideStylesWidthBackground}></div>
    </div>
  );
};

export default ControlledCarousel;
