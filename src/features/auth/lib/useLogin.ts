import { FormikHelpers, useFormik } from "formik";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../common/hooks";
import { BaseResponse } from "../../../common/types";
import { LoginParamsType } from "../api/authApi";
import { authThunks, selectCaptchaURL, selectIsLoggedIn } from "../model/authSlice";

type FormikErrorType = Omit<Partial<LoginParamsType>, "captcha">;

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const captchaURL = useSelector(selectCaptchaURL);

  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 3) {
        errors.password = "Must be 3 characters or more";
      }

      return errors;
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: "",
    },
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      dispatch(authThunks.login(values))
        .unwrap()
        .catch((reason: BaseResponse) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        });
    },
  });

  return { formik, isLoggedIn, captchaURL };
};
