export class Sanitizer {
  static sanitizeCot(raw: string): string {
    let sanitized = raw.replace(/(?i)(password|secret|key)[\s=:]*["'][^"']+["']/gi, '$1="[REDACTED]"');
    sanitized = sanitized.replace(/AKIA[0-9A-Z]{16}/g, '[REDACTED_API_KEY]');
    return sanitized;
  }
}
