export class Report {
  public author: string;
  public createdAt: string;
  public imagePath: string;
  public description: string;
  public summary: string;

  constructor(author: string, createdAt: string, imagePath: string, description: string, summary: string) {
    this.author = author;
    this.createdAt = createdAt;
    this.imagePath = imagePath;
    this.description = description;
    this.summary = summary;
  }
}
