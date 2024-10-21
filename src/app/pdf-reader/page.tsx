import PDFReader from "@/components/PDFReader";

export default function PDFReaderPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">PDF Study Tool</h1>
      <PDFReader />
    </div>
  );
}
