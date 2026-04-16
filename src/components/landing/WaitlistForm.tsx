import { useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const emailSchema = z.string().trim().email({ message: 'Please enter a valid email' }).max(255);

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    const { error } = await supabase
      .from('waitlist_signups')
      .insert({ email: parsed.data, source: 'landing' });

    setIsLoading(false);

    if (error) {
      if (error.code === '23505') {
        toast.success("You're already on the list!");
        setSubmitted(true);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
      return;
    }

    toast.success("You're on the list! We'll be in touch soon.");
    setSubmitted(true);
    setEmail('');
  };

  if (submitted) {
    return (
      <div className="rounded-[16px] border border-border bg-card/50 p-5 text-center sm:text-left">
        <p className="text-sm font-semibold text-foreground">Thanks for joining the waitlist 🎉</p>
        <p className="mt-1 text-sm text-muted-foreground">We'll reach out as soon as we're ready.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
        className="h-12 flex-1 rounded-[8px] text-base"
        aria-label="Email address"
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 rounded-[8px] bg-foreground px-6 font-semibold text-background hover:opacity-90"
      >
        {isLoading ? 'Joining...' : 'Join waitlist'}
      </Button>
    </form>
  );
}
