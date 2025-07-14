import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Type,
  Bookmark,
  Eye,
  Volume2,
  VolumeX,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProcessedContent } from '@/features/viewer/ui/processed-content';
import { viewerApi } from '@/features/viewer/api/viewer-api';

export const Route = createFileRoute('/teacher/viewer/$documentId')({
  component: DocumentViewerPage,
});

const fontMap = {
  dyslexic: 'font-dyslexic',
  sans: 'font-sans',
  serif: 'font-serif',
} as const satisfies Record<string, string>;

const bgMap = {
  white: 'bg-white',
  cream: 'bg-orange-50',
  light: 'bg-blue-50',
  dark: 'bg-gray-800 text-white',
} as const satisfies Record<string, string>;

export default function DocumentViewerPage() {
  const { documentId } = Route.useParams();
  const docId = Number.parseInt(documentId ?? '', 10);
  const totalPages = 20;

  const [currentPage, setCurrentPage] = useState(1);
  const [fontSize, setFontSize] = useState([18]);
  const [lineSpacing, setLineSpacing] = useState([1.6]);
  const [letterSpacing, setLetterSpacing] = useState([0.05]);
  const [fontFamily, setFontFamily] = useState<'dyslexic' | 'sans' | 'serif'>('dyslexic');
  const [backgroundColor, setBackgroundColor] = useState<'white' | 'cream' | 'light' | 'dark'>('white');
  const [isVocabHighlightOn, setIsVocabHighlightOn] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [readingFocusMode, setReadingFocusMode] = useState(false);
  const [showPageList, setShowPageList] = useState(false);

  const { data: pages = [] } = useQuery({
    queryKey: ['document', docId, 'page-content', currentPage],
    queryFn: () => viewerApi.getPageContent(docId, currentPage),
    enabled: !!docId,
  });

  const page = pages[0];

  const handleTTS = () => {
    if (!page?.processedContent) return;
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    const blocks = page.processedContent.filter((b) => 'text' in b) as { text: string }[];
    const utterance = new SpeechSynthesisUtterance(blocks.map((b) => b.text).join('\n'));
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    utterance.lang = 'ko-KR';
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    speechSynthesis.speak(utterance);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const handleJumpToPage = (page: number) => {
    setCurrentPage(page);
    setShowPageList(false);
  };

  useEffect(() => {
    return () => speechSynthesis.cancel();
  }, []);

  return (
    <div className={["min-h-screen", "flex", "flex-col", bgMap[backgroundColor], readingFocusMode ? "reading-focus" : ""].join(" ")}>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Popover open={showPageList} onOpenChange={setShowPageList}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">{currentPage} / {totalPages} 페이지</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <h4 className="font-medium mb-3" id="page-jump-label">페이지 이동</h4>
              <ScrollArea className="h-40" aria-labelledby="page-jump-label">
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleJumpToPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setFontSize(prev => [Math.max(14, prev[0] - 2)])}>A-</Button>
            <Button variant="outline" size="sm" onClick={() => setFontSize(prev => [Math.min(28, prev[0] + 2)])}>A+</Button>
            <Select value={fontFamily} onValueChange={(value: 'dyslexic' | 'sans' | 'serif') => setFontFamily(value)}>
              <SelectTrigger className="w-20"><Type className="w-4 h-4" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dyslexic">난독증</SelectItem>
                <SelectItem value="sans">고딕</SelectItem>
                <SelectItem value="serif">명조</SelectItem>
              </SelectContent>
            </Select>
            <Button variant={isVocabHighlightOn ? 'default' : 'outline'} size="sm" onClick={() => setIsVocabHighlightOn(!isVocabHighlightOn)}><Bookmark className="w-4 h-4" /></Button>
            <Button variant={readingFocusMode ? 'default' : 'outline'} size="sm" onClick={() => setReadingFocusMode(!readingFocusMode)}><Eye className="w-4 h-4" /></Button>
            <Button variant={isReading ? 'destructive' : 'outline'} size="sm" onClick={handleTTS}>{isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}</Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm"><Settings className="w-4 h-4" /></Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="line-spacing-slider">줄 간격</label>
                    <Slider id="line-spacing-slider" value={lineSpacing} onValueChange={setLineSpacing} min={1.2} max={2.4} step={0.2} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="letter-spacing-slider">자간</label>
                    <Slider id="letter-spacing-slider" value={letterSpacing} onValueChange={setLetterSpacing} min={0} max={0.15} step={0.01} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="background-color-select">배경색</label>
                    <Select value={backgroundColor} onValueChange={(value: 'white' | 'cream' | 'light' | 'dark') => setBackgroundColor(value)}>
                      <SelectTrigger id="background-color-select"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="white">밝은 테마</SelectItem>
                        <SelectItem value="cream">세피아</SelectItem>
                        <SelectItem value="light">연한 파랑</SelectItem>
                        <SelectItem value="dark">어두운 테마</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className={`relative shadow-lg ${fontMap[fontFamily]} ${bgMap[backgroundColor]}`}>
          <CardContent className="p-8">
            {page ? (
              <>
                <div className="absolute top-4 right-4">
                  <Star className="w-8 h-8 text-yellow-400 fill-current animate-pulse" />
                </div>
                <div className="grid md:grid-cols-2 gap-8" style={{ fontSize: `${fontSize[0]}px`, lineHeight: lineSpacing[0], letterSpacing: `${letterSpacing[0]}em` }}>
                  <ProcessedContent
                    blocks={page.processedContent}
                    fontSize={fontSize[0]}
                    fontFamily={fontFamily}
                    lineSpacing={lineSpacing[0]}
                    documentId={docId}
                    pageNumber={currentPage}
                  />
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 py-10">페이지를 불러올 수 없습니다.</div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="sticky bottom-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button variant="outline" size="lg" onClick={() => handlePageChange('prev')} disabled={currentPage <= 1}>
            <ChevronLeft className="w-5 h-5 mr-2" /> 이전
          </Button>
          <div className="flex-1 mx-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">읽기 진행률</span>
              <span className="text-sm font-medium text-primary">{Math.round((currentPage / totalPages) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-full h-3 transition-all duration-500 relative" style={{ width: `${(currentPage / totalPages) * 100}%` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
          <Button variant="outline" size="lg" onClick={() => handlePageChange('next')} disabled={currentPage >= totalPages}>
            다음 <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
