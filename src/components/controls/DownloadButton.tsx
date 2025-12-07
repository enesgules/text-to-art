"use client";

interface DownloadButtonProps {
  onDownload: () => void;
  isExporting?: boolean;
}

export function DownloadButton({ onDownload, isExporting }: DownloadButtonProps) {
  return (
    <button
      onClick={onDownload}
      disabled={isExporting}
      className="w-full h-10 bg-white text-black text-sm font-medium rounded hover:bg-white/90 transition-colors disabled:opacity-50"
    >
      {isExporting ? "Exporting..." : "Download"}
    </button>
  );
}
