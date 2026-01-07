import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/shared/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock, Save, AlertCircle, Edit2, X } from 'lucide-react';
import { useClosedTime } from '../hooks/useClosedTime';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ClosedTimePage = () => {
  const { closedTime, isLoading, updateClosedTime, isUpdating } = useClosedTime();
  const [timeValue, setTimeValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (closedTime) {
      setTimeValue(closedTime.substring(0, 5));
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [closedTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timeValue) {
      updateClosedTime({ closedTime: `${timeValue}:00` });
    }
  };

  const handleCancel = () => {
    if (closedTime) {
      setTimeValue(closedTime.substring(0, 5));
      setIsEditing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Clock className="w-8 h-8" />
            تحديد وقت الخروج الرسمي
          </h1>
          <p className="text-muted-foreground mt-2">
            حدد الوقت الرسمي لخروج الطلاب من المدرسة
          </p>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </CardContent>
          </Card>
        ) : (
          <>
            {!closedTime && !isEditing && (
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  لا يوجد وقت خروج محدد حالياً
                </AlertDescription>
              </Alert>
            )}

            {closedTime && !isEditing ? (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">وقت الخروج المحدد</CardTitle>
                  <CardDescription>
                    الوقت الرسمي لخروج الطلاب من المدرسة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center py-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/20">
                    <div className="text-center">
                      <Clock className="w-16 h-16 mx-auto mb-4 text-primary" />
                      <p className="text-6xl font-bold text-primary mb-2">
                        {closedTime.substring(0, 5)}
                      </p>
                      <p className="text-muted-foreground">
                        {parseInt(closedTime.substring(0, 2)) >= 12 ? 'مساءً' : 'صباحاً'}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsEditing(true)}
                    className="w-full"
                    size="lg"
                  >
                    <Edit2 className="w-5 h-5 ml-2" />
                    تعديل الوقت
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {closedTime && (
                  <div className="flex items-center justify-center py-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border-2 border-primary/20">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        الوقت الحالي المحدد
                      </p>
                      <Clock className="w-20 h-20 mx-auto mb-4 text-primary" />
                      <p className="text-7xl font-bold text-primary mb-3">
                        {closedTime.substring(0, 5)}
                      </p>
                      <p className="text-lg text-muted-foreground">
                        {parseInt(closedTime.substring(0, 2)) >= 12 ? 'مساءً' : 'صباحاً'}
                      </p>
                    </div>
                  </div>
                )}

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {closedTime ? 'تعديل وقت الخروج' : 'تحديد وقت الخروج'}
                    </CardTitle>
                    <CardDescription>
                      اختر الوقت الرسمي لخروج الطلاب
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="closedTime" className="text-base">
                          الوقت الجديد
                        </Label>
                        <Input
                          id="closedTime"
                          type="time"
                          value={timeValue}
                          onChange={(e) => setTimeValue(e.target.value)}
                          className="text-2xl h-16 text-center font-bold"
                          required
                        />
                        <p className="text-sm text-muted-foreground text-center">
                          اختر الوقت بصيغة 24 ساعة
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          className="flex-1"
                          size="lg"
                          disabled={isUpdating || !timeValue}
                        >
                          <Save className="w-5 h-5 ml-2" />
                          {isUpdating ? 'جاري الحفظ...' : 'حفظ الوقت'}
                        </Button>

                        {closedTime && (
                          <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={handleCancel}
                            disabled={isUpdating}
                          >
                            <X className="w-5 h-5 ml-2" />
                            إلغاء
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClosedTimePage;
