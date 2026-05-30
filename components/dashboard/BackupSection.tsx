export function BackupSection({
  onExport,
  onImport,
}: {
  onExport: () => void;
  onImport: () => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-sm font-semibold">資料備份</h2>
      <p className="text-xs text-slate-500">匯出學習紀錄為 JSON 檔案，可匯入到其他裝置。</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          onClick={onExport}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 active:bg-slate-50"
        >
          匯出備份
        </button>
        <button
          onClick={onImport}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 active:bg-slate-50"
        >
          匯入備份
        </button>
      </div>
    </section>
  );
}
