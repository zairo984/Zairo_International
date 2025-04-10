"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"
import ceo from '@/images/meeting1.jpg'
import "animate.css"

export default function MessageSection() {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [])

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column with Image */}
        <div
          className="lg:col-span-5 box1 relative h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-lg"
          ref={imageRef}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>

          <Image
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
            src={ceo}
            alt="CEO Portrait"
            fill

          />

          <div className="absolute left-6 bottom-16 z-20 flex items-end gap-4">
            <div className="counter-box">
              <h2 className="text-white font-extrabold text-7xl md:text-8xl">8</h2>
            </div>
            <div className="text-box">
              <p className="text-white font-bold text-lg leading-tight">
                YEARS <br /> WORKING <br />
                EXPERIENCE
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 box2 flex flex-col justify-center">
          <div className="space-y-6">
            <span className="inline-block text-red-600 font-semibold text-lg tracking-wide">Message from the CEO</span>

            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-gray-900">
              Ideas are easy; <br className="hidden md:block" /> turning them into reality is the real challenge.
            </h2>

            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>
                Zairo International is one of the best growing companies for providing development and marketing
                services to our clients. With the help of our expert team and professionals, we want to convert business
                ideas of brilliant minds into money earning opportunities.
              </p>
              <p className="mt-4">
                We understand the importance of online world today, and that is why we aim to make the most use of this
                growing platform to help our clients. Reaching out to potential customers, increasing market scope,
                improving competitiveness, all goals are achieved at Zairo international.
              </p>
              <p className="mt-4">
                We are driven by the passion of our empowered team, and celebrate the professional and enthusiastic
                spirit which helps our clients in realizing their dreams. We feel fortunate to be able to help young and
                brilliant minds in achieving their life goals, and become a part of their legacy.
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                className="group flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 ease-in-out"
              >
                Discover More
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

