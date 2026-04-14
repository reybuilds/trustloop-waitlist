import { cn } from '@/lib/utils';
import logoImage from '@/assets/trustloop-logo.png';

interface UpvoteLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showText?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { box: 'h-6 w-6', text: 'text-sm' },
  md: { box: 'h-7 w-7', text: 'text-base' },
  lg: { box: 'h-10 w-10', text: 'text-xl' },
};

export function UpvoteLogo({ size = 'md', variant = 'dark', showText = true, className }: UpvoteLogoProps) {
  const s = sizeMap[size];
  const isDark = variant === 'dark';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <img 
        src={logoImage} 
        alt="Trustloop" 
        className={cn(s.box, 'object-contain')}
      />
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
