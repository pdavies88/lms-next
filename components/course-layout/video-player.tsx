'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

import { useConfetti } from '../providers/confetti-provider';
import { toast } from 'sonner';

interface VideoPlayerProps {
  url: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  url,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const router = useRouter();
  const confetti = useConfetti();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await fetch(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isCompleted: true }),
        });

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success('Progress updated');
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='relative aspect-video'>
      {isLocked && (
        <div className='absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary'>
          <Lock className='h-8 w-8' />
          <p className='text-sm'>This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <>
          <iframe title={title} src={url} width='100%' height='100%' />
          <div className='flex justify-end'>
            {nextChapterId && (
              <Button className='mt-4' onClick={onEnd}>
                Next Chapter
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
