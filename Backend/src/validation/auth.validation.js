const {z} = require("zod");

const registerSchema = z.object({
     fullName: z
        .string()
        .trim()
        .min(3, "Name must contain at least 3 characters"),

    email: z
        .string()
        .trim()
        .min(1,"Email is required")
        .email("Invalid email")
        .regex(
                /^[A-Za-z0-9._%+-]+@gmail\.com$/,
                "Only Gmail addresses are allowed"),

    password: z
        .string()
        .trim()
        .min(8, "Password should be at least 8 characters")
         .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]).+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
         )
});

const loginSchema = z.object({
     email: z
        .string()
        .trim()
        .min(1,"Email is required")
        .email("Invalid Email"),

    password: z
        .string()
        .trim()
        .min(1, "Password is required")
})


const changePasswordSchema = z.object({
  currentPassword: loginSchema.shape.password,
  newPassword: registerSchema.shape.password,
}).refine(
    (data) => data.newPassword !== data.currentPassword,
    {
      message: "New password cannot be the same as current password",
      path: ["newPassword"],
    }
  );

module.exports = {
    registerSchema , loginSchema , changePasswordSchema
};