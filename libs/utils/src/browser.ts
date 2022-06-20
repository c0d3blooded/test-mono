/* Detects if the current code is being runon the server */
export const isServer = typeof window === 'undefined';
