export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  metric?: string;
}

export interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ComparisonTier {
  name: string;
  description: string;
  features: string[];
}
