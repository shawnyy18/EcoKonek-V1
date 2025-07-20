
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface LearningCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  image?: string;
  quiz?: {
    question: string;
    options: string[];
    correct: number;
  };
}

export default function Learn() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<'welcome' | 'facts' | 'tips' | 'impact' | 'complete'>('welcome');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [showPointAnimation, setShowPointAnimation] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const facts: LearningCard[] = [
    {
      id: 'fact1',
      title: 'Global E-Waste Crisis',
      description: '54 million tons of e-waste are generated globally every year. This equals the weight of 5,400 Eiffel Towers!',
      icon: 'ri-earth-line',
      color: 'from-blue-500 to-blue-600',
      quiz: {
        question: 'How much e-waste is generated globally each year?',
        options: ['10 million tons', '54 million tons', '100 million tons', '25 million tons'],
        correct: 1
      }
    },
    {
      id: 'fact2',
      title: 'Low Recovery Rate',
      description: 'Only 20% of global e-waste is properly recycled. The rest ends up in landfills or informal recycling.',
      icon: 'ri-recycle-line',
      color: 'from-blue-500 to-blue-600',
      quiz: {
        question: 'What percentage of e-waste is properly recycled worldwide?',
        options: ['50%', '35%', '20%', '60%'],
        correct: 2
      }
    },
    {
      id: 'fact3',
      title: 'Philippines Impact',
      description: 'The Philippines generates 3.2 million tons of e-waste annually, making proper disposal crucial for our environment.',
      icon: 'ri-flag-line',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'fact4',
      title: 'Toxic Materials',
      description: 'Electronics contain over 1,000 harmful substances including lead, mercury, and cadmium that can damage health.',
      icon: 'ri-skull-line',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const tips: LearningCard[] = [
    {
      id: 'tip1',
      title: 'Extend Device Life',
      description: 'Use protective cases, avoid extreme temperatures, and perform regular maintenance to make your devices last longer.',
      icon: 'ri-shield-check-line',
      color: 'from-green-500 to-green-600',
      image: 'https://readdy.ai/api/search-image?query=Person%20taking%20care%20of%20smartphone%20with%20protective%20case%2C%20clean%20modern%20home%20setting%2C%20natural%20lighting%2C%20lifestyle%20photography%2C%20professional%20quality%2C%20caring%20hands%20holding%20device&width=300&height=200&seq=tips1&orientation=landscape'
    },
    {
      id: 'tip2',
      title: 'Donate Old Devices',
      description: 'Giving away old but working gadgets helps reduce harmful waste and provides technology access to others.',
      icon: 'ri-gift-line',
      color: 'from-green-500 to-green-600',
      image: 'https://readdy.ai/api/search-image?query=Person%20donating%20old%20electronic%20devices%2C%20community%20center%20setting%2C%20helping%20others%2C%20social%20impact%20photography%2C%20warm%20lighting%2C%20charitable%20giving%20concept&width=300&height=200&seq=tips2&orientation=landscape',
      quiz: {
        question: 'True or False: Donating old devices helps reduce e-waste.',
        options: ['True', 'False'],
        correct: 0
      }
    },
    {
      id: 'tip3',
      title: 'Data Security First',
      description: 'Always wipe personal data completely before donating or recycling devices to protect your privacy.',
      icon: 'ri-lock-line',
      color: 'from-green-500 to-green-600',
      image: 'https://readdy.ai/api/search-image?query=Person%20securely%20deleting%20data%20from%20smartphone%2C%20close-up%20hands%20typing%2C%20modern%20device%20interface%2C%20security%20concept%2C%20professional%20photography&width=300&height=200&seq=tips3&orientation=landscape'
    },
    {
      id: 'tip4',
      title: 'Choose Certified Centers',
      description: 'Only use certified e-waste recycling facilities to ensure proper disposal and environmental protection.',
      icon: 'ri-award-line',
      color: 'from-green-500 to-green-600',
      image: 'https://readdy.ai/api/search-image?query=Certified%20e-waste%20recycling%20facility%2C%20modern%20clean%20environment%2C%20workers%20in%20safety%20gear%2C%20professional%20industrial%20setting%2C%20sustainability%20concept&width=300&height=200&seq=tips4&orientation=landscape'
    }
  ];

  const impact: LearningCard[] = [
    {
      id: 'impact1',
      title: 'Environmental Benefits',
      description: 'Proper e-waste management reduces landfill waste by 90% and prevents soil and water contamination.',
      icon: 'ri-leaf-line',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'impact2',
      title: 'Social Impact',
      description: 'E-waste recycling creates jobs, supports communities, and provides devices to students in need.',
      icon: 'ri-community-line',
      color: 'from-yellow-500 to-yellow-600',
      quiz: {
        question: 'How does e-waste recycling help communities?',
        options: ['Creates jobs only', 'Provides devices to students only', 'Both creates jobs and provides devices', 'Has no social impact'],
        correct: 2
      }
    },
    {
      id: 'impact3',
      title: 'Economic Value',
      description: 'Recycling recovers valuable materials worth billions, reduces mining costs, and creates a circular economy.',
      icon: 'ri-money-dollar-circle-line',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const getCurrentCards = () => {
    switch (currentSection) {
      case 'facts': return facts;
      case 'tips': return tips;
      case 'impact': return impact;
      default: return [];
    }
  };

  const getCurrentCard = () => {
    const cards = getCurrentCards();
    return cards[currentCardIndex] || null;
  };

  const getSectionTitle = () => {
    switch (currentSection) {
      case 'facts': return 'E-Waste Facts';
      case 'tips': return 'Best Practices';
      case 'impact': return 'Positive Impact';
      default: return '';
    }
  };

  const getSectionColor = () => {
    switch (currentSection) {
      case 'facts': return 'blue';
      case 'tips': return 'green';
      case 'impact': return 'yellow';
      default: return 'blue';
    }
  };

  const awardPoints = (amount: number) => {
    setPoints(prev => prev + amount);
    setEarnedPoints(amount);
    setShowPointAnimation(true);
    setTimeout(() => setShowPointAnimation(false), 2000);
  };

  const markCardCompleted = (cardId: string) => {
    if (!completedCards.has(cardId)) {
      setCompletedCards(prev => new Set([...prev, cardId]));
      awardPoints(1);
    }
  };

  const completeSection = (section: string) => {
    if (!completedSections.has(section)) {
      setCompletedSections(prev => new Set([...prev, section]));
      awardPoints(3);
    }
  };

  const handleNext = () => {
    const cards = getCurrentCards();
    const currentCard = getCurrentCard();

    if (currentCard && !completedCards.has(currentCard.id)) {
      markCardCompleted(currentCard.id);
    }

    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowQuiz(false);
      setQuizAnswered(false);
      setSelectedAnswer(null);
    } else {
      completeSection(currentSection);

      if (currentSection === 'facts') {
        setCurrentSection('tips');
      } else if (currentSection === 'tips') {
        setCurrentSection('impact');
      } else {
        setCurrentSection('complete');
      }
      setCurrentCardIndex(0);
      setShowQuiz(false);
      setQuizAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const handleBack = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowQuiz(false);
      setQuizAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setQuizAnswered(true);
    const currentCard = getCurrentCard();
    if (currentCard?.quiz && answerIndex === currentCard.quiz.correct) {
      awardPoints(1);
    }
  };

  const startSection = (section: 'facts' | 'tips' | 'impact') => {
    setCurrentSection(section);
    setCurrentCardIndex(0);
    setShowQuiz(false);
    setQuizAnswered(false);
    setSelectedAnswer(null);
  };

  if (currentSection === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-24">
        <Header title="Learn" />

        <main className="pt-20 px-4">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <i className="ri-graduation-cap-line text-white text-3xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Learn Mode</h1>
            <p className="text-gray-600 mb-2">
              Discover facts, helpful tips, and your environmental impact.
            </p>
            <p className="text-green-600 font-medium"> Earn points as you go!</p>
          </div>

          <div className="space-y-4 mb-8">
            <Card shadow="md" className="border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-bar-chart-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">E-Waste Facts</h3>
                    <p className="text-sm text-gray-600">4 cards • +7 points</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => startSection('facts')}>Start</Button>
              </div>
            </Card>

            <Card shadow="md" className="border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-lightbulb-line text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Best Practices</h3>
                    <p className="text-sm text-gray-600">4 cards • +8 points</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => startSection('tips')}>Start</Button>
              </div>
            </Card>

            <Card shadow="md" className="border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <i className="ri-heart-line text-yellow-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Positive Impact</h3>
                    <p className="text-sm text-gray-600">3 cards • +6 points</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => startSection('impact')}>Start</Button>
              </div>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Complete All Sections</h3>
              <p className="text-sm text-gray-600">Earn the EcoLearner badge and become an e-waste expert!</p>
            </div>
          </Card>
        </main>

        <Navigation />
      </div>
    );
  }

  if (currentSection === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-50 pb-24">
        <Header title="Congratulations!" />

        <main className="pt-20 px-4">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <i className="ri-trophy-line text-white text-4xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Learning Complete!</h1>
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-xl font-semibold text-purple-600 mb-2">EcoLearner Badge Earned ✅</h2>
            <p className="text-gray-600 mb-4">
              You've completed all learning modules and earned <span className="font-bold text-green-600">{points} points</span>!
            </p>
          </div>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-6">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Take Action?</h3>
              <p className="text-gray-700 mb-4">
                Now that you're an e-waste expert, help make a real difference!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button size="sm" onClick={() => router.push('/donate')}>
                  Donate Device
                </Button>
                <Button variant="outline" size="sm" onClick={() => router.push('/community')}>
                  Join Community
                </Button>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setCurrentSection('welcome');
                setCurrentCardIndex(0);
                setCompletedCards(new Set());
                setCompletedSections(new Set());
                setPoints(0);
              }}
            >
              <i className="ri-refresh-line mr-2"></i>
              Restart Learning
            </Button>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setCurrentSection('welcome')}
            >
              Back to Menu
            </Button>
          </div>
        </main>

        <Navigation />
      </div>
    );
  }

  const cards = getCurrentCards();
  const currentCard = getCurrentCard();
  const progress = ((currentCardIndex + 1) / cards.length) * 100;
  const color = getSectionColor();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${color}-50 to-white pb-24 relative`}>
      <Header title={getSectionTitle()} />

      {/* Point Animation */}
      {showPointAnimation && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className={`bg-${color}-500 text-white px-4 py-2 rounded-full shadow-lg font-bold`}>
            +{earnedPoints} Point{earnedPoints > 1 ? 's' : ''}! ⭐
          </div>
        </div>
      )}

      <main className="pt-20 px-4">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-600">
              {currentCardIndex + 1} of {cards.length}
            </div>
            <div className="text-sm font-bold text-green-600">
              Points: {points}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Learning Card */}
        {currentCard && (
          <Card shadow="lg" className="mb-6">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${currentCard.color} flex items-center justify-center text-white shadow-md`}>
              <i className={`${currentCard.icon} text-2xl`}></i>
            </div>

            {currentCard.image && (
              <div className="mb-4 rounded-2xl overflow-hidden">
                <img
                  src={currentCard.image}
                  alt={currentCard.title}
                  className="w-full h-40 object-cover object-top"
                />
              </div>
            )}

            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{currentCard.title}</h2>
              <p className="text-gray-700 leading-relaxed">{currentCard.description}</p>
            </div>

            {/* Quiz Section */}
            {currentCard.quiz && !showQuiz && (
              <div className="mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setShowQuiz(true)}
                >
                  <i className="ri-question-line mr-2"></i>
                  Take Quick Quiz (+1 point)
                </Button>
              </div>
            )}

            {currentCard.quiz && showQuiz && (
              <div className="mt-6 pt-4 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">{currentCard.quiz.question}</h3>
                <div className="space-y-2">
                  {currentCard.quiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={quizAnswered}
                      className={`w-full p-3 text-left rounded-xl border transition-all ${
                        quizAnswered
                          ? index === currentCard.quiz!.correct
                            ? 'bg-green-100 border-green-500 text-green-800'
                            : selectedAnswer === index
                            ? 'bg-red-100 border-red-500 text-red-800'
                            : 'bg-gray-50 border-gray-200 text-gray-600'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {quizAnswered && (
                  <div className="mt-3 text-center">
                    <p className={`font-medium ${
                      selectedAnswer === currentCard.quiz.correct
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {selectedAnswer === currentCard.quiz.correct ? 'Correct! +1 Point ⭐' : 'Try again next time!'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            disabled={currentCardIndex === 0}
            className="flex-1 mr-2"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back
          </Button>

          <Button
            size="sm"
            onClick={handleNext}
            className="flex-1 ml-2 !rounded-button"
          >
            {currentCardIndex === cards.length - 1 ? (
              currentSection === 'impact' ? 'Complete' : 'Next Section'
            ) : 'Next'}
            <i className="ri-arrow-right-line ml-2"></i>
          </Button>
        </div>

        {/* Section Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Section: {getSectionTitle()} • {cards.length} cards
          </p>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
