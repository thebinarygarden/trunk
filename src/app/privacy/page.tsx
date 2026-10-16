import type { Metadata } from 'next';
import Link from 'next/link';
import { IconArrow } from '@binarygarden/flora/icons';

export const metadata: Metadata = { title: 'privacy · binary garden' };

// Keep this in step with what src/lib/auth.ts actually stores and who it talks to.
export default function PrivacyPage() {
  return (
    <main className="legal">
      <Link href="/" className="auth-back">
        <IconArrow orientation="left" size={14} />
        back to binary garden
      </Link>
      <h1>privacy policy</h1>
      <p className="legal-updated">last updated october 16, 2026</p>

      <p>
        binary garden is a community that builds free, open source software. this
        page explains what binarygarden.com stores when you make an account, why,
        and who else sees it. the short version: only what sign-in needs, never
        sold, no ads, no tracking.
      </p>

      <h2>what we collect</h2>
      <ul>
        <li>
          <b>your account:</b> your email address and name, and your profile
          picture if you sign in with google, github or apple.
        </li>
        <li>
          <b>how you sign in:</b> a hashed password if you use one (we never see
          the password itself), the public half of any passkeys you add, and
          which google, github or apple account is linked.
        </li>
        <li>
          <b>your sessions:</b> while you&apos;re signed in, the ip address and
          browser that signed in, so you can stay signed in and so we can spot
          misuse.
        </li>
        <li>
          <b>apps you allow:</b> which apps you&apos;ve let use your binary garden
          account, and what you allowed each one to see.
        </li>
      </ul>

      <h2>google, github and apple sign-in</h2>
      <p>
        when you sign in with one of these, we receive only your name, email
        address and profile picture. we use them to create and identify your binary
        garden account and nothing else. we don&apos;t read your contacts, files or
        anything beyond that, and we don&apos;t pass this information to anyone
        except the apps you explicitly allow, as described below.
      </p>

      <h2>apps that use binary garden sign-in</h2>
      <p>
        other apps can offer &ldquo;sign in with binary garden&rdquo;. an app only
        gets your information after you approve it on a consent screen that lists
        exactly what it will see (for example your name and email). what that app
        does next is covered by its own privacy policy.
      </p>

      <h2>cookies and storage</h2>
      <p>
        we use one kind of cookie: the one that keeps you signed in. your
        light/dark preference is saved in your own browser. there are no
        analytics, advertising or tracking cookies.
      </p>

      <h2>who else handles your data</h2>
      <ul>
        <li>
          <b>google cloud</b> hosts the site and the database, in the united
          states.
        </li>
        <li>
          <b>resend</b> delivers our emails (verification and password reset), so
          it sees your email address.
        </li>
      </ul>
      <p>we never sell your data or share it with advertisers.</p>

      <h2>how long we keep it</h2>
      <p>
        your account information stays until you ask us to delete your account.
        sessions expire on their own, and verification and reset links stop
        working shortly after they&apos;re sent.
      </p>

      <h2>your choices</h2>
      <p>
        you can sign out and remove passkeys from your{' '}
        <Link href="/account">account page</Link>. to get a copy of your data or
        delete your account, contact us and we&apos;ll do it.
      </p>

      <h2>children</h2>
      <p>binary garden is not meant for children under 13.</p>

      <h2>changes</h2>
      <p>
        if this policy changes, we&apos;ll update this page and its date. for
        bigger changes we&apos;ll let account holders know by email.
      </p>

      <h2>contact</h2>
      <p>
        questions or requests: reach us through{' '}
        <a href="https://github.com/thebinarygarden">github.com/thebinarygarden</a>.
      </p>
    </main>
  );
}
