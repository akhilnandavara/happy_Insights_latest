const matchRoute = (path, locationPath) => {
    // Ensure path and locationPath are strings
    if (!path || !locationPath) return false;
  
    // Normalize paths to remove leading slashes and convert to lowercase
    const normalizedPath = path.toLowerCase().replace(/^\//, "");
    const normalizedLocationPath = locationPath.toLowerCase().replace(/^\//, "");
  
    // Check for an exact match or if location starts with the path
    return (
      normalizedLocationPath === normalizedPath ||
      normalizedLocationPath.startsWith(normalizedPath)
    );
  };
  
  export default matchRoute;
  