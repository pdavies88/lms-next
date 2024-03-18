'use client';

import { Category } from '@prisma/client';
import {
  Atom,
  Clapperboard,
  Binary,
  LineChart,
  Music,
  Camera,
  Trophy,
  LucideIcon,
} from 'lucide-react';

import { CategoryItem } from './category-item';

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category['name'], LucideIcon> = {
  Music: Music,
  Photography: Camera,
  Fitness: Trophy,
  Accounting: LineChart,
  'Computer Science': Binary,
  Filming: Clapperboard,
  Engineering: Atom,
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
