import { cn } from '@/lib/utils';
import { MessageCircleHeart } from 'lucide-react';

interface UpvoteLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showText?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { box: 'h-6 w-6', icon: 'h-3.5 w-3.5', text: 'text-sm' },
  md: { box: 'h-7 w-7', icon: 'h-4 w-4', text: 'text-base' },
  lg: { box: 'h-10 w-10', icon: 'h-5 w-5', text: 'text-xl' },
};

export function UpvoteLogo({ size = 'md', variant = 'dark', showText = true, className }: UpvoteLogoProps) {
  const s = sizeMap[size];
  const isDark = variant === 'dark';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(s.box, 'flex items-center justify-center rounded-lg bg-lavender')}>
        <MessageCircleHeart className={cn(s.icon, 'text-[oklch(0.25_0.08_295)]')} strokeWidth={2.25} />
      </div>
      {showText && (
        <span className={cn(
          'font-bold tracking-[-0.02em]',
          s.text,
          isDark ? 'text-white' : 'text-foreground',
        )}>
          Trustloop
        </span>
      )}
    </div>
  );
}
