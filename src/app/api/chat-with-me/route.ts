import { NextRequest, NextResponse } from 'next/server';
import { OpenRouter } from '@openrouter/sdk';
import { OpenRouterError } from '@openrouter/sdk/models/errors';

type ChatRole = 'user' | 'assistant' | 'system';

interface ChatMessage {
  role: ChatRole;
  content: string;
}

const apiKey = process.env.OPENROUTER;
const defaultHeaders: Record<string, string> = {};

if (process.env.OPENROUTER_SITE_URL) {
  defaultHeaders['HTTP-Referer'] = process.env.OPENROUTER_SITE_URL;
}
if (process.env.OPENROUTER_TITLE) {
  defaultHeaders['X-Title'] = process.env.OPENROUTER_TITLE;
}

const openRouterClient = apiKey
  ? new OpenRouter({
      apiKey,
      ...(Object.keys(defaultHeaders).length
        ? { defaultHeaders }
        : undefined),
    })
  : null;

export async function POST(request: NextRequest) {
  if (!openRouterClient) {
    return NextResponse.json(
      { error: 'OpenRouter API key is not configured on the server.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const incomingMessages: unknown[] = Array.isArray(body?.messages)
      ? body.messages
      : [];
    const systemPrompt =
      typeof body?.systemPrompt === 'string'
        ? body.systemPrompt.trim()
        : '';

    const messages: ChatMessage[] = incomingMessages
      .map((message) => {
        if (
          !message ||
          typeof (message as any).content !== 'string' ||
          !(message as any).content.trim()
        ) {
          return null;
        }

        const role =
          (message as any).role === 'assistant' ? 'assistant' : 'user';

        return {
          role,
          content: (message as any).content.trim(),
        };
      })
      .filter(Boolean) as ChatMessage[];

    if (messages.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one user message.' },
        { status: 400 }
      );
    }

    const conversation: ChatMessage[] = systemPrompt
      ? [{ role: 'system', content: systemPrompt }, ...messages]
      : messages;

    const completion = await openRouterClient.chat.send({
      model:
        typeof body?.model === 'string'
          ? body.model
          : 'meta-llama/llama-3.2-3b-instruct:free',
      messages: conversation,
      stream: false,
    });

    const assistantMessage = completion?.choices?.[0]?.message;

    if (!assistantMessage?.content) {
      return NextResponse.json(
        { error: 'OpenRouter returned an empty response.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: assistantMessage,
      finishReason: completion.choices?.[0]?.finishReason ?? null,
      model: completion.model,
    });
  } catch (error) {
    console.error('chat-with-me API error:', error);

    if (error instanceof OpenRouterError) {
      let detail = error.message;
      try {
        const parsed = JSON.parse(error.body);
        detail =
          parsed?.error?.message ||
          parsed?.message ||
          parsed?.error ||
          detail;
      } catch {
        // ignore JSON parse errors
      }

      const status = error.statusCode || 500;
      return NextResponse.json(
        { error: detail, status },
        { status }
      );
    }

    const fallbackMessage =
      error instanceof Error
        ? error.message
        : 'Unexpected error while contacting OpenRouter.';

    return NextResponse.json({ error: fallbackMessage }, { status: 500 });
  }
}
