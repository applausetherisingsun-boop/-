'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, RotateCcw, ShoppingBag, Star } from 'lucide-react';
import {
  QUESTIONS,
  AXES,
  calculateScores,
  getOverallScore,
  getScoreLabel,
  type AxisKey,
} from '@/lib/diagnosis';

type Phase = 'intro' | 'quiz' | 'results';

export default function DiagnosisTool() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [scores, setScores] = useState<Record<AxisKey, number> | null>(null);

  const totalQuestions = QUESTIONS.length;
  const progress = (currentQ / totalQuestions) * 100;

  function handleAnswer(score: number) {
    setSelectedOption(score);
  }

  function handleNext() {
    if (selectedOption === null) return;
    const question = QUESTIONS[currentQ];
    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQ + 1 >= totalQuestions) {
      const computed = calculateScores(newAnswers);
      setScores(computed);
      setPhase('results');
    } else {
      setCurrentQ(currentQ + 1);
    }
  }

  function handleBack() {
    if (currentQ === 0) {
      setPhase('intro');
    } else {
      setCurrentQ(currentQ - 1);
      const prevQuestion = QUESTIONS[currentQ - 1];
      setSelectedOption(answers[prevQuestion.id] ?? null);
    }
  }

  function handleReset() {
    setPhase('intro');
    setCurrentQ(0);
    setAnswers({});
    setSelectedOption(null);
    setScores(null);
  }

  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-[#fafaf8] pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#1a1a18]/5 border border-[#1a1a18]/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7a9e7e] animate-pulse"></span>
            <span className="text-xs font-sans text-[#1a1a18]/70 tracking-widest uppercase">Free Diagnosis · 5 min · No signup</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#1a1a18] mb-4">
            6-Axis Longevity<br />
            <span style={{
              background: 'linear-gradient(135deg, #c9a96e 0%, #7a9e7e 50%, #3d5a80 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>Diagnosis</span>
          </h1>
          <p className="text-[#9a9a8a] text-sm tracking-[0.4em] mb-6 font-sans">6軸老化診断</p>
          <p className="text-[#5a5a4a] text-lg font-sans leading-relaxed mb-12 max-w-2xl mx-auto">
            Answer 25 evidence-based questions across Japan&apos;s 6 longevity axes.
            Discover where you&apos;re aging fastest — and receive a personalized Japanese science protocol to address it.
          </p>

          {/* Axis Preview */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
            {AXES.map((axis) => (
              <div key={axis.key} className="p-4 rounded-xl text-left" style={{ backgroundColor: axis.bg, border: `1px solid ${axis.color}20` }}>
                <div className="text-2xl mb-2">{axis.icon}</div>
                <div className="text-[#1a1a18] font-semibold text-sm">{axis.label}</div>
                <div className="text-[#9a9a8a] text-xs font-sans">{axis.ja}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase('quiz')}
            className="inline-flex items-center gap-3 bg-[#1a1a18] text-[#fafaf8] px-10 py-4 rounded-full text-base font-sans font-semibold hover:bg-[#c9a96e] transition-all duration-300 shadow-lg"
          >
            Start Diagnosis
            <ArrowRight size={18} />
          </button>
          <p className="text-[#9a9a8a] text-xs font-sans mt-4">
            {totalQuestions} questions · Results in 5 minutes · 100% private
          </p>
        </div>
      </div>
    );
  }

  if (phase === 'quiz') {
    const question = QUESTIONS[currentQ];
    const axis = AXES.find((a) => a.key === question.axis)!;
    const axisIndex = AXES.findIndex((a) => a.key === question.axis);

    return (
      <div className="min-h-screen bg-[#fafaf8] pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">{axis.icon}</span>
                <div>
                  <div className="text-[#1a1a18] font-semibold text-sm font-sans">{axis.label}</div>
                  <div className="text-[#9a9a8a] text-xs font-sans">{axis.ja}</div>
                </div>
              </div>
              <span className="text-[#9a9a8a] text-sm font-sans">
                {currentQ + 1} / {totalQuestions}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#e8d5b7] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${axis.color}, ${axis.color}99)`,
                }}
              ></div>
            </div>
            {/* Axis dots */}
            <div className="flex gap-2 mt-3">
              {AXES.map((a, i) => (
                <div
                  key={a.key}
                  className="flex-1 h-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i <= axisIndex ? a.color : '#e8d5b7',
                    opacity: i < axisIndex ? 1 : i === axisIndex ? 0.8 : 0.3,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Question Card */}
          <div
            className="rounded-3xl p-8 mb-6 border"
            style={{ backgroundColor: axis.bg, borderColor: `${axis.color}20` }}
          >
            <p className="text-[#1a1a18] text-xl font-semibold leading-relaxed mb-8">
              {question.text}
            </p>

            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.score}
                  onClick={() => handleAnswer(option.score)}
                  className="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-sans"
                  style={{
                    borderColor: selectedOption === option.score ? axis.color : '#e8d5b7',
                    backgroundColor: selectedOption === option.score ? `${axis.color}15` : '#fafaf8',
                    color: selectedOption === option.score ? axis.color : '#1a1a18',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                      style={{
                        borderColor: selectedOption === option.score ? axis.color : '#c8c8b8',
                        backgroundColor: selectedOption === option.score ? axis.color : 'transparent',
                      }}
                    ></div>
                    <span className="text-sm">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#9a9a8a] hover:text-[#1a1a18] transition-colors font-sans text-sm"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-sans font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: selectedOption !== null ? '#1a1a18' : '#e8d5b7',
                color: selectedOption !== null ? '#fafaf8' : '#9a9a8a',
              }}
            >
              {currentQ + 1 >= totalQuestions ? 'See Results' : 'Next'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'results' && scores) {
    const overall = getOverallScore(scores);
    const overallLabel = getScoreLabel(overall);
    const sortedAxes = AXES.map((a) => ({ ...a, score: scores[a.key] })).sort((a, b) => a.score - b.score);
    const weakestAxis = sortedAxes[0];

    return (
      <div className="min-h-screen bg-[#fafaf8] pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Overall Score Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#1a1a18]/5 border border-[#1a1a18]/10 rounded-full px-4 py-1.5 mb-6">
              <Star size={12} className="text-[#c9a96e]" />
              <span className="text-xs font-sans text-[#1a1a18]/70 tracking-widest uppercase">Your Longevity Profile</span>
            </div>
            <div className="text-8xl font-bold text-[#1a1a18] mb-2">
              {overall}
              <span className="text-3xl text-[#c9a96e] ml-1">/100</span>
            </div>
            <div
              className="text-2xl font-bold mb-2"
              style={{ color: overallLabel.color }}
            >
              {overallLabel.label}
            </div>
            <p className="text-[#6a6a5a] font-sans">
              Biological aging score across all 6 axes
            </p>
          </div>

          {/* 6-Axis Score Bars */}
          <div className="bg-white rounded-3xl border border-[#e8d5b7]/50 p-8 mb-8 shadow-sm">
            <h2 className="text-[#1a1a18] font-bold text-lg mb-6">Your 6-Axis Profile</h2>
            <div className="space-y-5">
              {AXES.map((axis) => {
                const score = scores[axis.key];
                const label = getScoreLabel(score);
                return (
                  <div key={axis.key}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span>{axis.icon}</span>
                        <div>
                          <span className="text-[#1a1a18] font-semibold text-sm">{axis.label}</span>
                          <span className="text-[#9a9a8a] text-xs font-sans ml-2">{axis.ja}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-sans" style={{ color: label.color }}>{label.label}</span>
                        <span className="font-bold text-[#1a1a18] font-sans">{score}</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-[#f0ede6] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${score}%`, backgroundColor: axis.color }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Priority Axis - Personalized Protocol */}
          <div
            className="rounded-3xl p-8 mb-8 border"
            style={{ backgroundColor: weakestAxis.bg, borderColor: `${weakestAxis.color}30` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{weakestAxis.icon}</span>
              <div>
                <div className="text-xs font-sans font-bold tracking-widest uppercase mb-1" style={{ color: weakestAxis.color }}>
                  Priority Protocol
                </div>
                <h3 className="text-[#1a1a18] font-bold text-xl">{weakestAxis.label} — Score: {weakestAxis.score}</h3>
              </div>
            </div>
            <p className="text-[#5a5a4a] font-sans text-sm leading-relaxed mb-6">
              {weakestAxis.score < 60 ? weakestAxis.lowScoreInsight : weakestAxis.highScoreInsight}
            </p>
            <div>
              <p className="text-[#1a1a18] font-semibold text-sm mb-3">Japanese Science Protocol:</p>
              <ul className="space-y-2">
                {weakestAxis.japaneseProtocol.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#5a5a4a] text-sm font-sans">
                    <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: weakestAxis.color }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* All Axis Insights */}
          <div className="bg-white rounded-3xl border border-[#e8d5b7]/50 p-8 mb-8 shadow-sm">
            <h2 className="text-[#1a1a18] font-bold text-lg mb-6">All Axis Insights</h2>
            <div className="space-y-6">
              {sortedAxes.map((axis) => (
                <div key={axis.key} className="border-b border-[#f0ede6] pb-6 last:border-none last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span>{axis.icon}</span>
                    <span className="font-semibold text-[#1a1a18] text-sm">{axis.label}</span>
                    <span className="text-[#9a9a8a] text-xs font-sans">— {axis.score}/100</span>
                  </div>
                  <p className="text-[#6a6a5a] text-sm font-sans leading-relaxed">
                    {axis.score < 60 ? axis.lowScoreInsight : axis.highScoreInsight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link
              href="/marketplace"
              className="flex items-center justify-center gap-2 bg-[#1a1a18] text-[#fafaf8] py-4 rounded-full text-sm font-sans font-semibold hover:bg-[#c9a96e] transition-all"
            >
              <ShoppingBag size={16} />
              Shop Your Protocol
            </Link>
            <Link
              href="/core"
              className="flex items-center justify-center gap-2 border border-[#c9a96e] text-[#c9a96e] py-4 rounded-full text-sm font-sans font-semibold hover:bg-[#c9a96e] hover:text-[#1a1a18] transition-all"
            >
              Join CORE (¥1,980/mo)
            </Link>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 border border-[#1a1a18]/20 text-[#1a1a18]/60 py-4 rounded-full text-sm font-sans hover:border-[#1a1a18]/40 transition-all"
            >
              <RotateCcw size={16} />
              Retake Diagnosis
            </button>
          </div>

          <p className="text-center text-[#9a9a8a] text-xs font-sans">
            Join CORE membership for monthly research updates, unlimited re-diagnostics, and personalized protocol evolution.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
