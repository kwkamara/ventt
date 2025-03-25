export const useImageLink = () => {

    const img = useImage();
    const imageLink = (url, options = {}) => {
        if (!url) {
            console.warn('No image URL provided.');
            return '';
        }

        // Generate the optimized image URL using `useImage()`
        return img(url, options);
    };

    return { imageLink };
};