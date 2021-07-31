export interface LinkModel {
  name: string;
  url: string;
  createdAt: string;
  score: number;
  id: string;
}

export type SerializedLink = Omit<LinkModel, "createdAt"> & {
  createdAt: Date;
};
