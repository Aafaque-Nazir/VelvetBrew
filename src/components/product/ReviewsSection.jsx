"use client";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

const reviews = [
  {
    id: 1,
    user: "Sarah M.",
    rating: 5,
    date: "2 months ago",
    title: "Perfect extraction every time",
    content:
      "I've used many machines in this price range, but the thermal stability of the Obsidian Project is unmatched. It heats up incredibly fast and the steam power is commercial grade.",
    helpful: 12,
  },
  {
    id: 2,
    user: "David Chen",
    rating: 5,
    date: "1 month ago",
    title: "A work of art",
    content:
      "Not only does it make the best espresso I've ever had at home, but it looks stunning on my counter. The matte black finish is gorgeous.",
    helpful: 8,
  },
  {
    id: 3,
    user: "Elena R.",
    rating: 4,
    date: "3 weeks ago",
    title: "Great machine, learning curve",
    content:
      "The build quality is fantastic. It took me a few days to dial in my shots perfectly, but once I did, the results were cafe quality. Highly recommend getting a good grinder with it.",
    helpful: 5,
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-24 border-t border-white/5 bg-[#0f0e0e]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Summary */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-3xl font-bold text-white">Reviews</h3>

            <div className="flex items-center gap-4">
              <span className="text-6xl font-bold text-white">4.9</span>
              <div className="space-y-1">
                <div className="flex text-bronze-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-white/60">Based on 128 reviews</p>
              </div>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-3 text-sm">
                  <span className="text-white w-3">{stars}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-bronze-500"
                      style={{
                        width: stars === 5 ? "85%" : stars === 4 ? "10%" : "2%",
                      }}
                    />
                  </div>
                  <span className="text-white/40 w-8 text-right">
                    {stars === 5 ? "85%" : stars === 4 ? "10%" : "2%"}
                  </span>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              Write a Review
            </Button>
          </div>

          {/* List */}
          <div className="lg:col-span-8 space-y-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-white/5 pb-8 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <div className="flex text-bronze-500 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.rating ? "currentColor" : "none"}
                          className={i >= review.rating ? "text-white/20" : ""}
                        />
                      ))}
                    </div>
                    <h4 className="font-bold text-white">{review.title}</h4>
                  </div>
                  <span className="text-sm text-white/40">{review.date}</span>
                </div>

                <p className="text-white/70 leading-relaxed mb-6">
                  {review.content}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50">
                    {review.user} - Verified Buyer
                  </span>
                  <button className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors">
                    <ThumbsUp size={14} /> Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
