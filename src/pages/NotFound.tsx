import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md text-center space-y-6">
        <div className="relative">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertCircle className="w-24 h-24 text-primary/40" />
          </div>
        </div>
        <h2 className="text-3xl font-semibold text-gray-900">
          الصفحة غير موجودة
        </h2>
        <p className="text-lg text-gray-600">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/')}
          className="px-8"
        >
          <Home className="ml-2 h-5 w-5" />
          العودة للرئيسية
        </Button>
      </div>
    </div>
  );
};

export default NotFound;