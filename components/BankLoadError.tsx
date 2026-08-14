/**
 * Shared full-page notice for a failed data-bank chunk load. `bankLabel` is
 * the human name of the bank (題庫 / 單字庫).
 */
export default function BankLoadError({ bankLabel }: { bankLabel: string }) {
  return (
    <section className="py-10 text-center">
      <h1 className="text-lg font-bold text-slate-800">{bankLabel}暫時無法載入</h1>
      <p className="mt-2 text-sm text-slate-500">
        請確認網路後重新整理頁面；已保存的學習進度不受影響。
      </p>
    </section>
  );
}
