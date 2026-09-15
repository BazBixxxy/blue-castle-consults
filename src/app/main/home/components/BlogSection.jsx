
import Link from "react-router-dom";
import {
  FadeIn,
  SectionLabel,
  SectionTitle,
  SectionSubtitle,
} from "@/components/common";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";

const ARTICLES = [
  {
    slug: "with-actions-and-in-truth",
    title: "With Actions and in Truth: How Our Motto Shapes Everything We Do",
    category: "Our Story",
    publishedAt: "2025-04-20",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&auto=format&fit=crop",
    description:
      "Inspired by 1 John 3:18, our motto is more than words — it is the living standard by which every volunteer, program, and act of service is measured.",
    featured: true,
  },
  {
    slug: "volunteers-heart-of-caf",
    title: "Volunteers: The Living Heart of Community Altruism Fraternity",
    category: "Volunteers",
    publishedAt: "2025-04-12",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop",
    description:
      "From direct service to advocacy, our volunteers don't just give time — they build a culture of collective responsibility that drives lasting change.",
  },
  {
    slug: "bridging-the-gap-uganda",
    title: "Bridging the Gap: A Year of Outreach Across Uganda",
    category: "Impact",
    publishedAt: "2025-04-04",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
    description:
      "Hundreds of lives touched, communities strengthened, and futures reimagined — a look back at twelve months of purposeful action.",
  },
  {
    slug: "literacy-alleviation-programs",
    title: "Reading as Liberation: Inside Our Literacy Alleviation Programs",
    category: "Education",
    publishedAt: "2025-03-25",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
    description:
      "Illiteracy is not just an educational gap — it is a barrier to dignity, opportunity, and self-determination. Here is how CAF is dismantling it.",
  },
  {
    slug: "orphanages-vulnerable-children",
    title: "Safe Spaces and Second Chances: Supporting Orphanages in Uganda",
    category: "Programs",
    publishedAt: "2025-03-14",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&auto=format&fit=crop",
    description:
      "Every child deserves safety, love, and a future. Our work with orphanages and vulnerable children is rooted in compassion and long-term commitment.",
  },
  {
    slug: "mutual-benefit-philosophy",
    title: "Why Charity Must Be a Two-Way Street: The Case for Mutual Benefit",
    category: "Perspective",
    publishedAt: "2025-03-03",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=800&auto=format&fit=crop",
    description:
      "True change is never transactional. CAF's vision of mutual benefit asks privileged communities to show up not as donors, but as partners.",
  },
];

const CATEGORY_STYLES = {
  "Our Story": { bg: "#eeedfe", color: "#26215c", border: "#afa9ec" },
  Volunteers: { bg: "#e1f5ee", color: "#04342c", border: "#5dcaa5" },
  Impact: { bg: "#faeeda", color: "#412402", border: "#fac775" },
  Education: { bg: "#e6f1fb", color: "#042c53", border: "#85b7eb" },
  Programs: { bg: "#eaf3de", color: "#173404", border: "#97c459" },
  Perspective: { bg: "#faece7", color: "#4a1b0c", border: "#f0997b" },
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function CategoryPill({ category }) {
  const s = CATEGORY_STYLES[category] ?? {
    bg: "#f1efe8",
    color: "#2c2c2a",
    border: "#b4b2a9",
  };
  return (
    <span
      style={{ background: s.bg, color: s.color, borderColor: s.border }}
      className="inline-block text-[10.5px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border leading-none"
    >
      {category}
    </span>
  );
}

function MetaRow({ date, readTime, light = false }) {
  return (
    <div
      className={`flex items-center gap-4 text-[12px] ${
        light ? "/55" : "text-muted-foreground"
      }`}
    >
      <span className="flex items-center gap-1.5">
        <CalendarDays size={12} />
        {formatDate(date)}
      </span>
      <span className="flex items-center gap-1.5">
        <Clock size={12} />
        {readTime}
      </span>
    </div>
  );
}

function FeaturedCard({ article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <div className="relative h-full min-h-[480px] rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-shadow duration-300">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-7">
          <CategoryPill category={article.category} />
          <h2 className="mt-3 text-[1.45rem] font-bold leading-snug tracking-tight  max-w-xl">
            {article.title}
          </h2>
          <p className="mt-2.5 text-[13.5px] /65 leading-relaxed line-clamp-2 max-w-lg">
            {article.description}
          </p>
          <div className="mt-5 flex items-center justify-between">
            <MetaRow
              date={article.publishedAt}
              readTime={article.readTime}
              light
            />
            <span className="flex items-center gap-1.5 text-[13px] font-semibold  group-hover:gap-3 transition-all duration-300">
              Read article <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SideCard({ article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <div className="flex gap-4 p-4 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-colors duration-200">
        <div className="relative w-[88px] h-[88px] shrink-0 rounded-xl overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col justify-between py-0.5 min-w-0">
          <div>
            <CategoryPill category={article.category} />
            <h3 className="mt-2 text-[13px] font-semibold leading-snug tracking-tight line-clamp-2 text-foreground">
              {article.title}
            </h3>
          </div>
          <MetaRow date={article.publishedAt} readTime={article.readTime} />
        </div>
      </div>
    </Link>
  );
}

function GridCard({ article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:shadow-md transition-all duration-300">
        <div className="relative h-48 shrink-0 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        </div>
        <div className="flex flex-col flex-1 p-5">
          <CategoryPill category={article.category} />
          <h3 className="mt-3 text-[14.5px] font-semibold leading-snug tracking-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {article.description}
          </p>
          <div className="mt-4 pt-4 border-t border-border">
            <MetaRow date={article.publishedAt} readTime={article.readTime} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BlogSection() {
  const [featured, ...rest] = ARTICLES;
  const sideCards = rest.slice(0, 2);
  const gridCards = rest.slice(2);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel>Blog &amp; Articles</SectionLabel>
            <SectionTitle className="mb-3">
              Stories from the field,
              <br />
              straight from the heart.
            </SectionTitle>
            <SectionSubtitle className="max-w-lg">
              Reflections, impact stories, volunteer spotlights, and program
              updates — a window into the work and mission of Community Altruism
              Fraternity across Uganda.
            </SectionSubtitle>
          </div>
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-2 text-[13px] font-medium border border-border rounded-full px-5 py-2.5 hover:bg-muted transition-colors whitespace-nowrap"
          >
            View all articles <ArrowRight size={13} />
          </Link>
        </FadeIn>

        {/* Featured + side stack */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 mb-5">
            <FeaturedCard article={featured} />
            <div className="flex flex-col gap-4">
              {sideCards.map((a) => (
                <SideCard key={a.slug} article={a} />
              ))}
              {/* Motto pull-quote */}
              <div className="flex-1 flex items-center rounded-2xl border border-border bg-muted/40 px-6 py-5">
                <blockquote>
                  <p className="text-[13.5px] leading-relaxed text-muted-foreground italic">
                    "Dear children, let us not love with words or speech but
                    with actions and in truth."
                  </p>
                  <cite className="mt-3 flex items-center gap-2 not-italic">
                    <span className="block w-6 h-px bg-border" />
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                      1 John 3:18 · CAF Motto
                    </span>
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 3-col grid */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridCards.map((a) => (
              <GridCard key={a.slug} article={a} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
