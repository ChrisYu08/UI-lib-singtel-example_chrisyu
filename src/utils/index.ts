export const getBaseWidth = () => {
    const screenWidth = document.body.clientWidth;
    return screenWidth;
};

/*with less than 767*/
export const isMobile = () => {
    const baseWidth = getBaseWidth();
    return baseWidth <= 767;
};