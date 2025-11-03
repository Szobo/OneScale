import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  UserPlus, 
  Link as LinkIcon, 
  Database, 
  Brain, 
  BarChart3, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function UserJourney() {
  const [currentStep, setCurrentStep] = useState(1);
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Always start at the top and Step 1 when this page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setCurrentStep(1);
  }, []);

  const steps = [
    {
      number: 1,
      title: "Sign Up & Onboarding",
      description: "Users create an account, set up their organization profile, and define key goals — from unifying scattered data to generating AI insights.",
      icon: UserPlus,
      color: "from-purple-500/20 to-purple-600/10"
    },
    {
      number: 2,
      title: "Connect Data Sources",
      description: "Users link data sources such as files, Google Sheets, APIs, or voice data. OneScale automatically ingests and standardizes the data for analysis.",
      icon: LinkIcon,
      color: "from-blue-500/20 to-blue-600/10"
    },
    {
      number: 3,
      title: "Unified Data View",
      description: "Once connected, OneScale creates a centralized data warehouse that consolidates all inputs into a single, accessible view — the foundation for analytics and ML.",
      icon: Database,
      color: "from-green-500/20 to-green-600/10"
    },
    {
      number: 4,
      title: "Build or Deploy ML Models",
      description: "Users can either train custom machine learning models tailored to their unique datasets or deploy pre-trained models directly on the platform. OneScale handles model hosting, execution, and results integration automatically.",
      icon: Brain,
      color: "from-pink-500/20 to-pink-600/10"
    },
    {
      number: 5,
      title: "Insight Dashboard",
      description: "Processed data and model outputs appear on the dashboard, showing visual insights, trends, and AI-generated summaries — empowering fast, data-driven decisions.",
      icon: BarChart3,
      color: "from-orange-500/20 to-orange-600/10"
    },
    {
      number: 6,
      title: "Automated Actions & Reports",
      description: "OneScale automatically generates reports, alerts, and recommendations based on insights — closing the loop between data analysis and real-world action.",
      icon: Zap,
      color: "from-yellow-500/20 to-yellow-600/10"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-step]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          setCurrentStep(index + 1);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
          style={{ width: progress }}
        />
      </div>

      {/* Progress Indicator - Step Counter */}
      <div className="fixed bottom-8 right-8 z-40 bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-400">Step</span>
          <span className="text-2xl font-bold text-purple-400">{currentStep}</span>
          <span className="text-sm text-zinc-400">of 6</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            Your Journey with <span className="text-[#6133e6]">OneScale</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto"
          >
            From sign-up to AI insights — a seamless path to intelligent data
          </motion.p>
        </div>
      </section>

      {/* Steps Section */}
      <div className="relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isEven = index % 2 === 0;

          return (
            <motion.section
              key={step.number}
              data-step={step.number}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative py-24 px-4 md:px-8 ${
                isEven ? 'bg-zinc-950' : 'bg-black'
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-50`} />

              <div className="relative max-w-6xl mx-auto">
                <div className={`flex flex-col md:flex-row items-center gap-12 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-bold">
                        {step.number}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white">
                        {step.title}
                      </h2>
                    </div>
                    <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Visual Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex-1 w-full max-w-md"
                  >
                    <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                      <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6`}>
                        <Icon className="w-10 h-10 text-purple-400" />
                      </div>
                      
                      {step.number === 2 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                            <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                              📄
                            </div>
                            <span className="text-sm text-zinc-300">Files</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                            <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
                              📊
                            </div>
                            <span className="text-sm text-zinc-300">Google Sheets</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                            <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                              🔗
                            </div>
                            <span className="text-sm text-zinc-300">APIs</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                            <div className="w-8 h-8 bg-yellow-500/20 rounded flex items-center justify-center">
                              🎤
                            </div>
                            <span className="text-sm text-zinc-300">Voice Data</span>
                          </div>
                        </div>
                      )}

                      {step.number === 4 && (
                        <div className="space-y-4">
                          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                            <Brain className="w-5 h-5" />
                            Deploy Model
                          </button>
                          <div className="text-sm text-zinc-400 text-center">
                            Train custom models or use pre-trained ones
                          </div>
                        </div>
                      )}

                      {step.number === 5 && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-zinc-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-purple-400 mb-2">1.2M</div>
                            <div className="text-xs text-zinc-400">Data Points</div>
                          </div>
                          <div className="bg-zinc-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-400 mb-2">98%</div>
                            <div className="text-xs text-zinc-400">Accuracy</div>
                          </div>
                          <div className="bg-zinc-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-400 mb-2">24/7</div>
                            <div className="text-xs text-zinc-400">Monitoring</div>
                          </div>
                          <div className="bg-zinc-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-orange-400 mb-2">150+</div>
                            <div className="text-xs text-zinc-400">Insights</div>
                          </div>
                        </div>
                      )}

                      {![2, 4, 5].includes(step.number) && (
                        <div className="h-32 flex items-center justify-center">
                          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center">
                            <Icon className="w-16 h-16 text-zinc-600" />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* CTA Section */}
      <section className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Join OneScale today and transform your data into actionable intelligence.
            </p>
            <Link
              to="/waitlist"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default UserJourney;

