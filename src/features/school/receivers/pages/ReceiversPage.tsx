import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/shared/components/layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/shared/hooks';
import { fetchReceivers } from '../store/receiversThunks';
import ReceiverCard from '../components/ReceiverCard';
import { Pagination } from '@/shared/components/ui';
import { GetReceiversParams } from '../api/receiversApi';

const ReceiversPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error, pagination } = useAppSelector(state => state.receivers);
  
  const [params, setParams] = useState<GetReceiversParams>({
    page: 1,
    limit: 10,
    sortOrder: 'ASC',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [fullNameFilter, setFullNameFilter] = useState('');
  const [nationalIdFilter, setNationalIdFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  
  useEffect(() => {
    dispatch(fetchReceivers(params));
  }, [dispatch, params]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setParams({ ...params, keyword: searchQuery, page: 1 });
  };

  const handleApplyFilters = () => {
    setParams({
      ...params,
      fullName: fullNameFilter || undefined,
      nationalId: nationalIdFilter || undefined,
      sortBy: sortBy || undefined,
      sortOrder,
      page: 1,
    });
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFullNameFilter('');
    setNationalIdFilter('');
    setSortBy('');
    setSortOrder('ASC');
    setParams({ page: 1, limit: 10, sortOrder: 'ASC' });
  };

  const handlePageChange = (page: number) => {
    setParams({ ...params, page });
  };

  const hasActiveFilters = fullNameFilter || nationalIdFilter || sortBy;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <div className="animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-right">المستلمون</h2>
          <p className="text-muted-foreground text-right mt-2">
            إدارة المستخدمين المسجلين في النظام
          </p>
        </div>

        <div className="space-y-4 animate-slide-in-right">
          <div className="flex gap-3" dir="rtl">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Input
                placeholder="ابحث عن اسم المستلم أو الرقم القومي"
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
                  <label className="text-sm font-medium text-right block">الرقم القومي</label>
                  <Input
                    placeholder="ابحث بالرقم القومي"
                    value={nationalIdFilter}
                    onChange={(e) => setNationalIdFilter(e.target.value)}
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
                      <SelectItem value="fullName">الاسم</SelectItem>
                      <SelectItem value="nationalId">الرقم القومي</SelectItem>
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
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-right">
            {error}
          </div>
        )}

        <div className="animate-zoom-in">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">جاري التحميل...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">لا توجد مستلمون</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((receiver) => (
                <ReceiverCard
                  key={receiver.id} 
                  receiver={receiver}
                />
              ))}
            </div>
          )}
        </div>

        {pagination && (
          <Pagination 
            metadata={pagination} 
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ReceiversPage;