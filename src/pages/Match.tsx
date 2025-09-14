import { useState } from "react";

const DEMO_MATCH = {
  investorName: "Test Investor MMC",
  sectorInterest: "İT",
  riskTolerance: "Orta",
  email: "investor-match@demo.com"
};

const DEMO_CHAT = [
  { from: "ai", text: "Salam! Mən sizin üçün uyğun investoram. Sualınızı verə bilərsiniz." },
  { from: "user", text: "Sizin sektor marağınız nədir?" },
  { from: "ai", text: "Investor sektor maraqları: İT" }
];

const Match = () => {
  const [messages, setMessages] = useState(DEMO_CHAT);
  const [input, setInput] = useState("");

  function getAIDemoReply(msg: string) {
    if (msg.toLowerCase().includes("ad") || msg.toLowerCase().includes("name")) {
      return `Investor: ${DEMO_MATCH.investorName}`;
    }
    if (msg.toLowerCase().includes("sektor")) {
      return `Investor sektor maraqları: ${DEMO_MATCH.sectorInterest}`;
    }
    if (msg.toLowerCase().includes("risk")) {
      return `Investor risk toleransı: ${DEMO_MATCH.riskTolerance}`;
    }
    if (msg.toLowerCase().includes("əlaqə") || msg.toLowerCase().includes("contact") || msg.toLowerCase().includes("email")) {
      return `Əlaqə: ${DEMO_MATCH.email}`;
    }
    return "Sualınızı daha aydın verin.";
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "ai", text: getAIDemoReply(input) }]);
    }, 600);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-primary">AI ilə Ən Yaxşı Match</h2>
        <div className="mb-6">
          <div className="text-lg font-bold text-primary">Sizə ən uyğun Investor:</div>
          <div className="p-4 border rounded bg-gray-50 mb-2">
            <div><b>Ad:</b> {DEMO_MATCH.investorName}</div>
            <div><b>Sektoral maraqlar:</b> {DEMO_MATCH.sectorInterest}</div>
            <div><b>Risk toleransı:</b> {DEMO_MATCH.riskTolerance}</div>
            <div><b>Əlaqə:</b> {DEMO_MATCH.email}</div>
          </div>
          <div className="mt-2 text-xs text-gray-500">AI məsləhəti: Uyğunluq sektor və risk dərəcəsinə əsaslanır. Bu, demo görünüşdür.</div>
        </div>
        {/* Statik AI Chat bölməsi */}
        <div className="border rounded bg-gray-50 p-4 mb-4 h-72 overflow-y-auto flex flex-col">
          {messages.length === 0 && <div className="text-gray-400 text-center my-auto">AI ilə sual-cavab üçün mesaj yazın.</div>}
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.from === 'user' ? "text-right" : "text-left"}>
              <span className={msg.from === 'user' ? "inline-block bg-primary/20 text-primary px-3 py-1 rounded-lg my-1" : "inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-lg my-1"}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:border-primary"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="AI-ya sual verin..."
          />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition-colors">Göndər</button>
        </form>
      </div>
    </div>
  );
};

export default Match;