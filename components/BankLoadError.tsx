/**
 * Shared full-page notice for a failed data-bank chunk load. `bankLabel` is
 * the human name of the bank (題庫 / 單字庫).
 */
export default function BankLoadError({ bankLabel }: { bankLabel: string }) {
  return (
    <p className="py-10 text-center text-slate-500">
      {bankLabel}載入失敗，請確認網路後重新整理頁面。
    </p>
  );
}
