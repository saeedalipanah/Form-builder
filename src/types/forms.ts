export enum formTypeEnum {
  PUBLIC = "public",
  PRIVATE = "private",
}
export type propertyType = { label: string; value: any };
export enum sectionTypeEnum {
  TEXT = "text",
  TEXTAREA = "textarea",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  DROPDOWN = "dropdown",
  FILE = "file",
}
export type sectionType = {
  id?: string;
  title: string;
  type: sectionTypeEnum;
  required: boolean;
  properties?: propertyType[];
};
export type formDataType = {
  form_id?: string;
  form_title: string;
  form_type: formTypeEnum;
  description: string;
  sections?: sectionType[];
  created_at?: number;
};
