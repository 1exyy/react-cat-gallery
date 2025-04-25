import React, {useState, CSSProperties, ImgHTMLAttributes} from "react";
import styles from "./Image.module.scss";
import fallbackImg from '../../assets/not-found.jpg'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    objectFit?: CSSProperties["objectFit"];
    className?: string;
    style?: CSSProperties;
}

export const Image: React.FC<ImageProps> = ({
                                                src,
                                                alt = "image",
                                                width = "100%",
                                                height = "auto",
                                                borderRadius = "8px",
                                                objectFit = "cover",
                                                className = "",
                                                style,
                                                ...rest
                                            }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const handleLoad = () => setLoaded(true);
    const handleError = () => setError(true);

    const wrapperStyle: CSSProperties = {
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
    };

    return (
        <div className={`${styles.wrapper} ${className}`} style={wrapperStyle}>
            {!loaded && !error && <div className={styles.skeleton}/>}
            <img
                src={error ? fallbackImg : src}
                alt={alt}
                style={{
                    opacity: loaded ? 1 : 0,
                    borderRadius,
                    objectFit,
                }}
                onLoad={handleLoad}
                onError={handleError}
                className={styles.image}
                {...rest}
            />
        </div>
    );
};
