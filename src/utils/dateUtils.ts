import moment from "moment";

export const formatDate = (date: Date | null): string | null => {
  if (!date) return null;
  return moment(date).isValid() ? moment(date).format("YYYY-MM-DD") : null;
};

export const formatTime = (time: string): string => {
  const temp = new Date(time);
  const checkTime = moment(temp);
  return checkTime.isValid() ? `${temp.getHours()}:${temp.getMinutes()}` : "";
};
