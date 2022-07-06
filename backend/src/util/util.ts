export const sleep = (s: number) => new Promise((r) => setTimeout(r, s));

export function time_stamp() {
  const t = new Date();
  return `>> ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
}
