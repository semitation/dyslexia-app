import { axiosClient } from '@/shared/api/axios';

export type ConvertProcessStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface GuardianTextbookDto {
  id: number;
  guardianId?: number;
  title: string;
  pageCount: number;
  learnRate?: number;
  convertProcessStatus: ConvertProcessStatus;
  createdAt: string;
  updatedAt: string;
}

export const guardianTextbookApi = {
  listMyTextbooks: async (): Promise<GuardianTextbookDto[]> => {
    const data = (await axiosClient.get('/guardian/textbooks')) as unknown;
    // Be tolerant to both array and wrapped response shapes
    if (Array.isArray(data)) return data as GuardianTextbookDto[];
    // Some backends wrap in { result: [...] }
    if (data && typeof data === 'object' && Array.isArray((data as any).result)) {
      return (data as any).result as GuardianTextbookDto[];
    }
    // Some backends mistakenly return a single object
    if (data && typeof data === 'object') return [data as GuardianTextbookDto];
    return [];
  },
};

