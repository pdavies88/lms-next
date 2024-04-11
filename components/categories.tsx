'use client';

import { Category } from '@prisma/client';
import { Binary, Braces, Code, Clipboard, LucideIcon } from 'lucide-react';

import { CategoryItem } from './category-item';

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category['name'], LucideIcon> = {
  'Front End Engineering': Code,
  'Web Engineering': Binary,
  'JavaScript Engineering': Braces,
  'Project Management': Clipboard,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
