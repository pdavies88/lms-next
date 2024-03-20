'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Binary, Pencil, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Chapter } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

interface FormCodeEmbedProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  codeEmbedUrl: z.string().min(1),
});

export const FormCodeEmbed = ({
  initialData,
  courseId,
  chapterId,
}: FormCodeEmbedProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codeEmbedUrl: initialData?.codeEmbedUrl || '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await fetch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      toast.success('Chapter updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Chapter code editor embed
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.codeEmbedUrl && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add a code editor embed
            </>
          )}
          {!isEditing && initialData.codeEmbedUrl && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit code editor embed
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.codeEmbedUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
            <Binary className='h-10 w-10 text-slate-500' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <iframe src={initialData.codeEmbedUrl} width='100%' height='100%' />
          </div>
        ))}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4'>
            <FormField
              control={form.control}
              name='codeEmbedUrl'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder='e.g. Code Editor Embed URL from StackBlitz'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='text-xs text-muted-foreground mt-4'>
              Upload this chapter&apos;s code editor
            </div>
            <div className='flex items-center gap-x-2'>
              <Button disabled={!isValid || isSubmitting} type='submit'>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
      {initialData.codeEmbedUrl && !isEditing && (
        <div className='text-xs text-muted-foreground mt-2'>
          If code editor does not load, please check the URL and try again. Code
          editors are embedded and must have an embed enabled URL.
        </div>
      )}
    </div>
  );
};
