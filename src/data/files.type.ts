export type File = {
  id: number;
  fileName: string;
  ext: string;
  fileSize: number;
};

export function convertSize(size: number): string {
  if (size >= 1024 * 1024) {
    // Convert to MB if size is 1 MB or larger
    return (size / (1024 * 1024)).toFixed(0) + ' MB';
  } else {
    // Convert to KB if size is less than 1 MB
    return (size / 1024).toFixed(0) + ' KB';
  }
}
