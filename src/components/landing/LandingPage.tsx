import { useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Heart } from 'lucide-react';
import { UpvoteLogo } from '@/components/brand/UpvoteLogo';



function MockCard({ title, votes, status, category }: {
  title: string;
  votes: number;
  status: string;
  category: string;
}) {
  const statusColors: Record<string, string> = {
    'New': 'bg-muted text-muted-foreground',
    'Planned': 'bg-lavender/15 text-[oklch(0.45_0.12_290)]',
    'In progress': 'bg-lavender/15 text-[oklch(0.45_0.12_290)]',
    'Shipped': 'bg-status-shipped/10 text-status-shipped',
  };

  return (
    <div className="flex flex-col gap-2 rounded-[12px] border border-border/60 bg-white p-3">
      <p className="text-[13px] font-semibold text-foreground">{title}</p>
      <div className="flex flex-wrap items-center gap-1.5">
        <div className="flex items-center gap-1 rounded-[6px] bg-vote-up/10 px-2 py-0.5 text-[10px] font-semibold text-vote-up">
          <ThumbsUp className="h-2.5 w-2.5" />
          <span>{votes}</span>
        </div>
        <div className="flex items-center gap-1 rounded-[6px] bg-vote-down/10 px-2 py-0.5 text-[10px] font-semibold text-vote-down">
          <ThumbsDown className="h-2.5 w-2.5" />
          <span>0</span>
        </div>
        <div className="mx-0.5 h-3 w-px bg-border/60" />
        <span className={`inline-flex items-center rounded-[6px] px-1.5 py-0.5 text-[9px] font-medium ${statusColors[status] ?? 'bg-muted text-muted-foreground'}`}>
          {status}
        </span>
        <span className="inline-flex items-center rounded-[6px] bg-secondary px-1.5 py-0.5 text-[9px] font-medium text-secondary-foreground">
          {category}
        </span>
      </div>
    </div>
  );
}

function AppMockup() {
  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-[16px] border border-border/50 bg-background shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]">
        <div className="space-y-2 bg-background p-4">
          <div className="mb-2">
            <p className="text-[13px] font-semibold text-foreground">Feature ideas</p>
            <p className="text-[10px] text-muted-foreground">Upvote the ideas you support</p>
          </div>
          <MockCard title="Dark mode for the dashboard" votes={24} status="Planned" category="Design" />
          <MockCard title="API rate-limit monitoring" votes={18} status="In progress" category="Backend" />
          <MockCard title="Slack integration for notifications" votes={12} status="New" category="Integrations" />
          <MockCard title="CSV export for analytics data" votes={9} status="Shipped" category="Analytics" />
        </div>
      </div>
    </div>
  );
}


export function LandingPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://paperform.co/__embed.min.js';
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* Content */}
      <div className="relative">
        {/* Gradient mesh */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
          <div className="absolute -top-[200px] right-[10%] h-[600px] w-[600px] rounded-full bg-lavender/[0.12] blur-[100px]" />
          <div className="absolute -top-[100px] -left-[200px] h-[500px] w-[500px] rounded-full bg-[oklch(0.65_0.20_350)]/[0.08] blur-[80px]" />
          <div className="absolute top-[60%] left-[40%] h-[300px] w-[300px] rounded-full bg-lavender/[0.06] blur-[80px]" />
        </div>

        {/* Dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* ━━━ HERO ━━━ */}
        <section className="relative">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24 md:py-32">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
              {/* Left copy */}
              <div className="flex-1 max-w-xl">
                <div className="mb-8">
                  <UpvoteLogo size="lg" variant="light" />
                </div>

                <h1 className="text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl lg:text-[56px]">
                  Collect testimonials on WhatsApp, share proof, boost conversions
                </h1>

                <p className="mt-6 max-w-md text-base leading-[1.6] text-muted-foreground sm:mt-8 sm:text-lg">
                  Collect verified testimonials — text, voice, video — from your clients. Display them anywhere on your website, social media, or proposals to turn interest into sales.
                </p>

                <div className="mt-10">
                  <div data-paperform-id="nay1bcdq"></div>
                </div>
              </div>

              {/* Right mockup */}
              <div className="w-full max-w-md lg:max-w-lg flex-shrink-0">
                <div className="relative">
                  <div className="pointer-events-none absolute -top-6 -left-6 z-10 h-12 w-12 rounded-full bg-lavender shadow-lg shadow-lavender/20 animate-[float_6s_ease-in-out_infinite] flex items-center justify-center">
                    <ThumbsUp className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="pointer-events-none absolute -top-4 -right-4 z-10 h-10 w-10 rounded-full bg-[oklch(0.65_0.20_350)] shadow-lg shadow-[oklch(0.65_0.20_350)]/20 animate-[float_5s_ease-in-out_1s_infinite] flex items-center justify-center">
                    <Heart className="h-4 w-4 text-foreground" />
                  </div>
                  <div className="pointer-events-none absolute -bottom-5 -right-5 z-10 h-11 w-11 rounded-full bg-foreground shadow-lg shadow-foreground/20 animate-[float_7s_ease-in-out_2s_infinite] flex items-center justify-center">
                    <ThumbsUp className="h-4.5 w-4.5 text-background" />
                  </div>
                  <AppMockup />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-4 sm:px-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <UpvoteLogo size="sm" variant="light" />
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Trustloop. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
