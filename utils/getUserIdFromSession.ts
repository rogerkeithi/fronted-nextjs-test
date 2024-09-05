export const getUserIdFromSession = (session: any) => {
  const json = JSON.stringify(session, null, 2);
  return JSON.parse(json).user?.id || "0";
};