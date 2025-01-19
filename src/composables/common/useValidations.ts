import * as yup from "yup";
export const emailValidationSchema = yup
  .string()
  .email("ایمیل نامعتبر است")
  .required("ایمیل الزامی است");

export const passwordValidationSchema = yup
  .string()
  .required("رمز عبور الزامی است")
  .matches(/[a-zA-Zآ-ی]/, "رمز عبور باید حداقل شامل یک حرف باشد")
  .matches(/[0-9۰-۹]/, "رمز عبور باید حداقل شامل یک عدد باشد")
  .matches(/[-@$#+!%*?&]/, "رمز عبور باید حداقل شامل یک کاراکتر خاص باشد")
  .min(6, "رمز عبور باید حداقل شامل 6 کاراکتر باشد");
