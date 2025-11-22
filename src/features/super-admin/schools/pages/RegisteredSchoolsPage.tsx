import { useState } from 'react';
import { DashboardLayout } from '@/shared/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useToast } from '@/shared/hooks';
import { useSchools } from '../hooks/useSchools';
import { SchoolCard } from '../components/SchoolCard';
import { Pagination } from '@/shared/components/ui';

const RegisteredSchoolsPage = () => {
  const toast = useToast();
  const { items: schools, isLoading, error, pagination, changePage, search, filterByName, filterByLocation, sort, refetch } = useSchools(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  


  const handleAddSchool = () => {
    toast.info('سيتم إضافة نموذج تسجيل المدرسة قريباً');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(searchQuery);
  };

  const handleApplyFilters = () => {
    refetch({
      name: nameFilter || undefined,
      location: locationFilter || undefined,
      sortBy: sortBy || undefined,
      sortOrder,
      page: 1,
    });
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setNameFilter('');
    setLocationFilter('');
    setSortBy('');
    setSortOrder('ASC');
    refetch({ page: 1 });
  };

  const hasActiveFilters = nameFilter || locationFilter || sortBy;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex justify-between items-center animate-fade-in">
        
          <div className="text-right">
            <h2 className="text-2xl lg:text-3xl font-bold">المدارس المسجلة</h2>
            <p className="text-muted-foreground text-sm mt-1">
              إدارة المدارس المسجلة في المنصة
            </p>
          </div>
        </div>

        <div className="space-y-4 animate-slide-in-right">
          <div className="flex gap-3" dir="rtl">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Input
                placeholder="ابحث عن اسم المدرسة أو الموقع أو الوصف"
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
                  <label className="text-sm font-medium text-right block">اسم المدرسة</label>
                  <Input
                    placeholder="ابحث بالاسم"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">الموقع</label>
                  <Input
                    placeholder="ابحث بالموقع"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">ترتيب حسب</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر الترتيب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">الاسم</SelectItem>
                      <SelectItem value="location">الموقع</SelectItem>
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

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-right">
            {error}
          </div>
        )}

        <div className="animate-slide-in-right">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">جاري التحميل...</p>
            </div>
          ) : schools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">لا توجد مدارس مسجلة</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schools.map((school) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                />
              ))}
            </div>
          )}
        </div>

        {pagination && (
          <Pagination 
            metadata={pagination} 
            onPageChange={changePage}
            isLoading={isLoading}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default RegisteredSchoolsPage;