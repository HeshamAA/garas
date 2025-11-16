import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/components/ui/button';
import { Bell, School, Users, Shield } from 'lucide-react';
import { getDefaultRoute } from '@/shared/constants/routes';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  /**
   * Redirect authenticated users to their appropriate dashboard
   * Prevents logged-in users from seeing the landing page
   */
  useEffect(() => {
    if (isAuthenticated && user) {
      const defaultRoute = getDefaultRoute(user.role);
      navigate(defaultRoute);
    }
  }, [isAuthenticated, user, navigate]);

  const features = [
    {
      icon: School,
      title: 'إدارة المدارس',
      description: 'نظام متكامل لإدارة بيانات المدارس والطلاب',
    },
    {
      icon: Users,
      title: 'متابعة الطلاب',
      description: 'تتبع حضور وانصراف الطلاب بسهولة وأمان',
    },
    {
      icon: Shield,
      title: 'أمان عالي',
      description: 'حماية بيانات الطلاب وأولياء الأمور',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" dir="rtl">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="max-w-4xl text-center space-y-8">
          {/* Bell Icon */}
          <div className="flex justify-center mb-4 md:mb-6 animate-in fade-in duration-700">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <Bell className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-blue-600 relative animate-bell-pulse" strokeWidth={1.5} />
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-3 md:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
              مرحباً بك في جرس
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              نظام إدارة المدارس واستلام الطلاب الذكي
            </p>
            <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto px-4">
              منصة متكاملة تربط المدارس بأولياء الأمور لضمان سلامة وأمان الطلاب
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 px-4">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold shadow-lg button-hover-effect"
            >
              تسجيل الدخول
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/login', { state: { mode: 'register' } })}
              className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold border-2 hover:bg-blue-50 button-hover-effect"
            >
              إنشاء حساب جديد
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto mt-16 md:mt-24 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 cursor-pointer"
              >
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="bg-blue-100 rounded-full p-3 md:p-4 transition-transform hover:scale-110">
                    <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;