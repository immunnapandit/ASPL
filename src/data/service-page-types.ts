export type ServicePageCategory = 'solution' | 'service' | 'insight';

export interface ServicePageConfig {
  title: string;
  subtitle: string;
  category: ServicePageCategory;
  focus: string;
  summary: string;
  image: string;
  highlights: [string, string, string, string];
}
