import { forbiddenWords } from "./japaneseWords";

export const filterProfanity = (text: string): boolean => {
  // 禁止ワードを含むかをチェック
  const regex = new RegExp(`(?:^|\\s|[.,;!?])(${forbiddenWords.join("|")})(?=\\s|$|[.,;!?])`, "i");
  return regex.test(text);
};
