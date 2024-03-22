"use client";

import { useFormik } from "formik";
import { z } from "zod";
import { useProfile } from "@/hooks/useProfile";
import { Button, Input, Typography } from "@/ui";
import { env } from "@/env";
import { UploadZone } from "./UploadZone";

const validationSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email().optional(),
});

export default function Page() {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    save,
    isSaving,
  } = useProfile();

  const {
    values,
    touched,
    errors,
    isValid,
    handleChange,
    handleBlur,
    submitForm,
  } = useFormik({
    initialValues: {
      firstName,
      lastName,
      email,
    },
    validate: (values) => {
      const validation = validationSchema.safeParse(values);
      if (!validation.success) {
        return validation.error.formErrors.fieldErrors;
      }
    },
    onSubmit: (values) => {
      setFirstName(values.firstName);
      setLastName(values.lastName);
      setEmail(values.email);
    },
  });
  return (
    <>
      <div className="p-10">
        <Typography variant="heading-m" className="text-secondary-500">
          Profile Details
        </Typography>
        <Typography variant="body-m" className="mt-2 text-secondary-400">
          Add your details to create a personal touch to your profile.
        </Typography>
        <div className="mt-10 flex flex-col justify-between gap-4 rounded-md bg-secondary-200 p-5 md:flex-row md:items-center">
          <Typography variant="body-m" className="w-[24rem] text-secondary-400">
            Profile Picture
          </Typography>
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <UploadZone />
            <Typography variant="body-m" className="flex-1 text-secondary-400">
              Image must be below {env.NEXT_PUBLIC_AVATAR_SIZE_KB}KB. Use JPG or
              JPEG format.
            </Typography>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 rounded-md bg-secondary-200 p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Typography variant="body-m" className="w-96 text-secondary-400">
              First name*
            </Typography>
            <Input
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={(e) => {
                handleBlur(e);
                submitForm();
              }}
              error={touched.firstName ? errors.firstName : undefined}
              className="flex-1"
            />
          </div>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Typography variant="body-m" className="w-96 text-secondary-400">
              Last name*
            </Typography>
            <Input
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={(e) => {
                handleBlur(e);
                submitForm();
              }}
              error={touched.lastName ? errors.lastName : undefined}
              className="flex-1"
            />
          </div>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Typography variant="body-m" className="w-96 text-secondary-400">
              Email
            </Typography>
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={(e) => {
                handleBlur(e);
                submitForm();
              }}
              error={touched.email ? errors.email : undefined}
              className="flex-1"
            />
          </div>
        </div>
      </div>
      <div className="flex rounded-b-md border-t-1 border-secondary-300 p-4 md:justify-end md:px-10 md:py-6">
        <Button
          disabled={!isValid}
          loading={isSaving}
          onClick={() => save()}
          className="w-full md:w-max"
        >
          Save
        </Button>
      </div>
    </>
  );
}
