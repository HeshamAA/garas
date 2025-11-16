import { useNavigate } from "react-router-dom";
import { useAppDispatch, useToast } from "@/shared/hooks";
import { loginUser, registerUser } from "../store/authThunks";
import { getDefaultRoute } from "@/shared/constants/routes";
import type { LoginFormData, SchoolFormData, OwnerFormData } from "./useAuthForm";

export const useAuthHandlers = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();


  const handleLogin = async (data: LoginFormData) => {
    try {
      const credentials = {
        identifier: data.identifier,
        password: data.password,
        playerId: 'a',
      };
      const result = await dispatch(loginUser(credentials)).unwrap();
      toast.success("تم تسجيل الدخول بنجاح");
      
      if (result.user) {
        const role = result.user.role.toLowerCase() as 'owner' | 'school' | 'parent' | 'student' | 'deliveryPerson';
        const defaultRoute = getDefaultRoute(role);
        navigate(defaultRoute);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };


  const handleSchoolRegistration = async (data: SchoolFormData) => {
    try {
      const registrationData = {
        ownerName: data.ownerName,
        phone: data.phone,
        email: data.email || '',
        password: data.password,
        confirmPassword: data.confirmPassword,
        avatar: data.avatar || '',
      };
      const result = await dispatch(registerUser({ data: registrationData, accountType: "school" })).unwrap();
      toast.success("تم إنشاء الحساب بنجاح");

      if (result.user) {
        const defaultRoute = getDefaultRoute(result.user.role);
        navigate(defaultRoute);
      }
    } catch (err) {
      console.error('School registration error:', err);
    }
  };

  const handleOwnerRegistration = async (data: OwnerFormData) => {
    try {
      const registrationData = {
        name: data.name,
        phone: data.phone,
        email: data.email || '',
        password: data.password,
        confirmPassword: data.confirmPassword,
        avatar: data.avatar || '',
      };
      const result = await dispatch(registerUser({ data: registrationData, accountType: "owner" })).unwrap();
      toast.success("تم إنشاء الحساب بنجاح");

      if (result.user) {
        const defaultRoute = getDefaultRoute(result.user.role);
        navigate(defaultRoute);
      }
    } catch (err) {
      console.error('Owner registration error:', err);
    }
  };

  return {
    handleLogin,
    handleSchoolRegistration,
    handleOwnerRegistration,
  };
};