// Function to get the correct ordinal suffix for the given number
export function getOrdinalSuffix(num: number) {
    const j = num % 10,
        k = num % 100;
    if (j === 1 && k !== 11) {
        return 'st';
    }
    if (j === 2 && k !== 12) {
        return 'nd';
    }
    if (j === 3 && k !== 13) {
        return 'rd';
    }
    return 'th';
}


