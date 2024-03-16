'use client';

import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modals/confirm';
import { toast } from 'sonner';
import { useConfetti } from '../providers/confetti-provider';

interface FormActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const FormAction = ({
  disabled,
  courseId,
  isPublished,
}: FormActionProps) => {
  const router = useRouter();
  const confetti = useConfetti();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await fetch(`/api/courses/${courseId}/unpublish`, {
          method: 'PATCH',
        });
        toast.success('Course unpublished');
      } else {
        await fetch(`/api/courses/${courseId}/publish`, {
          method: 'PATCH',
        });
        toast.success('Course published');
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      });

      toast.success('Course deleted');
      router.refresh();
      router.push(`/maintainer/courses`);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center gap-x-2'>
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant='outline'
        size='sm'>
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size='sm' disabled={isLoading}>
          <Trash className='h-4 w-4' />
        </Button>
      </ConfirmModal>
    </div>
  );
};
