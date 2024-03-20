import { Lock } from 'lucide-react';

interface CodeEmbedProps {
  url: string;
  isLocked: boolean;
  title: string;
}

export const CodeEmbed = ({ url, isLocked, title }: CodeEmbedProps) => {
  return (
    <div className='relative aspect-video'>
      {isLocked && (
        <div className='absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary'>
          <Lock className='h-8 w-8' />
          <p className='text-sm'>This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <iframe title={title} src={url} width='100%' height='100%' />
      )}
    </div>
  );
};
