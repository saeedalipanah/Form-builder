// @ts-ignore
import moment from "moment-jalaali";

export const timeStampToPersianDate = (timeStamp: number, format: string) => {
  moment.loadPersian();
  return moment.unix(timeStamp).format(format);
};
