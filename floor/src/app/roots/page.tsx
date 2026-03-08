import Link from 'next/link';

const timeline = [
  {
    year: '1970s',
    city: 'Chicago',
    title: 'The Warehouse — 誕生の場所',
    body: 'Frankie Knucklesが South Jefferson Street の倉庫でDJを始める。ディスコ、ソウル、ゴスペル、エレクトロニクスが融合した音楽はまだ名前を持たなかった。しかしそこに集まる人々——アフリカ系、ラテン系、クィアコミュニティ——の身体は、その音楽に「なって」いた。',
    ja: '「ハウスミュージック」という言葉が生まれる前の話。',
  },
  {
    year: '1981–1987',
    city: 'Chicago',
    title: 'The Music Box — Ron Hardy',
    body: 'Ron Hardyがthe Music Boxのレジデントに。実験的でrawなセットはダンサーを新たな身体的領域へ押し込んだ。彼のフロアに「うまく踊る」場所はなかった。あるのは「正直に踊る」場所だった。ハウスダンスの語彙が固まり始める。',
    ja: 'フロアが嘘を拒絶し始めた時代。',
  },
  {
    year: '1987',
    city: 'Chicago / Global',
    title: 'Jack Your Body — 名前が与えられる',
    body: 'Steve \'Silk\' Hurleyの "Jack Your Body" が全英1位。ハウスミュージックは国際化した。「ジャック」という言葉が、すでに起きていた動きに名前を与えた。身体がやっていたことに言語が追いついた瞬間。',
    ja: 'すでに起きていたことに、ようやく言葉がついた。',
  },
  {
    year: '1980s–90s',
    city: 'New York',
    title: 'Paradise Garage / The Loft',
    body: 'Larry LevanのParadise Garage、David MancusoのThe Loft。ニューヨークのシーンはよりジャズ的な洗練と感情的深度を持った。DJ-ダンサーの関係は共生的になった。DJはフロアを読み、ダンサーはDJと対話した。',
    ja: 'ダンスとDJが会話を始めた。',
  },
  {
    year: '1990s',
    city: 'Paris · Tokyo · London',
    title: 'グローバル化 — そして深化',
    body: 'ヨーロッパとアジアへ根を張る。パリは独自の洗練を持ち、東京は世界屈指の技術的厳密さを持つシーンを育てた。グローバル化しながら、ローカルで深化する——これがハウスの矛盾した強さ。',
    ja: '東京のシーンは世界水準に到達した。そして国際的に知られていない。',
  },
  {
    year: '2000s–2010s',
    city: 'Global',
    title: 'Battles — 国際的対話',
    body: 'Juste Debout（パリ）、Body Rock（ニューヨーク）、Carnival（東京）などのバトルが国際的対話を生んだ。文化はアンダーグラウンドの根を保ちながら、グローバルなネットワークを構築した。',
    ja: '対話は競争ではなく、共鳴だった。',
  },
  {
    year: '2020s',
    city: 'Everywhere',
    title: 'AI時代 — 身体性の再定義',
    body: 'アルゴリズムが音楽をキュレートし、モーションキャプチャがダンスをマッピングする。しかしサイファーは依然として還元不能だ。HOUSE IS A STATE が問いかけるのは：機械がすべてをシミュレートできる世界で、20年間聴くことを学んだ人間の身体の価値は何か？',
    ja: 'その問いは、このプラットフォームが存在する理由でもある。',
  },
];

const elements = [
  {
    name: 'Footwork',
    ja: 'フットワーク',
    body: 'キックとスネアに直接対話する複雑なリズムパターン。足が音楽を言語に翻訳する。フットワークが深いとき、翻訳は不要になる——足が直接音楽になる。',
  },
  {
    name: 'Jack',
    ja: 'ジャック',
    body: 'リズムの楽器としての胴体。ジャッキングはパフォーマンスではない——降伏だ。身体がグルーヴに同期したとき、思考が止まる。これが動的瞑想状態。"Jack Your Body" とはそういうことだ。',
  },
  {
    name: 'Loft',
    ja: 'ロフト',
    body: 'ジャズとクラブ文化が出会うフロアレベルの芸術。地面は限界ではなく招待だ。ロフティングはアスリートとアーティストの境界を溶かす。重力と対話する。',
  },
  {
    name: 'Cipher',
    ja: 'サイファー',
    body: 'ハウスが息をする円。ヒエラルキーのない儀式空間。準備ができたときに入り、持っているものを与え、フロアが返してくるものを受け取る。ユング的：個人の声が集合的無意識に溶ける瞬間。',
  },
];

export default function RootsPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-28">

      {/* Header */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-6">ROOTS — 歴史と起源</p>
          <h1 className="text-[clamp(3rem,9vw,6rem)] font-display font-display font-black text-[#ede8e0] leading-[0.88] tracking-tight mb-8">
            シカゴ発。<br />
            <span className="text-gold">すべてはそこから。</span>
          </h1>
          <p className="text-[#7a7060] text-lg max-w-2xl leading-relaxed">
            ハウスダンスはスタジオで生まれたのではない。1977年、シカゴの South Jefferson Street の倉庫の暗闇の中で、
            まだ名前もない音楽と共に、自分たちが歴史を作っているとも知らずに踊った人々から生まれた。
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 pb-28">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-8 group border-b border-white/[0.05] hover:border-white/10 transition-colors">
                <div className="hidden md:flex flex-col min-w-[5rem] pt-8 pb-8">
                  <span className="text-[#c9a96e] font-black text-xs">{item.year}</span>
                  <span className="text-[#3a3628] text-[9px] mt-1">{item.city}</span>
                </div>
                <div className="flex-1 py-8">
                  <div className="flex flex-wrap gap-3 items-baseline mb-3">
                    <span className="md:hidden text-[#c9a96e] font-black text-xs">{item.year}</span>
                    <h3 className="text-[#ede8e0] font-bold text-lg">{item.title}</h3>
                  </div>
                  <p className="text-[#7a7060] text-sm leading-relaxed mb-3">{item.body}</p>
                  <p className="text-[#3a3628] text-xs italic">{item.ja}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Elements */}
      <section className="py-28 px-6 bg-[#0d0d0d] border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-14">4 Elements</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {elements.map((el) => (
              <div key={el.name} className="bg-[#0d0d0d] p-10 hover:bg-[#141414] transition-colors group">
                <div className="mb-5">
                  <h3 className="text-[#ede8e0] font-display font-black text-2xl group-hover:text-[#c9a96e] transition-colors">
                    {el.name}
                  </h3>
                  <p className="text-[#3a3628] text-xs tracking-widest mt-1">{el.ja}</p>
                </div>
                <p className="text-[#7a7060] text-sm leading-relaxed">{el.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-28 px-6 bg-[#060606]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-8">Philosophy</p>
          <h2 className="text-3xl md:text-4xl font-display font-black text-[#ede8e0] mb-10 leading-tight">
            サイファーで起きることは<br />エンターテインメントではない
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-[#a09880] text-lg leading-relaxed">
                ハウスダンスが深く入ったとき——フットワークがキックドラムに出会い、ジャックがグルーヴを捉え、サイファーが一つの生命体として呼吸し始めるとき——心理学に名前がある現象が起きる：集合トランス、ユング的集合的無意識、動的瞑想。
              </p>
              <p className="text-[#7a7060] text-sm leading-relaxed">
                ハウスミュージックは設計上ミニマルだ：歌詞は少なく、繰り返すグルーヴ、心拍と呼吸に直接マッピングするリズム。BGMではない。誘導システムだ。身体が同期する。思考が静まる。残るのは感覚——そして、これまで一言も交わしたことのない人々の間に、本物の共鳴が生まれる可能性。
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: 'サイファーは儀式空間', body: '円はパフォーマンス空間ではない。平等主義的で、現在進行形で、脆弱性を要求する。準備ができたときに入り、持っているものを与え、フロアが返してくるものを受け取る。これは比喩ではない。言語以前から存在する社会的技術だ。' },
                { label: '身体は楽器', body: 'ハウスダンスは身体を形作られるオブジェクトとしてではなく、演奏される楽器として扱う。音楽があなたを通じて演奏される。ダンサーと音楽の区別が溶ける。実践者が「その中にいる」と呼ぶ瞬間。' },
              ].map((p) => (
                <div key={p.label} className="border border-white/[0.05] p-6 hover:border-[#c9a96e]/20 transition-colors">
                  <p className="text-[#c9a96e] text-[9px] tracking-widest uppercase mb-3">{p.label}</p>
                  <p className="text-[#7a7060] text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-t border-white/[0.05] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-display font-black text-[#ede8e0] mb-4">
            文化は生きている。<br />あなたの身体の中で。
          </h2>
          <p className="text-[#7a7060] mb-8">
            Ritual Nightで体験する。STATE Circleでコミュニティに入る。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ritual"
              className="border border-[#c9a96e]/50 text-[#c9a96e] px-8 py-4 font-bold hover:bg-[#c9a96e] hover:text-[#060606] transition-all"
            >
              Ritual Night →
            </Link>
            <Link
              href="/circle"
              className="border border-white/[0.07] text-[#7a7060] px-8 py-4 hover:text-[#ede8e0] transition-all"
            >
              STATE Circle →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
