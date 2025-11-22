import { useNavigate } from "react-router-dom";
import { useAppDispatch, useToast } from "@/shared/hooks";
import { loginUser, registerUser } from "../store/authThunks";
import { getDefaultRoute } from "@/shared/constants/routes";
import { schoolRegistrationApi, SchoolSignUpData } from "../api/schoolRegistrationApi";
import { setUser, setToken } from "../store/authSlice";
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
        const role = result.user.role.toLowerCase() as 'super_admin' | 'school';
        const defaultRoute = getDefaultRoute(role);
        navigate(defaultRoute);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleSchoolRegistration = async (data: SchoolFormData) => {
    try {
      const signUpData: SchoolSignUpData = {
        email: data.email,
        name: data.name,
        phoneNumber: data.phoneNumber,
        password: data.password,
        playerId: data.playerId,
        description: data.description,
        location: data.location,
        stages: data.stages || [],
      };

      if (data.logo) {
        signUpData.logo = data.logo;
      }

      const response = await schoolRegistrationApi.signUp(signUpData);

      if (response.success) {
        const user = {
          ...response.data.user,
          role: response.data.user.role.toLowerCase() as 'super_admin' | 'school',
        };
        
        dispatch(setUser(user));
        dispatch(setToken(response.data.accessToken));
        
        toast.success(response.message || "تم إنشاء الحساب بنجاح");
        
        const defaultRoute = getDefaultRoute(user.role);
        navigate(defaultRoute);
      } else {
        toast.error(response.message || "حدث خطأ أثناء التسجيل");
      }
    } catch (err: any) {
      console.error('School registration error:', err);
      toast.error(err?.message || "حدث خطأ أثناء التسجيل");
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
      const result = await dispatch(registerUser({ data: registrationData, accountType: "super_admin" })).unwrap();
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