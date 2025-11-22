import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/shared/store/store";
import { Toaster } from "react-hot-toast";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { AuthPage, ProtectedRoute } from "@/features/auth";
import { StudentsPage } from "@/features/school/students";
import { ParentsPage } from "@/features/school/parents";
import { ReceiversPage } from "@/features/school/receivers";
import { RequestsPage } from "@/features/super-admin/requests";
import { ReceiveRequestsPage } from "@/features/school/pickup-requests";
import { RegisteredSchoolsPage } from "@/features/super-admin/schools";
import { SchoolDashboardPage } from "@/features/school/dashboard";
import { UserDashboardPage } from "./features/super-admin/dashboard";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<AuthPage />} />

            <Route 
              path="/school-dashboard" 
              element={
                <ProtectedRoute requiredRole="school">
                  <SchoolDashboardPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/parents" 
              element={
                <ProtectedRoute requiredRole="school">
                  <ParentsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/students" 
              element={
                <ProtectedRoute requiredRole="school">
                  <StudentsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/receivers" 
              element={
                <ProtectedRoute requiredRole="school">
                  <ReceiversPage />
                </ProtectedRoute>
              } 
            />
           
            <Route 
              path="/receive-requests" 
              element={
                <ProtectedRoute requiredRole="school">
                  <ReceiveRequestsPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <UserDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/requests" 
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <RequestsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/registered-schools" 
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <RegisteredSchoolsPage />
                </ProtectedRoute>
              } 
            />

          

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;