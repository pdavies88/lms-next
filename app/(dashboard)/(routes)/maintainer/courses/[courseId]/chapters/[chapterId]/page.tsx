import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Binary, Eye, LayoutDashboard, Video } from 'lucide-react';

import { db } from '@/lib/db';
import { IconBadge } from '@/components/icon-badge';
import { Banner } from '@/components/banner';
import { FormTitleChapter } from '@/components/chapters-form/form-title';
import { FormDescriptionChapter } from '@/components/chapters-form/form-description';
import { FormAccessChapter } from '@/components/chapters-form/form-access';
import { FormVideoChapter } from '@/components/chapters-form/form-video';
import { FormActionChapter } from '@/components/chapters-form/form-action';
import { FormCodeEmbed } from '@/components/chapters-form/form-code-embed';

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });

  if (!chapter) {
    return redirect('/');
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant='warning'
          label='This chapter is unpublished. It will not be visible in the course'
        />
      )}
      <div className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='w-full'>
            <Link
              href={`/maintainer/courses/${params.courseId}`}
              className='flex items-center text-sm hover:opacity-75 transition mb-6'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to course setup
            </Link>
            <div className='flex items-center justify-between w-full'>
              <div className='flex flex-col gap-y-2'>
                <h1 className='text-2xl font-medium'>Chapter Creation</h1>
                <span className='text-sm text-slate-700'>
                  Complete all fields {completionText}
                </span>
              </div>
              <FormActionChapter
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
          <div className='space-y-4'>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={LayoutDashboard} />
                <h2 className='text-xl'>Customize your chapter</h2>
              </div>
              <FormTitleChapter
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <FormDescriptionChapter
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={Eye} />
                <h2 className='text-xl'>Access Settings</h2>
              </div>
              <FormAccessChapter
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={Video} />
                <h2 className='text-xl'>Add a video</h2>
              </div>
              <FormVideoChapter
                initialData={chapter}
                chapterId={params.chapterId}
                courseId={params.courseId}
              />
            </div>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={Binary} />
                <h2 className='text-xl'>Add a Code Editor Embed</h2>
              </div>
              <FormCodeEmbed
                initialData={chapter}
                chapterId={params.chapterId}
                courseId={params.courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
