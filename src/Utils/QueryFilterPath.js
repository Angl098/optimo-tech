const buildQueryParams = (filter) => {
    let queryParams = "?";
    for (const [key, value] of Object.entries(filter)) {
        if (value !== null && value !== "") {
            if (Array.isArray(value) && value.length > 0) {
                queryParams += `${key}=${value.join(",")}&`;
            } else {
                queryParams += `${key}=${value}&`;
            }
        }
    }
    return queryParams;
};


export default buildQueryParams;