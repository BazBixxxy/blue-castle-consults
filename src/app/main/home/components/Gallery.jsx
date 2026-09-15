import {
  FadeIn,
  SectionLabel,
  SectionTitle,
  SectionSubtitle,
} from "@/components/common";

const GALLERY_IMAGES = [
  {
    title: "Community Outreach",
    description:
      "Supporting underserved communities through outreach and engagement initiatives.",
    image:
      "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&auto=format&fit=crop",
    aspect: "aspect-[3/4]",
  },
  {
    title: "Volunteer Activities",
    description:
      "Dedicated volunteers working together to create meaningful impact.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Youth Empowerment",
    description:
      "Empowering young people with opportunities, mentorship, and support.",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&auto=format&fit=crop",
    aspect: "aspect-square",
  },
  {
    title: "Education Support",
    description:
      "Helping children and communities access educational resources and opportunities.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
    aspect: "aspect-[2/3]",
  },
  {
    title: "Healthcare Initiative",
    description:
      "Promoting healthier communities through support and awareness programs.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Community Engagement",
    description:
      "Building stronger communities through collaboration and compassion.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop",
    aspect: "aspect-[3/4]",
  },
  {
    title: "Charity Drive",
    description:
      "Providing direct support and essentials to vulnerable individuals and families.",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Children Support Program",
    description:
      "Creating safe and supportive environments for children to thrive.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
    aspect: "aspect-square",
  },
];

export default function GallerySection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <SectionLabel>Gallery</SectionLabel>
          <SectionTitle className="mb-4">
            Moments of impact,
            <br />
            compassion, and community.
          </SectionTitle>
          <SectionSubtitle className="max-w-2xl mx-auto">
            A glimpse into the lives, outreach programs, volunteer activities,
            and communities that continue to shape the mission of Community
            Altruism Fraternity across Uganda.
          </SectionSubtitle>
        </FadeIn>

        {/* Masonry Grid */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
          style={{ columnGap: "1.25rem" }}
        >
          {GALLERY_IMAGES.map((item, index) => (
            <FadeIn
              key={index}
              delay={index * 80}
              className="mb-5 break-inside-avoid"
            >
              <div className="group relative overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">
                {/* Image */}
                <div
                  className={`relative w-full overflow-hidden ${item.aspect}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />

                  {/* Base gradient — always visible at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  {/* Hover overlay — deepens on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />

                  {/* Content — slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {/* Tag line */}
                    <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-white/60 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      CAF Initiative
                    </span>

                    {/* Title */}
                    <h3 className="text-white font-semibold text-[15px] leading-snug tracking-tight mb-0 group-hover:mb-2 transition-all duration-300">
                      {item.title}
                    </h3>

                    {/* Description — hidden, slides in */}
                    <p className="text-white/75 text-[13px] leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-out">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
