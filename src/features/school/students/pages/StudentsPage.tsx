import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/shared/components/layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';

import { useAppSelector, useAppDispatch } from '@/shared/hooks';
import { StudentStatus } from '../types/student.types';
import { fetchStudents } from '../store/studentsThunks';
import { StudentCard } from '../components/StudentCard';
import { Pagination } from '@/shared/components/ui';
import { GetStudentsParams } from '../api/studentsApi';
import { EmptyState } from '@/shared/components/EmptyState';

const StudentsPage = () => {
  const dispatch = useAppDispatch();
  const { items: students, pagination } = useAppSelector(state => state.students);
 
  const [params, setParams] = useState<GetStudentsParams>({
    page: 1,
    limit: 10,
    sortOrder: 'ASC',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [fullNameFilter, setFullNameFilter] = useState('');
  const [codeFilter, setCodeFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [activeFilter, setActiveFilter] = useState<StudentStatus | 'all'>('all');
  
  useEffect(() => {
    dispatch(fetchStudents(params));
  }, [dispatch, params.page, params.limit, params.keyword, params.fullName, params.code, params.stage, params.class, params.sortBy, params.sortOrder]);

  const handleViewRequests = (studentId: number) => {
    // TODO: Navigate to student requests
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setParams({ ...params, keyword: searchQuery, page: 1 });
  };

  const handleApplyFilters = () => {
    setParams({
      ...params,
      fullName: fullNameFilter || undefined,
      code: codeFilter || undefined,
      stage: stageFilter || undefined,
      class: classFilter || undefined,
      sortBy: sortBy || undefined,
      sortOrder,
      page: 1,
    });
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFullNameFilter('');
    setCodeFilter('');
    setStageFilter('');
    setClassFilter('');
    setSortBy('');
    setSortOrder('ASC');
    setParams({ page: 1, limit: 10, sortOrder: 'ASC' });
  };

  const handlePageChange = (page: number) => {
    setParams({ ...params, page });
  };

  const hasActiveFilters = fullNameFilter || codeFilter || stageFilter || classFilter || sortBy;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div className="animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-right">الطلاب</h2>
          <p className="text-muted-foreground text-right mt-2">
            إدارة الطلاب المسجلين
          </p>
        </div>

        <div className="space-y-4 animate-slide-in-right">
          <div className="flex gap-3" dir="rtl">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Input
                placeholder="ابحث عن اسم الطالب أو الكود"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card text-foreground border rounded-full h-12 pr-12 text-right placeholder:text-right"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>
            </form>
            
            <Button
              variant={showFilters ? 'default' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full px-6 gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              فلترة
              {hasActiveFilters && (
                <span className="bg-primary-foreground text-primary rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="bg-card border rounded-lg p-6 space-y-4" dir="rtl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">خيارات الفلترة والترتيب</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">الاسم الكامل</label>
                  <Input
                    placeholder="ابحث بالاسم"
                    value={fullNameFilter}
                    onChange={(e) => setFullNameFilter(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">كود الطالب</label>
                  <Input
                    placeholder="ابحث بالكود"
                    value={codeFilter}
                    onChange={(e) => setCodeFilter(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">المرحلة</label>
                  <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر المرحلة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first">الابتدائية</SelectItem>
                      <SelectItem value="middle">الإعدادية</SelectItem>
                      <SelectItem value="secondary">الثانوية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">الفصل</label>
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر الفصل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one">الأول</SelectItem>
                      <SelectItem value="two">الثاني</SelectItem>
                      <SelectItem value="three">الثالث</SelectItem>
                      <SelectItem value="four">الرابع</SelectItem>
                      <SelectItem value="five">الخامس</SelectItem>
                      <SelectItem value="six">السادس</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">ترتيب حسب</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر الترتيب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullName">الاسم</SelectItem>
                      <SelectItem value="code">الكود</SelectItem>
                      <SelectItem value="createdAt">تاريخ التسجيل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">نوع الترتيب</label>
                  <Select value={sortOrder} onValueChange={(value: 'ASC' | 'DESC') => setSortOrder(value)}>
                    <SelectTrigger className="text-right">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ASC">تصاعدي (أ-ي)</SelectItem>
                      <SelectItem value="DESC">تنازلي (ي-أ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="flex-1 rounded-full"
                  disabled={!hasActiveFilters}
                >
                  مسح الفلاتر
                </Button>
                <Button
                  onClick={handleApplyFilters}
                  className="flex-1 rounded-full"
                >
                  تطبيق الفلاتر
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="animate-zoom-in">
          {students && students.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewRequests={handleViewRequests}
                />
              ))}
            </div>
          ) : (
            <EmptyState 
              message="لا يوجد طلاب" 
              description="لم يتم العثور على أي طلاب. قم بإضافة طلاب جدد للبدء."
            />
          )}
        </div>

        {pagination && (
          <Pagination 
            metadata={pagination} 
            onPageChange={handlePageChange}
            isLoading={false}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentsPage;