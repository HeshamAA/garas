import { DashboardLayout } from '@/shared/components/layout';
import { Pagination } from '@/shared/components/ui';
import ParentList from '../components/ParentList';
import { ParentsPageHeader } from '../components/ParentsPageHeader';
import { ParentsSearchBar } from '../components/ParentsSearchBar';
import { ParentsFiltersPanel } from '../components/ParentsFiltersPanel';
import { ParentsErrorMessage } from '../components/ParentsErrorMessage';
import { useParentsPage } from '../hooks/useParentsPage';

const ParentsPage = () => {
  const {
    parents,
    isLoading,
    error,
    pagination,
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    fullNameFilter,
    setFullNameFilter,
    nationalIdFilter,
    setNationalIdFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    hasActiveFilters,
    handleSearch,
    handleApplyFilters,
    handleClearFilters,
    handlePageChange,
    handleViewRequests,
  } = useParentsPage();

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <ParentsPageHeader />

        <div className="space-y-4 animate-slide-in-right">
          <ParentsSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearch}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            hasActiveFilters={hasActiveFilters}
          />

          {showFilters && (
            <ParentsFiltersPanel
              fullNameFilter={fullNameFilter}
              onFullNameChange={setFullNameFilter}
              nationalIdFilter={nationalIdFilter}
              onNationalIdChange={setNationalIdFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              hasActiveFilters={hasActiveFilters}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
              onClose={() => setShowFilters(false)}
            />
          )}
        </div>

        {error && <ParentsErrorMessage error={error} />}

        <div className="animate-zoom-in">
          <ParentList
            parents={parents}
            isLoading={isLoading}
            onViewRequests={handleViewRequests}
          />
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

export default ParentsPage;