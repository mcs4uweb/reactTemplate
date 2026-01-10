'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '../../components/layout/Layout';

type ChatRole = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

const defaultSystemPrompt =
  'You are a concise, upbeat copilot that helps people reason about assets, maintenance, and purchases.';

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function ChatWithMePage() {
  const defaultModel = 'meta-llama/llama-3.2-3b-instruct:free';
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(defaultSystemPrompt);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const pairedMessages = useMemo(() => {
    // Pair user and assistant messages by turn for a tidy two-lane layout.
    const turns: { user?: ChatMessage; assistant?: ChatMessage }[] = [];
    messages.forEach((message) => {
      if (message.role === 'user') {
        turns.push({ user: message });
      } else if (turns.length === 0 || turns[turns.length - 1].assistant) {
        turns.push({ assistant: message });
      } else {
        turns[turns.length - 1].assistant = message;
      }
    });
    return turns;
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: trimmed,
    };

    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput('');
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch('/api/chat-with-me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversation.map(({ role, content }) => ({
            role,
            content,
          })),
          systemPrompt,
          model: defaultModel,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message =
          payload?.error ||
          `Chat request failed (${response.status} ${response.statusText}).`;
        throw new Error(message);
      }

      const payload = await response.json();
      const assistantContent: string | null =
        payload?.message?.content ?? payload?.choices?.[0]?.message?.content;

      if (!assistantContent) {
        throw new Error('OpenRouter did not return a message.');
      }

      const assistantMessage: ChatMessage = {
        id: createId(),
        role: 'assistant',
        content: assistantContent,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unexpected error occurred.';
      setError(message);
    } finally {
      setIsSending(false);
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <Layout>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
        <div className='mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:flex-row lg:items-start'>
          <div className='flex-1 space-y-6'>
            <header className='space-y-2'>
              <p className='text-sm font-semibold uppercase tracking-wide text-blue-600'>
                Chat with me
              </p>
              <h1 className='text-3xl font-bold text-gray-900'>
                Ask questions, plan maintenance, or explore ideas
              </h1>
              <p className='text-base text-gray-600'>
                Your messages stay on the left. Replies powered by OpenRouter
                appear on the right so you can skim each turn quickly.
              </p>
            </header>

            <div className='rounded-2xl bg-white shadow-md'>
              <div
                ref={scrollRef}
                className='max-h-[60vh] space-y-3 overflow-y-auto p-6 sm:max-h-[70vh]'
              >
                {pairedMessages.length === 0 && !isSending && (
                  <div className='flex items-center justify-center rounded-xl border border-dashed border-blue-200 bg-blue-50 px-4 py-6 text-center text-sm text-blue-700'>
                    Start by typing a question below. I will keep system replies
                    on the right.
                  </div>
                )}

                {pairedMessages.map((turn, index) => (
                  <div
                    key={`${turn.user?.id || 'turn'}-${index}`}
                    className='grid grid-cols-2 gap-4'
                  >
                    <div className='flex justify-start'>
                      {turn.user && (
                        <div className='max-w-full rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-800 shadow-sm sm:max-w-[92%]'>
                          <div className='mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500'>
                            You
                          </div>
                          <p className='whitespace-pre-wrap leading-relaxed'>
                            {turn.user.content}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className='flex justify-end'>
                      {turn.assistant && (
                        <div className='max-w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm text-white shadow-sm sm:max-w-[92%]'>
                          <div className='mb-1 text-xs font-semibold uppercase tracking-wide text-blue-100'>
                            System
                          </div>
                          <p className='whitespace-pre-wrap leading-relaxed'>
                            {turn.assistant.content}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isSending && (
                  <div className='flex justify-end'>
                    <div className='flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm text-blue-700'>
                      <span className='h-2 w-2 animate-ping rounded-full bg-blue-500' />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className='border-t border-gray-100 p-6'>
                <form onSubmit={sendMessage} className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <label className='text-sm font-medium text-gray-700'>
                      Your message
                    </label>
                    {error && (
                      <span className='text-xs text-red-600'>{error}</span>
                    )}
                  </div>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={3}
                    placeholder='Ask about vehicle upkeep, compare assets, or get planning advice.'
                    className='w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
                  />
                  <div className='flex flex-wrap items-center justify-between gap-3'>
                    <div className='flex gap-2'>
                      <button
                        type='submit'
                        disabled={isSending || !input.trim()}
                        className='inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
                      >
                        {isSending ? 'Sending…' : 'Send'}
                      </button>
                      <button
                        type='button'
                        onClick={resetConversation}
                        className='inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50'
                      >
                        Reset
                      </button>
                    </div>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>

          <aside className='w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-md'>
            
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={6}
              className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
            />
           
          </aside>
        </div>
      </div>
    </Layout>
  );
}
