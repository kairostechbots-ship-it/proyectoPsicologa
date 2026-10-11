import { afterEach, describe, expect, it, vi } from 'vitest';
import { requestIdentifier } from '../lib/rate-limit';

afterEach(() => vi.unstubAllEnvs());

function request(headers: Record<string, string>) {
  return new Request('https://example.test/api/questions', { headers });
}

describe('request identifiers across hosting providers', () => {
  it('uses distinct Cloudflare client addresses when configured for Workers', () => {
    vi.stubEnv('VERCEL', '');
    vi.stubEnv('DEPLOY_PLATFORM', 'cloudflare');
    expect(requestIdentifier(request({ 'cf-connecting-ip': '192.0.2.1' }))).toBe('192.0.2.1');
    expect(requestIdentifier(request({ 'cf-connecting-ip': '192.0.2.2' }))).toBe('192.0.2.2');
  });

  it('does not trust Cloudflare headers in an unconfigured environment', () => {
    vi.stubEnv('VERCEL', '');
    vi.stubEnv('DEPLOY_PLATFORM', '');
    expect(requestIdentifier(request({ 'cf-connecting-ip': '192.0.2.1' }))).toBe('local');
  });

  it('preserves the Vercel identifier when both providers are flagged', () => {
    vi.stubEnv('VERCEL', '1');
    vi.stubEnv('DEPLOY_PLATFORM', 'cloudflare');
    expect(requestIdentifier(request({ 'x-vercel-forwarded-for': '192.0.2.3, 192.0.2.4', 'cf-connecting-ip': '192.0.2.1' }))).toBe('192.0.2.3');
  });

  it('uses a conservative fallback when Cloudflare omits the address', () => {
    vi.stubEnv('VERCEL', '');
    vi.stubEnv('DEPLOY_PLATFORM', 'cloudflare');
    expect(requestIdentifier(request({}))).toBe('unknown');
  });
});
