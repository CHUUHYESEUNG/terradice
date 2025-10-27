export interface JournalRecord {
  id: string;
  questionId: number;
  question: string;
  category: string;
  emoji: string;
  note: string;
  date: string;
  color?: string;
  imageUri?: string;
}

export interface StorageData {
  records: JournalRecord[];
}
