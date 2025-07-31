export interface ApiRequest {
  id: string
  method: string
  url: string
  headers: Record<string, string>
  body: string
  timestamp: Date
}

export interface ApiResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  data: string
  responseTime: number
}

export type HistoryProps = {
  loadFromHistory: (request: ApiRequest) => void;
};