export const isDebug  = () => {
    const urlObject = new URL(window?.location?.href);
    return urlObject.searchParams.get("debug") === "true";
}