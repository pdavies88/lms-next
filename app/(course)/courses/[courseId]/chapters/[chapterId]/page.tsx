import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getChapter } from '@/actions/get-chapter';
import { Banner } from '@/components/banner';
import { VideoPlayer } from '@/components/course-layout/video-player';
import { Separator } from '@/components/ui/separator';
import { CourseEnrollButton } from '@/components/enroll-button';
import DOMPurify from 'isomorphic-dompurify';
import { CourseProgressButton } from '@/components/course-layout/progress-button';
import { CodeEmbed } from '@/components/course-layout/code-embed';

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const { chapter, course, nextChapter, userProgress, purchase } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) {
    return redirect('/');
  }

  const isLocked = !chapter.isFree && !purchase;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant='success' label='You already completed this chapter.' />
      )}
      {isLocked && (
        <Banner
          variant='warning'
          label='You need to purchase this course to watch this chapter.'
        />
      )}
      <div className='flex flex-col p-8'>
        <h2 className='text-2xl font-semibold mb-4'>{chapter.title}</h2>
        {chapter.videoUrl && (
          <>
            <VideoPlayer
              chapterId={params.chapterId}
              title={chapter.title}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              url={chapter.videoUrl}
              isLocked={isLocked}
            />
            <Separator className='my-8' />
          </>
        )}
        <div>
          <div
            className='tiptap bg-white p-2'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(chapter.description!),
            }}
          />
          {chapter.codeEmbedUrl && (
            <div className='mt-8'>
              <CodeEmbed
                title={chapter.title}
                url={chapter.codeEmbedUrl!}
                isLocked={isLocked}
              />
            </div>
          )}
        </div>
        <div className='mt-8 flex justify-end'>
          {purchase ? (
            <CourseProgressButton
              chapterId={params.chapterId}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isCompleted}
            />
          ) : (
            <CourseEnrollButton
              courseId={params.courseId}
              price={course.price!}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
