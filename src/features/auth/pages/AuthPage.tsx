import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useToast } from "@/shared/hooks";
import { clearError, setUser, setToken } from "../store/authSlice";
import { getDefaultRoute } from "@/shared/constants/routes";
import { useAuthForm, useAuthHandlers, useAuthState } from "../hooks";
import { LoginForm } from "../components/LoginForm";
import { RegistrationForms } from "../components/RegistrationForms";
import { AuthBranding } from "../components/AuthBranding";
import { AuthHeader } from "../components/AuthHeader";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isLoading, isRegistering, error, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const { loginForm, schoolForm, ownerForm } = useAuthForm();
  const { handleLogin, handleSchoolRegistration, handleOwnerRegistration } = useAuthHandlers();
  const {
    mode,
    accountType,
    imagePreview,
    showPassword,
    setShowPassword,
    toggleMode,
    handleAccountTypeChange,
    handleImageUpload,
  } = useAuthState();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');

    if (token && userStr && !isAuthenticated) {
      try {
        const storedUser = JSON.parse(userStr);
        dispatch(setUser(storedUser));
        dispatch(setToken(token));
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch, toast]);

  if (isAuthenticated && user) {
    const userRole = user.role.toLowerCase() as 'owner' | 'school' | 'parent' | 'student' | 'deliveryPerson';
    const defaultRoute = getDefaultRoute(userRole);
    return <Navigate to={defaultRoute} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4 md:p-6" dir="rtl">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6 md:space-y-8">
          <AuthHeader mode={mode} />

          {mode === "login" ? (
            <LoginForm
              form={loginForm}
              onSubmit={handleLogin}
              isLoading={isLoading}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onToggleMode={toggleMode}
            />
          ) : (
            <RegistrationForms
              accountType={accountType}
              onAccountTypeChange={handleAccountTypeChange}
              schoolForm={schoolForm}
              ownerForm={ownerForm}
              onSchoolSubmit={handleSchoolRegistration}
              onOwnerSubmit={handleOwnerRegistration}
              isRegistering={isRegistering}
              imagePreview={imagePreview}
              onImageUpload={(e) => handleImageUpload(e, schoolForm.setValue, ownerForm.setValue)}
              onToggleMode={toggleMode}
            />
          )}
        </div>

        <AuthBranding />
      </div>
    </div>
  );
};

export default AuthPage;