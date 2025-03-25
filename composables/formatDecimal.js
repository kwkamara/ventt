export const useFormatDecimal = () => {
    const formatDecimal = (value) => {
        if (value) {
            return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return value;
    };

    return { formatDecimal };
};