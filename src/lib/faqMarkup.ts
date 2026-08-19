export function stripFaqMarkup(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, "$1");
}
