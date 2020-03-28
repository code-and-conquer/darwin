export default <T>(obj: T): T => (obj ? JSON.parse(JSON.stringify(obj)) : obj);
