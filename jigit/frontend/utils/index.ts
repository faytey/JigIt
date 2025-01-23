/**
 * Pads a given starknet address with leading zeros to ensure it is 64 characters long.
 *
 * @function padAddress
 * @param {string} address - The starknet address to pad.
 * @returns {string} The padded starknet address.
 *
 * @example
 * const address = '0x1234567890abcdef';
 * const paddedAddress = padAddress(address);
 * console.log(paddedAddress); // Output: '0x0000000000000000000000001234567890abcdef'
 */
export const padAddress = (address: string) => {
    return '0x' + address.slice(2).padStart(64, '0');
};

export const shortenAddress = (address: string, chars = 4): string => {
    if (!address) return "";
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};