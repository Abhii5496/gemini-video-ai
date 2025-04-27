import { cn } from "@/lib/utils"
import { Copy, Download } from "lucide-react"
import Link from "next/link"
import React, { memo } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import useCopy from "@/utils/useCopy"

const NonMemoizedMarkdown = ({ children }) => {
  const [copyToClipboard, { copied }] = useCopy(2000)

  const handleDownload = (content, language) => {
    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `code.${language}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "")
      const codeContent = String(children).replace(/\n$/, "")

      return !inline && match ? (
        <div className="relative my-3">
          <SyntaxHighlighter
            style={atomDark}
            language={match[1]}
            PreTag="div"
            customStyle={{
              borderRadius: "0.375rem",
              margin: 0,
              paddingTop: 56,
              marginTop: "0.75rem",
              fontSize: "0.875rem",
            }}
            {...props}
          >
            {codeContent}
          </SyntaxHighlighter>
          <div className="absolute top-0 left-0 right-0 bg-muted-foreground/10 flex items-center justify-between px-4 py-2 text-xs font-sans bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary rounded-t-[5px] border-b border-token-border-medium select-none">
            <span>{match[1]}</span>
            <div className="flex items-center gap-2">
              <button
                className="flex gap-1 items-center select-none px-4 py-1 hover:bg-muted-foreground/10 rounded transition-colors"
                onClick={() => copyToClipboard(codeContent)}
                aria-label="Copy"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                className="flex items-center gap-1 px-4 py-1 select-none hover:bg-muted-foreground/10 rounded transition-colors"
                onClick={() => handleDownload(codeContent, match[1])}
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      ) : (
        <code
          className={cn(
            className,
            "whitespace-pre-wrap break-words text-[13px] font-normal",
            "bg-zinc-100 dark:bg-zinc-800",
            "py-0.5 px-1 mx-1 rounded"
          )}
          {...props}
        >
          {children}
        </code>
      )
    },
    ol({ node, children, ...props }) {
      return (
        <ol className="list-decimal list-outside ml-4 text-sm" {...props}>
          {children}
        </ol>
      )
    },
    li({ node, children, ...props }) {
      return (
        <li className="py-1 text-sm leading-6" {...props}>
          {children}
        </li>
      )
    },
    ul({ node, children, ...props }) {
      return (
        <ul className="list-decimal list-outside ml-4 text-sm" {...props}>
          {children}
        </ul>
      )
    },
    strong({ node, children, ...props }) {
      return (
        <span className="font-semibold text-sm" {...props}>
          {children}
        </span>
      )
    },
    a({ node, children, ...props }) {
      return (
        <Link
          className="text-blue-500 hover:underline text-sm"
          target="_blank"
          rel="noreferrer"
          {...props}
        >
          {children}
        </Link>
      )
    },
    h1({ node, children, ...props }) {
      return (
        <h1 className="text-2xl font-semibold mb-2" {...props}>
          {children}
        </h1>
      )
    },
    h2({ node, children, ...props }) {
      return (
        <h2 className="text-xl font-semibold mb-2" {...props}>
          {children}
        </h2>
      )
    },
    h3({ node, children, ...props }) {
      return (
        <h3 className="text-lg font-semibold mb-2" {...props}>
          {children}
        </h3>
      )
    },
    h4({ node, children, ...props }) {
      return (
        <h4 className="text-base font-semibold mb-2" {...props}>
          {children}
        </h4>
      )
    },
    h5({ node, children, ...props }) {
      return (
        <h5 className="text-sm font-semibold mb-2" {...props}>
          {children}
        </h5>
      )
    },
    h6({ node, children, ...props }) {
      return (
        <h6 className="text-xs font-semibold mb-2" {...props}>
          {children}
        </h6>
      )
    },
    p({ node, children, ...props }) {
      return (
        <p className="mb-3 text-sm leading-6 " {...props}>
          {children}
        </p>
      )
    },
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  )
}

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children
)
