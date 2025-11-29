import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/components/ui/button';
import { Bell, School, Users, Shield, Check, Star, Award, Clock } from 'lucide-react';
import { getDefaultRoute } from '@/shared/constants/routes';
import { subscriptionApi } from '@/features/subscription/api/subscriptionApi';
import { SubscriptionPlan } from '@/features/subscription/types/subscription.types';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      const defaultRoute = getDefaultRoute(user.role);
      navigate(defaultRoute);
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoadingPlans(true);
        const response = await subscriptionApi.getPlans({ isActive: true });
        setPlans(response.items);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

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

  const whyChooseUs = [
    {
      icon: Star,
      title: 'سهولة الاستخدام',
      description: 'واجهة بسيطة وسهلة الاستخدام لجميع المستخدمين',
    },
    {
      icon: Award,
      title: 'موثوقية عالية',
      description: 'نظام موثوق ومستقر يعمل على مدار الساعة',
    },
    {
      icon: Clock,
      title: 'دعم فني متواصل',
      description: 'فريق دعم فني جاهز لمساعدتك في أي وقت',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" dir="rtl">
      
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="max-w-4xl text-center space-y-8">
          
          <div className="flex justify-center mb-4 md:mb-6 animate-in fade-in duration-700">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <Bell className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-blue-600 relative animate-bell-pulse" strokeWidth={1.5} />
            </div>
          </div>

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

      {/* Plans & Pricing Section */}
      <div className="py-16 md:py-24 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              الخطط والأسعار
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              اختر الخطة المناسبة لمدرستك
            </p>
          </div>

          {loadingPlans ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">لا توجد خطط متاحة حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-blue-300"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    {plan.description && (
                      <p className="text-gray-600 text-sm md:text-base mb-4">
                        {plan.description}
                      </p>
                    )}
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl md:text-5xl font-bold text-blue-600">
                        {plan.price}
                      </span>
                      <span className="text-gray-600">ريال</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      لمدة {plan.duration} يوم
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>حتى {plan.maxStudents} طالب</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>حتى {plan.maxDeliveryPersons} مستلم</span>
                    </div>
                    {plan.features && plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-700">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full py-6 text-lg font-semibold"
                    onClick={() => navigate('/login')}
                  >
                    ابدأ الآن
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 md:py-24 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              لماذا تختار جرس؟
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم لك أفضل تجربة في إدارة المدارس
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-4 transition-transform hover:scale-110">
                    <item.icon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 text-center leading-relaxed">
                  {item.description}
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