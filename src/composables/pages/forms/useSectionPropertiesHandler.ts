import type { propertyType } from "@/types/forms";

export const propertiesFormatter = (
  existProperties: propertyType[],
  valueType: "string" | "boolean" = "string"
) => {
  try {
    return JSON.parse(existProperties as any);
  } catch {
    return existProperties.map((item, i) => ({
      ...item,
      value: valueType === "string" ? `value${i + 1}` : false,
    }));
  }
};
export const removeProperty = (list: propertyType[], index: number) => {
  list.splice(index, 1);
};
export const addNewProperty = (
  list: propertyType[],
  valueType: "string" | "boolean" = "string"
) => {
  const newItem: propertyType = {
    label: `گزینه ${list.length + 1}`,
    value: valueType === "string" ? `value${list.length + 1}` : false,
  };
  list.push(newItem);
};
