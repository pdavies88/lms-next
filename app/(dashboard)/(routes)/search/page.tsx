import { Categories } from '@/components/categories';
import { SearchInput } from '@/components/search-input';
import { db } from '@/lib/db';

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return (
    <>
      <div className='px-6 pt-6 md:hidden md:mb-0 block'>
        <SearchInput />
      </div>
      <div className='p-6'>
        <Categories items={categories} />
      </div>
    </>
  );
};

export default SearchPage;
