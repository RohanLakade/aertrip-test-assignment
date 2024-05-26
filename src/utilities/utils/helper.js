import { v4 as uuidv4 } from "uuid";

export const generateUniqueID = () => {
  return uuidv4();
};

export const secondsToHoursAndMinutes = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return { hours, minutes };
};
