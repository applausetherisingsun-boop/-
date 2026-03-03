import type { Metadata } from 'next';
import DiagnosisTool from './DiagnosisTool';

export const metadata: Metadata = {
  title: '6-Axis Longevity Diagnosis | SHIROKUMA',
  description:
    'Free 25-question diagnosis across 6 longevity axes. Discover where you\'re aging fastest and receive a personalized Japanese science protocol.',
};

export default function DiagnosisPage() {
  return <DiagnosisTool />;
}
