import { z } from "zod";

const MIN_AGE = 12;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must not exceed 64 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*\(\)\[\]\.:"'<>,/|\\+=\-_*/;^`~{}?&])[A-Za-z\d@$!%*{};\(\)\[\]\."'<>,/|\\+=\-_*/^`~:?&]{8,64}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female"], {
      message: "Are you male🙍🏽‍♂️ or female👩🏽?",
    }),
    dateOfBirth: z
      .date({ message: "Please provide your date of birth" })
      .refine(validateAge(), {
        message: `You must be at least ${MIN_AGE} years old and at most 99 years old`,
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  phoneNumber: z.string().regex(/^\+\d{1,3}\d{9,}$/, {
    message:
      "Phone number must be in the format +[country code][number] and at least 9 digits long",
  }),
  gender: z.enum(["male", "female"], {
    message: "Are you male🙍🏽‍♂️ or female👩🏽?",
  }),
  dateOfBirth: z
    .date({ message: "Please provide your date of birth" })
    .refine(validateAge(), {
      message: `You must be at least ${MIN_AGE} years old and at most 99 years old`,
    }),
  address: z.string().min(3, { message: "Address cannot be empty" }),
});

function validateAge() {
  return function (date) {
    !(date instanceof Date) && (date = new Date(date));

    const currentYear = new Date().getFullYear(),
      birthYear = date.getFullYear(),
      age = currentYear - birthYear;

    return age >= MIN_AGE && age <= 99;
  };
}

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must not exceed 64 characters")
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export const storeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Store name must be at least 2 characters long" }),
  description: z.string().optional(),
  phoneNumber: z.string().regex(/^\+\d{1,3}\d{9,}$/, {
    message:
      "Phone number must be in the format +[country code][number] and at least 9 digits long",
  }),
  address: z.string().min(3, { message: "Address cannot be empty" }),
});
