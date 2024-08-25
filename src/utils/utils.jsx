import { jwtDecode } from "jwt-decode";


/**
 * Mendecode token JWT dan mengembalikan payloadnya.
 * @param {string} token - Token JWT yang ingin didecode.
 * @returns {object} Payload dari token.
 */
export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

/**
 * Mengambil informasi peran dari token.
 * @param {string} token - Token JWT yang ingin didecode.
 * @returns {string} Peran dari token.
 */
export const getRoleFromToken = (token) => {
    const decodedToken = decodeToken(token);
    return decodedToken ? decodedToken.role : null;
};