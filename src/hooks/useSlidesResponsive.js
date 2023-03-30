import { useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";

function useSlidesResponsive(number) {
    number = +number;

    const [numberSlides, setNumberSlides] = useState(number);

    const windowWidth = useWindowSize();

    const getSlidesPerView4Items = () => {
        switch (true) {
            case windowWidth > 1200:
                setNumberSlides(number);
                break;
            case windowWidth > 992:
                setNumberSlides(number - 1);
                break;
            case windowWidth > 768:
                setNumberSlides(number - 2);
                break;
            default:
                setNumberSlides(1);
                break;
        }
    };

    useEffect(() => {
        switch (true) {
            case number === 4:
                getSlidesPerView4Items();
                break;
            default:
                alert(
                    "Just for showing 4 items now. If there is another case, you please update here"
                );
                break;
        }
    }, [windowWidth]);

    return numberSlides;
}

export default useSlidesResponsive;
