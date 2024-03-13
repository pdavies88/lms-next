'use client';

import * as z from 'zod';
import { Pencil, PlusCircle, ImageIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FormImageProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
});

export const FormImage = ({ initialData, courseId }: FormImageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();
    file.readAsDataURL(acceptedFiles[0]);
    file.onload = function () {
      setPreview(file.result);
    };
  }, []);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: { 'image/*': [] },
    });

  const toggleEdit = () => (
    setIsEditing((current) => !current), setPreview(null)
  );

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await fetch(`/api/courses/${courseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      toast.success('Course has been updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Error occurred while updating course');
    }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course image
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
            <ImageIcon className='h-10 w-10 text-slate-500' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <Image
              alt='Upload'
              fill
              className='rounded-md object-contain'
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(preview);
              if (preview) {
                onSubmit({ imageUrl: preview as string });
              }
            }}>
            <div {...getRootProps()} onChange={() => console.log('WORLD')}>
              <input
                {...getInputProps()}
                onChange={() => console.log('HELLO')}
              />
              {isDragActive ? (
                <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                  <p>Awaiting drop</p>
                </div>
              ) : (
                <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                  {preview ? (
                    <img
                      src={preview as string}
                      alt='Upload preview'
                      className='h-60'
                    />
                  ) : (
                    <div>Drag or Click to Add image</div>
                  )}
                </div>
              )}
            </div>
            <div className='text-xs text-muted-foreground mt-4'>
              16:9 aspect ratio recommended
            </div>
            <Button className='mt-4'>Save</Button>
          </form>
        </div>
      )}
    </div>
  );
};
