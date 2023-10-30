export default function hash(s: string) {
  //set variable hash as 0
  let hash = 0;

  // if the length of the string is 0, return 0
  if (s.length == 0) return hash;

  for (const ch of s) {
    hash = (hash << 5) - hash + ch.charCodeAt(0);
    hash = hash & hash;
  }
  return hash;
}
