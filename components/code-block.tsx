import { Fragment } from "react";

type CodeBlockProps = {
  code: string;
  lang: string;
  caption?: string;
};

// prettier-ignore
const KEYWORDS: Record<string, string[]> = {
  ts: [
    "const", "let", "var", "function", "return", "await", "async", "if", "else",
    "throw", "new", "import", "from", "export", "type", "interface", "as",
    "default", "class", "extends", "for", "of", "in", "try", "catch",
  ],
  sql: [
    "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "EXISTS", "JOIN", "ON",
    "ORDER", "BY", "LIMIT", "CREATE", "INDEX", "TABLE", "ALTER", "ADD",
    "CONSTRAINT", "EXCLUDE", "USING", "WITH", "DESC", "ASC", "INSERT", "INTO",
    "VALUES", "UPDATE", "SET", "DELETE", "IN",
  ],
  json: ["true", "false", "null"],
  forgescript: [
    "feature", "feat", "bug", "chore", "task", "improvement", "improve",
    "docs", "research",
  ],
};

/** Quote characters that open a string, per language. JSON only has `"`. */
const STRING_DELIMITERS: Record<string, string> = {
  ts: "\"'`",
  json: '"',
  sql: "'\"",
  // Plain text — nothing quotes, so apostrophes stay apostrophes.
  forgescript: "",
};

/** Token that starts a line comment, per language. */
const COMMENT_TOKEN: Record<string, string> = {
  ts: "//",
  json: "//",
  sql: "--",
  // `-` starts a subtask, and `#` is a task type — neither is a comment.
  forgescript: "\0",
};

type Token = {
  text: string;
  kind: "comment" | "string" | "keyword" | "number" | "plain" | "key";
};

/**
 * Small hand-rolled highlighter. It walks the line one character at a time
 * rather than splitting on a regex, which is what makes it safe for the
 * awkward cases: escaped quotes inside strings, `//` appearing *within* a
 * string, and repeated identical strings on one line.
 *
 * Deliberately not a parser — it only needs to be right for the snippets on
 * this site, and that's much cheaper than shipping a real highlighter.
 */
function tokenize(line: string, lang: string): Token[] {
  const keywords = KEYWORDS[lang] ?? [];
  const quotes = STRING_DELIMITERS[lang] ?? "\"'";
  const commentToken = COMMENT_TOKEN[lang] ?? "//";

  const tokens: Token[] = [];
  let plain = "";

  /** Flush buffered non-string text, classifying each word. */
  const flushPlain = () => {
    if (!plain) return;
    for (const word of plain.split(/(\W)/g)) {
      if (!word) continue;
      if (keywords.includes(word) || keywords.includes(word.toUpperCase())) {
        tokens.push({ text: word, kind: "keyword" });
      } else if (/^\d+(\.\d+)?$/.test(word)) {
        tokens.push({ text: word, kind: "number" });
      } else {
        tokens.push({ text: word, kind: "plain" });
      }
    }
    plain = "";
  };

  let i = 0;
  while (i < line.length) {
    const char = line[i];

    // Comment — only outside a string, so URLs and regexes survive.
    if (line.startsWith(commentToken, i)) {
      flushPlain();
      tokens.push({ text: line.slice(i), kind: "comment" });
      return tokens;
    }

    if (quotes.includes(char)) {
      flushPlain();

      // Consume to the matching quote, respecting backslash escapes.
      let j = i + 1;
      while (j < line.length) {
        if (line[j] === "\\") {
          j += 2;
          continue;
        }
        if (line[j] === char) break;
        j++;
      }

      const text = line.slice(i, Math.min(j + 1, line.length));

      // In JSON, a string followed by a colon is a key rather than a value.
      const isKey =
        lang === "json" &&
        /^\s*:/.test(line.slice(Math.min(j + 1, line.length)));

      tokens.push({ text, kind: isKey ? "key" : "string" });
      i = j + 1;
      continue;
    }

    plain += char;
    i++;
  }

  flushPlain();
  return tokens;
}

const TOKEN_CLASS: Record<Token["kind"], string> = {
  key: "text-chart-2",
  comment: "text-ink-4 italic",
  string: "text-chart-5",
  keyword: "text-primary",
  number: "text-chart-4",
  plain: "text-ink-2",
};

const CodeBlock = ({ code, lang, caption }: CodeBlockProps) => {
  const lines = code.split("\n");

  return (
    <figure className="not-prose overflow-hidden rounded-xl border border-hairline bg-foreground/[0.025]">
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-ink-4/40" />
          <span className="size-2 rounded-full bg-ink-4/40" />
          <span className="size-2 rounded-full bg-ink-4/40" />
        </span>
        <span className="ml-1 font-mono text-[10px] tracking-widest text-ink-4 uppercase">
          {lang}
        </span>
      </div>

      <div className="overflow-x-auto">
        <pre className="p-4 font-mono text-[12.5px] leading-relaxed md:text-[13px]">
          <code>
            {lines.map((line, i) => (
              <Fragment key={i}>
                <span className="table-row">
                  <span
                    aria-hidden
                    className="table-cell pr-4 text-right text-ink-4/50 select-none"
                  >
                    {i + 1}
                  </span>
                  <span className="table-cell whitespace-pre">
                    {tokenize(line, lang).map((token, j) => (
                      <span key={j} className={TOKEN_CLASS[token.kind]}>
                        {token.text}
                      </span>
                    ))}
                  </span>
                </span>
              </Fragment>
            ))}
          </code>
        </pre>
      </div>

      {caption ? (
        <figcaption className="border-t border-hairline px-4 py-2.5 font-mono text-[11px] text-ink-4">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};

export default CodeBlock;
