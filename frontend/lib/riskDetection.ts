export const riskKeywords = [
  "otp",
  "bank",
  "account",
  "password",
  "verify",
  "transfer",
  "payment",
  "urgent",
];

export function isRiskText(text: string): boolean {
  const lower = text.toLowerCase();

  return riskKeywords.some(keyword =>
    lower.includes(keyword)
  );
}