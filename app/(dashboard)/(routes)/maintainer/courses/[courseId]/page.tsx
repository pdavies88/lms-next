import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { CircleDollarSign, LayoutDashboard, ListChecks } from 'lucide-react';
import { db } from '@/lib/db';
import { IconBadge } from '@/components/icon-badge';
import { Banner } from '@/components/banner';
import { FormTitle } from '@/components/course-form/form-title';
import { FormDescription } from '@/components/course-form/form-description';
import { FormImage } from '@/components/course-form/form-image';
import { FormCategory } from '@/components/course-form/form-category';
import { FormPrice } from '@/components/course-form/form-price';
import { FormChapters } from '@/components/course-form/form-chapters';
import { FormAction } from '@/components/course-form/form-action';

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  if (!course) {
    return redirect('/');
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner label='This course is unpublished. It will not be visible to the students.' />
      )}
      <div className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-2xl font-medium'>Course setup</h1>
            <span className='text-sm text-slate-700'>
              Complete all fields {completionText}
            </span>
          </div>
          <FormAction
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={LayoutDashboard} />
              <h2 className='text-xl'>Customize your course</h2>
            </div>
            <FormTitle initialData={course} courseId={course.id} />
            <FormDescription initialData={course} courseId={course.id} />
            <FormImage initialData={course} courseId={course.id} />
            <FormCategory
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className='space-y-6'>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={ListChecks} />
                <h2 className='text-xl'>Course chapters</h2>
              </div>
              <FormChapters initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={CircleDollarSign} />
                <h2 className='text-xl'>Sell your course</h2>
              </div>
              <FormPrice initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
