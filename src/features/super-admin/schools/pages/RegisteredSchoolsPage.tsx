import { DashboardLayout } from '@/shared/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Pagination } from '@/shared/components/ui';
import { useRegisteredSchools } from '../hooks/useRegisteredSchools';
import { SchoolCard } from '../components/SchoolCard';
import { SchoolsFilters } from '../components/SchoolsFilters';

const RegisteredSchoolsPage = () => {
  const {
    schools,
    isLoading,
    error,
    pagination,
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    nameFilter,
    setNameFilter,
    locationFilter,
    setLocationFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    hasActiveFilters,
    changePage,
    handleSearch,
    handleApplyFilters,
    handleClearFilters,
  } = useRegisteredSchools();

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
            <SchoolsFilters
              nameFilter={nameFilter}
              onNameChange={setNameFilter}
              locationFilter={locationFilter}
              onLocationChange={setLocationFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              hasActiveFilters={hasActiveFilters}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
              onClose={() => setShowFilters(false)}
            />
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