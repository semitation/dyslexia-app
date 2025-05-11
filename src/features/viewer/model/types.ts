export interface Document {
  id: number
  title: string
  totalPages: number
  grade?: string
  subjectPath?: string
}

export type ProcessedContentBlock =
  | {
      id?: string
      type: 'heading'
      level?: 1 | 2 | 3
      text?: string
      content?: string
    }
  | {
      id?: string
      type: 'paragraph'
      text?: string
      content?: string
    }
  | {
      id?: string
      type: 'image'
      url?: string
      src?: string
      alt?: string
      caption?: string
    }
  | {
      id?: string
      type: 'list'
      ordered?: boolean
      items: string[]
    }
  | {
      id?: string
      type: 'table'
      headers?: string[]
      rows?: string[][]
    }
  | {
      id?: string
      type: string
      text?: string
      content?: string
    }

export interface PageContentResponse {
  id: number
  documentId: number
  pageNumber: number
  originalContent: string
  processedContent: { blocks: ProcessedContentBlock[] }
  processingStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  sectionTitle: string
  readingLevel: number
  wordCount: number
  complexityScore: number
  createdAt: string
  updatedAt: string
}

export interface PageTipResponse {
  id: number
  pageId: number
  term: string
  simplifiedExplanation: string
  termPosition: { start: number; end: number } | null
  termType: 'DIFFICULT_WORD' | 'COMPLEX_CONCEPT' | 'ABSTRACT_IDEA' | 'TECHNICAL_TERM'
  visualAidNeeded: boolean
  readAloudText: string
  createdAt: string
  updatedAt: string
}

export interface PageImageResponse {
  id: number
  pageId: number
  imageUrl: string
  imageType: 'CONCEPT_VISUALIZATION' | 'DIAGRAM' | 'COMPARISON_CHART' | 'EXAMPLE_ILLUSTRATION'
  conceptReference: string
  altText: string
  positionInPage: { x: number; y: number } | null
  createdAt: string
  updatedAt: string
} 