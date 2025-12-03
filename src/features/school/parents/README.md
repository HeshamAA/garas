# Parents Feature

## 📋 Overview

تم إعادة هيكلة Parents feature باستخدام Clean Architecture لفصل الـ UI عن الـ Logic.

## 🏗️ Architecture

### Before (Mixed Concerns)
```tsx
const ParentsPage = () => {
  // 30+ lines of state
  const [params, setParams] = useState();
  const [searchQuery, setSearchQuery] = useState();
  // ...
  
  // 50+ lines of handlers
  const handleSearch = () => { /* ... */ };
  const handleApplyFilters = () => { /* ... */ };
  // ...
  
  // 150+ lines of UI
  return <div>...</div>;
};
```

### After (Separated Concerns)
```tsx
// Logic in hook
const { parents, isLoading, handleSearch, ... } = useParentsPage();

// UI in components
return (
  <>
    <ParentsPageHeader />
    <ParentsSearchBar {...searchProps} />
    <ParentsFiltersPanel {...filterProps} />
    <ParentList parents={parents} />
  </>
);
```

## 📁 File Structure

```
parents/
├── api/
│   └── parentsApi.ts              # API calls
├── components/
│   ├── index.ts                   # Barrel export
│   ├── ParentList.tsx             # Existing: Parents list
│   ├── ParentsPageHeader.tsx      # UI: Page header
│   ├── ParentsSearchBar.tsx       # UI: Search bar
│   ├── ParentsFiltersPanel.tsx    # UI: Filters panel
│   └── ParentsErrorMessage.tsx    # UI: Error message
├── hooks/
│   ├── index.ts                   # Barrel export
│   ├── useParents.ts              # Logic: Parents CRUD
│   └── useParentsPage.ts          # Logic: Page state & handlers
├── store/
│   ├── parentsSlice.ts            # Redux: State slice
│   └── parentsThunks.ts           # Redux: Async actions
├── types/
│   └── parent.types.ts            # Types: All interfaces
├── pages/
│   └── ParentsPage.tsx            # Page: Main parents page
└── README.md                      # Documentation
```

## 🎯 Key Components

### 1. Hooks Layer (`hooks/`)

#### `useParentsPage`
**Purpose:** Manage page state, filters, and handlers

```typescript
export const useParentsPage = () => {
  const [params, setParams] = useState<GetParentsParams>({...});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  // ... more state
  
  const handleSearch = useCallback((e: React.FormEvent) => {
    // Search logic
  }, [params, searchQuery]);
  
  return {
    // Data
    parents,
    isLoading,
    error,
    pagination,
    
    // State
    searchQuery,
    showFilters,
    fullNameFilter,
    // ...
    
    // Handlers
    handleSearch,
    handleApplyFilters,
    handleClearFilters,
    // ...
  };
};
```

**Features:**
- ✅ Centralized state management
- ✅ Memoized handlers with `useCallback`
- ✅ Automatic data fetching
- ✅ Filter management

#### `useParents`
**Purpose:** CRUD operations for parents

```typescript
export const useParents = (params?: GetParentsParams) => {
  // Fetch, filter, select, delete parents
  return {
    parents,
    selectedParent,
    isLoading,
    deleteParent,
    refresh,
    // ...
  };
};
```

### 2. Components Layer (`components/`)

#### Atomic Components

**`ParentsPageHeader`**
```tsx
export const ParentsPageHeader = () => {
  return (
    <div>
      <h2>أولياء الأمور</h2>
      <p>إدارة أولياء الأمور المسجلين</p>
    </div>
  );
};
```

**`ParentsErrorMessage`**
```tsx
export const ParentsErrorMessage = ({ error }: ParentsErrorMessageProps) => {
  return (
    <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
      {error}
    </div>
  );
};
```

**`ParentsSearchBar`**
```tsx
export const ParentsSearchBar = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  showFilters,
  onToggleFilters,
  hasActiveFilters,
}: ParentsSearchBarProps) => {
  return (
    <div className="flex gap-3">
      <form onSubmit={onSearchSubmit}>
        <Input value={searchQuery} onChange={onSearchChange} />
      </form>
      <Button onClick={onToggleFilters}>
        فلترة {hasActiveFilters && <Badge>!</Badge>}
      </Button>
    </div>
  );
};
```

#### Composite Components

**`ParentsFiltersPanel`**
```tsx
export const ParentsFiltersPanel = ({
  fullNameFilter,
  onFullNameChange,
  nationalIdFilter,
  onNationalIdChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  hasActiveFilters,
  onApplyFilters,
  onClearFilters,
  onClose,
}: ParentsFiltersPanelProps) => {
  return (
    <div className="bg-card border rounded-lg p-6">
      {/* Filter inputs */}
      <Button onClick={onApplyFilters}>تطبيق الفلاتر</Button>
      <Button onClick={onClearFilters}>مسح الفلاتر</Button>
    </div>
  );
};
```

## 🔄 Data Flow

```
User Interaction
      ↓
Component Event Handler
      ↓
useParentsPage Hook
      ↓
Redux Thunk (fetchParents)
      ↓
API Call (parentsApi)
      ↓
Redux State Update
      ↓
Component Re-render
```

## ✅ Benefits

### 1. Separation of Concerns
- **Logic** منفصل في `hooks/`
- **UI** منفصل في `components/`
- **State** منفصل في `store/`
- **Types** منفصلة في `types/`

### 2. Reusability
```tsx
// يمكن استخدام ParentsSearchBar في أي صفحة
<ParentsSearchBar
  searchQuery={query}
  onSearchChange={setQuery}
  onSearchSubmit={handleSearch}
/>

// يمكن استخدام useParentsPage في صفحات أخرى
const { parents, handleSearch } = useParentsPage();
```

### 3. Testability
```typescript
// اختبار الـ hook
test('useParentsPage handles search', () => {
  const { result } = renderHook(() => useParentsPage());
  act(() => result.current.handleSearch(mockEvent));
  expect(result.current.searchQuery).toBe('test');
});

// اختبار الـ component
test('ParentsSearchBar renders correctly', () => {
  render(<ParentsSearchBar {...props} />);
  expect(screen.getByPlaceholderText('ابحث')).toBeInTheDocument();
});
```

### 4. Maintainability
- سهولة إيجاد الكود المطلوب
- سهولة التعديل بدون تأثير على أجزاء أخرى
- سهولة إضافة features جديدة

### 5. Performance
- `useCallback` للـ handlers
- Memoized computed values
- Smaller, focused components

## 🚀 Usage Examples

### Example 1: Using the Page
```tsx
import ParentsPage from '@/features/school/parents/pages/ParentsPage';

// في الـ routing
<Route path="/parents" element={<ParentsPage />} />
```

### Example 2: Using Individual Components
```tsx
import { ParentsSearchBar, ParentsFiltersPanel } from '@/features/school/parents/components';

const MyCustomPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div>
      <ParentsSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
        showFilters={false}
        onToggleFilters={() => {}}
        hasActiveFilters={false}
      />
    </div>
  );
};
```

### Example 3: Using the Hook
```tsx
import { useParentsPage } from '@/features/school/parents/hooks';

const MyComponent = () => {
  const { parents, isLoading, handleSearch } = useParentsPage();
  
  return (
    <div>
      {isLoading ? <Loader /> : <ParentsList parents={parents} />}
    </div>
  );
};
```

## 📝 Best Practices

1. **Keep components pure** - Components should only receive props and render UI
2. **Logic in hooks** - All business logic should be in custom hooks
3. **Type everything** - Use TypeScript types for all props and returns
4. **Memoize handlers** - Use `useCallback` for event handlers
5. **Reuse components** - Build atomic components that can be reused

## 🔧 Maintenance

### Adding New Filter
1. Add state in `useParentsPage`:
   ```typescript
   const [newFilter, setNewFilter] = useState('');
   ```
2. Add to `handleApplyFilters`:
   ```typescript
   newFilter: newFilter || undefined,
   ```
3. Add to `ParentsFiltersPanel` props and UI

### Adding New Action
1. Add handler in `useParentsPage`:
   ```typescript
   const handleNewAction = useCallback(() => {
     // Logic
   }, [dependencies]);
   ```
2. Return from hook
3. Pass to component that needs it

## 📊 Metrics

- **Before:** 1 file, ~220 lines
- **After:** 9 files, ~30-80 lines each
- **Main page lines:** ~220 → ~80 (-64%)
- **Reusable components:** 4
- **Custom hooks:** 2
- **Type safety:** 100%

## 📚 Related Documentation

- [React Hooks](https://react.dev/reference/react)
- [TypeScript](https://www.typescriptlang.org/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
