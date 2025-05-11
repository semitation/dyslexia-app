import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { axiosClient } from "@/shared/api/axios"
import { Typography, Button, Select, Card, CardContent } from "@/shared/ui"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Volume2, Loader2, Info } from "lucide-react"

export const Route = createFileRoute('/teacher/viewer/$documentId')({
  component: DocumentViewerPage,
})

// API 응답 인터페이스
interface PageContentResponse {
  id: number
  documentId: number
  pageNumber: number
  originalContent: string
  processedContent: any // JSON 형태의 콘텐츠
  processingStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  sectionTitle: string
  readingLevel: number
  wordCount: number
  complexityScore: number
  createdAt: string
  updatedAt: string
}

interface PageTipResponse {
  id: number
  pageId: number
  term: string
  simplifiedExplanation: string
  termPosition: any
  termType: 'DIFFICULT_WORD' | 'COMPLEX_CONCEPT' | 'ABSTRACT_IDEA' | 'TECHNICAL_TERM'
  visualAidNeeded: boolean
  readAloudText: string
  createdAt: string
  updatedAt: string
}

interface PageImageResponse {
  id: number
  pageId: number
  imageUrl: string
  imageType: 'CONCEPT_VISUALIZATION' | 'DIAGRAM' | 'COMPARISON_CHART' | 'EXAMPLE_ILLUSTRATION'
  conceptReference: string
  altText: string
  positionInPage: any
  createdAt: string
  updatedAt: string
}

// 문서 인터페이스
interface Document {
  id: number
  title: string
  totalPages: number
  grade?: string
  subjectPath?: string
}

// API 호출 함수
const viewerApi = {
  getDocument: async (documentId: number): Promise<Document> => {
    return await axiosClient.get(`/documents/${documentId}`);
  },
  getPageContent: async (documentId: number, pageNumber?: number): Promise<PageContentResponse[]> => {
    const params = pageNumber ? { documentId, page: pageNumber } : { documentId }
    return await axiosClient.get('/document-contents/pages', { params })
  },
  
  getPageTips: async (pageId: number): Promise<PageTipResponse[]> => {
    return await axiosClient.get(`/document-contents/pages/${pageId}/tips`)
  },
  
  getPageImages: async (pageId: number): Promise<PageImageResponse[]> => {
    return await axiosClient.get(`/document-contents/pages/${pageId}/images`)
  }
}

// 텍스트 음성 변환 서비스
const textToSpeech = {
  speak: (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      window.speechSynthesis.speak(utterance)
    }
  },
  
  stop: () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }
}

function DocumentViewerPage() {
  const { documentId } = Route.useParams()
  const docId = Number.parseInt(documentId)
  
  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1)
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState("Noto Sans KR")
  const [lineSpacing, setLineSpacing] = useState(1.5)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showTips, setShowTips] = useState(true)
  
  // 문서 정보 가져오기
  const { data: document, isLoading: isLoadingDocument } = useQuery({
    queryKey: ["document", docId],
    queryFn: () => viewerApi.getDocument(docId),
    enabled: !!docId
  })
  
  // 현재 페이지 콘텐츠 가져오기
  const { data: pageContents = [], isLoading: isLoadingPageContent } = useQuery({
    queryKey: ["document", docId, "page-content", currentPage],
    queryFn: () => viewerApi.getPageContent(docId, currentPage),
    enabled: !!docId
  })
  
  // 현재 페이지 정보
  const currentPageContent = pageContents.length > 0 ? pageContents[0] : null
  
  // 현재 페이지의 팁 가져오기
  const { data: pageTips = [], isLoading: isLoadingTips } = useQuery({
    queryKey: ["page", currentPageContent?.id, "tips"],
    queryFn: () => viewerApi.getPageTips(currentPageContent?.id as number),
    enabled: !!currentPageContent?.id && showTips
  })
  
  // 현재 페이지의 이미지 가져오기
  const { data: pageImages = [], isLoading: isLoadingImages } = useQuery({
    queryKey: ["page", currentPageContent?.id, "images"],
    queryFn: () => viewerApi.getPageImages(currentPageContent?.id as number),
    enabled: !!currentPageContent?.id
  })
  
  // 전체 화면 전환
  const toggleFullscreen = () => {
    if (!window.document.fullscreenElement) {
      window.document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch((error: Error) => {
        console.error(`전체 화면 오류: ${error.message}`)
      })
    } else {
      window.document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      }).catch((error: Error) => {
        console.error(`전체 화면 종료 오류: ${error.message}`)
      })
    }
  }
  
  // 페이지 이동 핸들러
  const handlePageChange = (newPage: number) => {
    if (document && newPage >= 1 && newPage <= document.totalPages) {
      setCurrentPage(newPage)
    }
  }
  
  // 텍스트 음성 변환 핸들러
  const handleSpeak = (text: string) => {
    textToSpeech.speak(text)
  }
  
  // 폰트 사이즈 변경 핸들러
  const handleFontSizeChange = (increment: boolean) => {
    setFontSize(prev => {
      const newSize = increment ? prev + 1 : prev - 1
      return Math.min(Math.max(newSize, 12), 24) // 12-24px 사이로 제한
    })
  }
  
  // 블록 렌더링 함수
  const renderProcessedContent = (content: any) => {
    if (!content) return null
    
    // 이 부분은 실제 API에서 반환하는 processedContent의 구조에 따라 조정해야 합니다
    // 현재는 예시 구현입니다
    try {
      const blocks = Array.isArray(content) ? content : (typeof content === 'object' ? content.blocks || [] : [])
      
      return blocks.map((block: any, index: number) => {
        const key = block.id || `block-${index}`
        
        switch (block.type) {
          case 'heading':
            return (
              <div key={key} className="mb-4 group relative">
                <Typography
                  variant={block.level === 1 ? "h3" : block.level === 2 ? "h4" : "h4"}
                  className="font-bold"
                  style={{
                    fontFamily,
                    fontSize: `${fontSize + (4 - (block.level || 3)) * 2}px`,
                    lineHeight: `${lineSpacing}`
                  }}
                >
                  {block.text || block.content}
                </Typography>
                <button
                  onClick={() => handleSpeak(block.text || block.content)}
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )
            
          case 'paragraph':
            return (
              <div key={key} className="mb-4 group relative">
                <Typography
                  variant="p"
                  className="text-justify"
                  style={{
                    fontFamily,
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineSpacing}`
                  }}
                >
                  {block.text || block.content}
                </Typography>
                <button
                  onClick={() => handleSpeak(block.text || block.content)}
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )
            
          case 'image':
            const imageUrl = block.url || block.src || ""
            return (
              <figure key={key} className="mb-4">
                <img
                  src={imageUrl}
                  alt={block.alt || '이미지'}
                  className="rounded-md max-w-full h-auto"
                />
                {block.caption && (
                  <figcaption className="text-center text-sm mt-2 text-gray-600" style={{ fontFamily }}>
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )
            
          case 'list':
            return (
              <div key={key} className="mb-4">
                {block.ordered ? (
                  <ol className="list-decimal pl-8" style={{ fontFamily, fontSize: `${fontSize}px`, lineHeight: `${lineSpacing}` }}>
                    {(block.items || []).map((item: string, itemIndex: number) => (
                      <li key={itemIndex} className="mb-1 group relative">
                        {item}
                        <button
                          onClick={() => handleSpeak(item)}
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul className="list-disc pl-8" style={{ fontFamily, fontSize: `${fontSize}px`, lineHeight: `${lineSpacing}` }}>
                    {(block.items || []).map((item: string, itemIndex: number) => (
                      <li key={itemIndex} className="mb-1 group relative">
                        {item}
                        <button
                          onClick={() => handleSpeak(item)}
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
            
          case 'table':
            return (
              <div key={key} className="mb-4 overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 rounded" style={{ fontFamily, fontSize: `${fontSize}px` }}>
                  {block.headers && (
                    <thead>
                      <tr>
                        {block.headers.map((header: string, headerIndex: number) => (
                          <th key={headerIndex} className="border border-gray-300 px-4 py-2 bg-gray-100">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {(block.rows || []).map((row: string[], rowIndex: number) => (
                      <tr key={rowIndex}>
                        {row.map((cell: string, cellIndex: number) => (
                          <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
            
          default:
            if (block.text || block.content) {
              return (
                <div key={key} className="mb-4">
                  <Typography
                    variant="p"
                    style={{
                      fontFamily,
                      fontSize: `${fontSize}px`,
                      lineHeight: `${lineSpacing}`
                    }}
                  >
                    {block.text || block.content}
                  </Typography>
                </div>
              )
            }
            return null
        }
      })
    } catch (error) {
      console.error("콘텐츠 렌더링 오류:", error)
      return (
        <div className="text-red-500 p-4 border border-red-300 rounded bg-red-50">
          <Typography variant="p">콘텐츠를 렌더링할 수 없습니다.</Typography>
        </div>
      )
    }
  }
  
  // 페이지 팁 렌더링 함수
  const renderPageTips = () => {
    if (!pageTips || pageTips.length === 0) return null
    
    return (
      <div className="mt-6 bg-blue-50 p-4 rounded-md">
        <div className="flex items-center mb-2">
          <Info className="w-5 h-5 text-blue-500 mr-2" />
          <Typography variant="h4" className="text-blue-700">학습 팁</Typography>
        </div>
        
        <div className="space-y-3">
          {pageTips.map(tip => (
            <div key={tip.id} className="bg-white p-3 rounded shadow-sm">
              <div className="flex justify-between">
                <Typography variant="p" className="font-bold text-blue-800">
                  {tip.term}
                </Typography>
                <button
                  onClick={() => handleSpeak(tip.readAloudText || tip.simplifiedExplanation)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <Typography variant="p" className="text-gray-700 mt-1" style={{ fontSize: `${fontSize - 1}px` }}>
                {tip.simplifiedExplanation}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  // 페이지 이미지 렌더링 함수
  const renderPageImages = () => {
    if (!pageImages || pageImages.length === 0) return null
    
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {pageImages.map(image => (
          <div key={image.id} className="bg-white rounded-md overflow-hidden shadow-sm">
            <img 
              src={image.imageUrl} 
              alt={image.altText || "이미지"} 
              className="w-full h-auto"
            />
            <div className="p-3">
              <Typography variant="p" className="font-medium">
                {image.conceptReference}
              </Typography>
              <Typography variant="p" className="text-gray-600 text-sm mt-1">
                {image.altText}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  // 로딩 상태
  if (isLoadingDocument) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
        <Typography variant="p" className="ml-2">문서 정보를 불러오는 중...</Typography>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-4 px-4">
      {/* 상단 컨트롤 바 */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 sticky top-0 z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Typography variant="h4" className="mr-4">
              {document?.title || '문서 제목'}
            </Typography>
            
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Typography variant="p" className="mx-2">
                {currentPage} / {document?.totalPages || 1}
              </Typography>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!document || currentPage >= document.totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleFontSizeChange(false)}
                disabled={fontSize <= 12}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Typography variant="p">{fontSize}px</Typography>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleFontSizeChange(true)}
                disabled={fontSize >= 24}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
            
            <Select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-40"
            >
              <option value="Noto Sans KR">Noto Sans</option>
              <option value="OpenDyslexic">OpenDyslexic</option>
              <option value="Lexend">Lexend</option>
              <option value="Arial">Arial</option>
            </Select>
            
            <Button 
              variant={showTips ? "default" : "outline"}
              size="sm"
              onClick={() => setShowTips(!showTips)}
              className="flex items-center gap-1"
            >
              <Info className="w-4 h-4" />
              <span>팁 {showTips ? '숨기기' : '보기'}</span>
            </Button>
            
            <Button variant="outline" onClick={toggleFullscreen}>
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* 페이지 콘텐츠 */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          {isLoadingPageContent ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin" />
              <Typography variant="p" className="ml-2">페이지를 불러오는 중...</Typography>
            </div>
          ) : currentPageContent ? (
            <>
              {/* 섹션 제목 */}
              {currentPageContent.sectionTitle && (
                <div className="mb-6">
                  <Typography variant="h3" className="font-bold text-blue-900">{currentPageContent.sectionTitle}</Typography>
                  
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>난이도: {currentPageContent.readingLevel}/10</span>
                    <span>단어 수: {currentPageContent.wordCount}</span>
                  </div>
                </div>
              )}
              
              {/* 처리된 콘텐츠 */}
              {renderProcessedContent(currentPageContent.processedContent)}
              
              {/* 페이지 이미지 */}
              {renderPageImages()}
              
              {/* 페이지 팁 */}
              {showTips && renderPageTips()}
            </>
          ) : (
            <Typography variant="p" className="text-center text-gray-500 py-10">
              페이지 내용이 없거나 로드하지 못했습니다.
            </Typography>
          )}
        </CardContent>
      </Card>
      
      {/* 하단 네비게이션 */}
      <div className="flex justify-between mt-6 max-w-4xl mx-auto">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          이전 페이지
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!document || currentPage >= document.totalPages}
        >
          다음 페이지
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
} 