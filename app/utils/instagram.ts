export const getInstagramUrl = (handle: string): string => {
  // Remove @ if present
  const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;
  return `https://instagram.com/${cleanHandle}`;
};
