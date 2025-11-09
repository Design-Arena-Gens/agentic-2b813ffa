"use client";

import { useEffect, useState } from "react";
import { agentChatReply, type ChatMessage, type ListingInput } from "@/lib/agent";

type AgentChatProps = {
  listing: ListingInput | null;
};

export function AgentChat({ listing }: AgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const disabled = !listing;

  useEffect(() => {
    if (!listing) {
      setMessages([]);
      return;
    }
      setMessages([
        {
          id: `msg-${Math.random().toString(36).slice(2)}-${Date.now()}`,
          role: "assistant",
          content:
            "Namaste! Main aapki Facebook Marketplace growth co-pilot hoon. Listing ke baare mein sawaal poocho aur main turant strategies suggest karunga.",
          createdAt: Date.now()
        }
    ]);
  }, [listing]);

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    if (!listing || !input.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Math.random().toString(36).slice(2)}-${Date.now()}`,
      role: "user",
      content: input.trim(),
      createdAt: Date.now()
    };

    const reply = agentChatReply(listing, messages, input.trim());
    setMessages((prev) => [...prev, userMessage, reply]);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-indigo-500/10">
      <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300/80">
        Real-Time Growth Chat
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl bg-white/5 p-4">
        {messages.length === 0 && (
          <p className="text-sm text-slate-400">
            Listing publish hone ke baad agent se baat cheet shuru karein. Sabse pehle listing
            form bhar kar score dekhein.
          </p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow ${
                message.role === "assistant"
                  ? "bg-primary/20 text-slate-100"
                  : "bg-white/90 text-slate-900"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="mt-4 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={
            disabled
              ? "Listing details bharne ke baad chat unlock hogi."
              : "Buyer ne kya poocha? Yahaan likhein..."
          }
          className="flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-secondary disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
