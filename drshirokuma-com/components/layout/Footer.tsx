import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#ede8df] border-t border-[rgba(26,24,20,0.08)] py-12 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-[#1a1814] font-black tracking-[0.25em] text-sm mb-1">SHIROKUMA</p>
          <p className="text-[#b0a898] text-[10px] tracking-widest">老化は文明病である</p>
        </div>
        <ul className="flex flex-wrap gap-6">
          {['PHILOSOPHY', 'NATURAL CODE', 'PROGRAMS', 'INNER CIRCLE'].map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="text-[#6b6355] text-[9px] tracking-[0.3em] uppercase hover:text-[#1a1814] transition-colors"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-[#b0a898] text-[9px] tracking-wider">
          © 2026 SHIROKUMA · drshirokuma.com
        </p>
      </div>
    </footer>
  );
}
