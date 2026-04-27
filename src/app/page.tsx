"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Award, Clock, Car, Users, ChevronRight, Home as HomeIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceAreaMarquee } from "@/components/ServiceAreaMarquee";
import { GetInTouchSection } from "@/components/home/GetInTouchSection";
import { HeroCarousel } from "@/components/HeroCarousel";
import { AchievementsStats } from "@/components/home/AchievementsStats";
import { DrivingTestPackage } from "@/components/home/DrivingTestPackage";
import { DrivingLessonPricing } from "@/components/home/DrivingLessonPricing";
import { P1LicenceGuide } from "@/components/home/P1LicenceGuide";
import { TestimonialsMarquee } from "@/components/home/TestimonialsMarquee";

const ndisImage = "/slider-2.jpg";

const trustIndicators = [
  {
    icon: Shield,
    title: "NDIS Registered",
    description: "Fully registered and compliant NDIS provider"
  },
  {
    icon: Award,
    title: "Professional Team",
    description: "Highly experienced, compassionate and professionally trained staff"
  },
  {
    icon: Clock,
    title: "Reliable Service",
    description: "Safe, punctual and dependable support you can count on"
  }
];

const services = [
  {
    icon: Car,
    title: "Driving Lessons & Support",
    description: "Beginner automatic driving lessons at $65/hour with patient, supportive instructors.",
    link: "/automatic-lessons",
    color: "bg-[#1B7640]"
  },
  {
    icon: MapPin,
    title: "Transport Services",
    description: "Safe, reliable transport to appointments, therapies, work, education and community activities.",
    link: "/ndis-services",
    color: "bg-[#dc2626]"
  },
  {
    icon: HomeIcon,
    title: "Daily Living Support",
    description: "Assistance with personal activities, daily tasks and routine management to encourage independence.",
    link: "/ndis-services",
    color: "bg-[#d97706]"
  },
  {
    icon: Users,
    title: "Community Participation",
    description: "Support to engage in social, recreational and community activities, building confidence and skills.",
    link: "/ndis-services",
    color: "bg-[#1B7640]"
  }
];

const whyChooseUs = [
  "NDIS registered and compliant",
  "Professional, caring and experienced team",
  "Safe, reliable and high-quality service",
  "Tailored person-centred approach",
  "Respectful, inclusive and culturally diverse care",
  "Affordable and flexible support options"
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Service Area Marquee */}
      <ServiceAreaMarquee />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <HeroCarousel />

        <div className="container relative z-10 py-20 px-4 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl text-white"
          >
            <motion.span variants={staggerItem} className="inline-block px-4 py-2 bg-[#fbbf24] text-[#1B7640] rounded-full text-sm font-semibold mb-6">
              NDIS Registered Provider
            </motion.span>

            <motion.h1 variants={staggerItem} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Empowering Independence through{" "}
              <span className="text-[#fbbf24]">Safe & Supportive</span> Services
            </motion.h1>

            <motion.p variants={staggerItem} className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Marvel Driving and Transport Pty Ltd is an Australian owned NDIS registered provider
              supporting people of all abilities to travel safely, confidently and independently.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-14 px-8 text-lg rounded-lg shadow-lg hover:scale-105 transition-all" asChild>
                <Link href="/book">
                  Book a Service
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-2 border-white hover:bg-white/10 h-14 px-8 text-lg rounded-lg font-bold" asChild>
                <Link href="/ndis-services">Explore NDIS Services</Link>
              </Button>
            </motion.div>

            <motion.span variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mt-6 text-[#1B7640] bg-[#fbbf24] font-semibold">
              <MapPin className="h-4 w-4" />
              Serving Penshurst, Hurstville & Bexley
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustIndicators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100"
                style={{
                  animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`
                }}
              >
                <div className="p-3 bg-[#1B7640] rounded-lg shrink-0">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-[#0d4a28]">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0d4a28]">Our Services</h2>
            <p className="text-lg text-gray-500">
              Whether you're learning to drive, travelling to appointments, going to community activities,
              education, work or simply getting out to enjoy life — we are here to support you every step of the way.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={staggerItem}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Link href={service.link} className="block h-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
                  <div className={`inline-flex p-4 ${service.color} rounded-xl mb-4`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[#0d4a28] group-hover:text-[#1B7640] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                  <span className="inline-flex items-center text-[#1B7640] font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn More <ChevronRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-[#1B7640] text-white rounded-full text-sm font-semibold mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0d4a28]">Why Choose Marvel Driving and Transport?</h2>
              <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                Our dedicated team is highly experienced, compassionate and professionally trained
                to meet the diverse needs of participants, families and support networks. We take
                pride in delivering reliable, respectful and person-centred services that promote
                independence, confidence and dignity.
              </p>
              <ul className="space-y-3 mb-8">
                {whyChooseUs.map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="p-1 bg-[#1B7640] rounded-full shrink-0">
                      <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold h-12 px-8 rounded-lg" asChild>
                <Link href="/about">
                  Learn More About Us
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={ndisImage}
                alt="NDIS Transport Service"
                className="w-full rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#fbbf24] p-6 rounded-xl shadow-lg">
                <p className="font-bold text-2xl text-[#1B7640]">100%</p>
                <p className="text-sm text-[#1B7640]/80">Participant Focused</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Driving Lesson Pricing + P1 Licence Guide (side by side) */}
      <section className="py-16 md:py-20 bg-[#f8fafc]">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <DrivingLessonPricing compact />
            <P1LicenceGuide compact />
          </div>
        </div>
      </section>

      {/* Achievements Stats */}
      <AchievementsStats />

      {/* Driving Test Package */}
      <DrivingTestPackage />

      {/* Testimonials */}
      <TestimonialsMarquee />

      {/* Get In Touch Section */}
      <div id="contact">
        <GetInTouchSection />
      </div>
    </div>
  );
}
