import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "اسم المستخدم أو البريد الإلكتروني مطلوب"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export const schoolRegistrationSchema = z.object({
  name: z.string().min(2, "اسم المدرسة مطلوب"),
  phoneNumber: z.string().min(10, "رقم الجوال مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  confirmPassword: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
  description: z.string().optional(),
  location: z.string().optional(),
  stages: z.array(z.string()).optional(),
  logo: z.any().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمة المرور غير متطابقة",
  path: ["confirmPassword"],
});

export const ownerRegistrationSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(10, "رقم الجوال مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  confirmPassword: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
  avatar: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمة المرور غير متطابقة",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SchoolFormData = z.infer<typeof schoolRegistrationSchema>;
export type OwnerFormData = z.infer<typeof ownerRegistrationSchema>;

export const useAuthForm = () => {
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const schoolForm = useForm<SchoolFormData>({
    resolver: zodResolver(schoolRegistrationSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      description: "",
      location: "",
      stages: [],
    },
  });

  const ownerForm = useForm<OwnerFormData>({
    resolver: zodResolver(ownerRegistrationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: "",
    },
  });

  return {
    loginForm,
    schoolForm,
    ownerForm,
  };
};