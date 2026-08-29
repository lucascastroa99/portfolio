import { useCallback, useRef, useState } from "react";

const MIME_TYPE_MAP: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  tiff: "image/tiff",
  bmp: "image/bmp",
  pdf: "application/pdf",
};

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

interface UseFileUploadOptions {
  maxSize: number;
  supportedFormats: readonly string[];
  maxFiles?: number;
  onFileAccepted: (file: File) => void;
  onError?: (message: string) => void;
}

interface UseFileUploadReturn {
  isDragActive: boolean;
  handleDragEnter: React.DragEventHandler;
  handleDragLeave: React.DragEventHandler;
  handleDragOver: React.DragEventHandler;
  handleDrop: React.DragEventHandler;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleClick: () => void;
  acceptAttribute: string;
}

/** File upload hook with drag-and-drop and validation. Zero external dependencies. */
export function useFileUpload({
  maxSize,
  supportedFormats,
  maxFiles = 1,
  onFileAccepted,
  onError,
}: UseFileUploadOptions): UseFileUploadReturn {
  const [isDragActive, setIsDragActive] = useState(false);
  const dragCounterRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const acceptAttribute = supportedFormats.map((f) => MIME_TYPE_MAP[f] || `image/${f}`).join(",");

  const validateAndAccept = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      if (files.length > maxFiles) {
        onError?.(`Too many files. Maximum: ${maxFiles}`);
        return;
      }

      for (const file of Array.from(files)) {
        const ext = file.name.toLowerCase().split(".").pop();

        if (!ext || !supportedFormats.includes(ext)) {
          onError?.(`Unsupported format. Accepted: ${supportedFormats.join(", ")}`);
          return;
        }

        if (file.size > maxSize) {
          onError?.(`File too large. Maximum size: ${formatFileSize(maxSize)}`);
          return;
        }

        onFileAccepted(file);
      }
    },
    [maxSize, supportedFormats, maxFiles, onFileAccepted, onError],
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current === 0) {
      setIsDragActive(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      dragCounterRef.current = 0;
      validateAndAccept(e.dataTransfer.files);
    },
    [validateAndAccept],
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    isDragActive,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    fileInputRef,
    handleClick,
    acceptAttribute,
  };
}
