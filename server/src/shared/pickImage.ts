export const generateImage = (userName: string) => {
    const baseUrl = `https://ui-avatars.com/api/?name=${userName}`;
    return baseUrl;
};
