import React, { useState } from "react";
import makeStyles from "@material-ui/styles/makeStyles";

const ImageCarousel = props => {
    const classes = useStyles();
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [mouseX, setMouseX] = useState(0);
    const [selectedImg, setSelectedImg] = useState(-1);

    const images = props.images;

    const elementWidth = Math.max((images.length - 2) * 160, 0);

    const onMouseMove = e => {
        let multiplier = 1;

        if (mouseX < 0 && e.movementX > 0) {
            multiplier = Math.abs((100 + mouseX) / 100);
        }
        if (mouseX > elementWidth && e.movementX < 0) {
            multiplier = Math.abs((100 - (mouseX - elementWidth)) / 100);
            multiplier = Math.max(multiplier, 0);
        }

        let sum = mouseX - e.movementX * multiplier;

        if (e.buttons) {
            setMouseX(sum);
        }
    };

    const onMouseUp = () => {
        if (mouseX < 0) setMouseX(0);
        if (mouseX > elementWidth) setMouseX(elementWidth);
        setIsMouseDown(false);
    };

    return (
        <div
            className={classes.root}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
        >
            <div
                style={{
                    right: mouseX,
                    transition: !isMouseDown && "all 100ms"
                }}
                className={classes.slides}
                onMouseDown={e => setIsMouseDown(true)}
            >
                {images.map((image, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedImg(i)}
                        className={classes.imageContainer}
                        style={{
                            backgroundColor:
                                selectedImg === i && "rgba(21, 101, 192, 0.35)"
                        }}
                    >
                        <img src={image} className={classes.image} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const useStyles = makeStyles(() => ({
    root: { overflowX: "hidden", maxWidth: 400 },
    slides: {
        display: "flex",
        overflowX: "-moz-scrollbars-none",
        position: "relative"
    },
    imageContainer: {
        padding: 8
    },
    image: {
        maxHeight: 100,
        minHeight: 100,
        width: 160,
        pointerEvents: "none",
        objectFit: "cover"
    }
}));

export default ImageCarousel;
