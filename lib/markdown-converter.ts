import { marked } from "marked"

// Custom renderer for shadcn/ui typography
const renderer = new marked.Renderer()

// Headings
renderer.heading = ({ tokens, depth }) => {
  const text = tokens.map(t => t.raw).join("")
  switch (depth) {
    case 1:
      return `<h1 class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">${text}</h1>`
    case 2:
      return `<h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">${text}</h2>`
    case 3:
      return `<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">${text}</h3>`
    case 4:
      return `<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">${text}</h4>`
    case 5:
      return `<h5 class="scroll-m-20 text-lg font-semibold tracking-tight">${text}</h5>`
    case 6:
      return `<h6 class="scroll-m-20 text-base font-semibold tracking-tight">${text}</h6>`
    default:
      return `<h${depth}>${text}</h${depth}>`
  }
}

// Paragraph
renderer.paragraph = ({ tokens }) => {
  const text = tokens.map(t => t.raw).join("")
  return `<p class="leading-7 [&:not(:first-child)]:mt-6">${text}</p>`
}

// Blockquote
renderer.blockquote = ({ tokens }) => {
  const text = tokens.map(t => t.raw).join("")
  return `<blockquote class="mt-6 border-l-2 pl-6 italic">${text}</blockquote>`
}

// List (ul / ol)
renderer.list = ({ items, ordered }) => {
  const tag = ordered ? "ol" : "ul"
  const listClass = ordered ? "my-6 ml-6 list-decimal [&>li]:mt-2" : "my-6 ml-6 list-disc [&>li]:mt-2"
  return `<${tag} class="${listClass}">${items.map(t => t.raw).join("")}</${tag}>`
}

// List item
renderer.listitem = ({ tokens }) => {
  const text = tokens.map(t => t.raw).join("")
  return `<li>${text}</li>`
}

// Table
renderer.table = ({ header, rows }) => {
  const headers = header
    .map(h => `<th class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">${h}</th>`)
    .join("")
  const bodyRows = rows
    .map(
      row =>
        `<tr class="even:bg-muted m-0 border-t p-0">${row.map(cell => `<td class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">${cell}</td>`).join("")}</tr>`
    )
    .join("")
  return `<div class="my-6 w-full overflow-y-auto"><table class="w-full"><thead><tr>${headers}</tr></thead><tbody>${bodyRows}</tbody></table></div>`
}

// Inline code
renderer.codespan = ({ text }) => {
  return `<code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">${text}</code>`
}

// Export Markdown converter
export function MarkdownToHtml(md: string) {
  return marked(md, { renderer })
}
