export interface VocabularyAnalysisSearchRequest {
  documentId: number;
  pageNumber?: number;
  blockId?: string;
}

export interface VocabularyAnalysis {
  id: number;
  documentId: number;
  pageNumber: number;
  blockId: string;
  word: string;
  startIndex: number;
  endIndex: number;
  definition: string;
  simplifiedDefinition: string;
  examples: string;
  difficultyLevel: string;
  reason: string;
  gradeLevel: number;
  phonemeAnalysisJson: string;
  createdAt: string;
}

export interface PhonemeComponent {
  consonant: string;
  pronunciation: string;
  sound: string;
  writingOrder: number;
  strokes: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SyllableComponents {
  initial: PhonemeComponent;
  medial: {
    vowel: string;
    pronunciation: string;
    sound: string;
    writingOrder: number;
    strokes: number;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  final?: PhonemeComponent;
}

export interface SyllableInfo {
  syllable: string;
  order: number;
  components: SyllableComponents;
  combinedSound: string;
  writingTips: string;
}

export interface WritingStep {
  step: number;
  phoneme: string;
  syllable: string;
}

export interface LearningTips {
  commonMistakes: string[];
  practiceWords: string[];
  rhymingWords: string[];
}

export interface PhonemeAnalysis {
  word: string;
  syllables: SyllableInfo[];
  totalPhonemes: {
    consonants: string[];
    vowels: string[];
    uniquePhonemes: string[];
  };
  difficultyLevel: string;
  writingOrder: WritingStep[];
  learningTips: LearningTips;
} 