import type { Metadata } from 'next';
import Link from 'next/link';
import { IconArrow } from '@binarygarden/flora/icons';

export const metadata: Metadata = { title: 'terms · binary garden' };

export default function TermsPage() {
  return (
    <main className="legal">
      <Link href="/" className="auth-back">
        <IconArrow orientation="left" size={14} />
        back to binary garden
      </Link>
      <h1>terms of service</h1>
      <p className="legal-updated">last updated october 17, 2026</p>

      <p>
        these terms cover your use of binarygarden.com and your binary garden
        account. by making an account or signing in, you agree to them.
      </p>

      <h2>what binary garden is</h2>
      <p>
        binary garden is a community that builds free, open source software. a
        binary garden account lets you sign in to binary garden products, and to
        other apps that offer &ldquo;sign in with binary garden&rdquo;.
      </p>

      <h2>your account</h2>
      <ul>
        <li>give us a real email address you can receive mail at.</li>
        <li>
          keep your password and passkeys safe. you&apos;re responsible for what
          happens under your account.
        </li>
        <li>one person per account. don&apos;t share it.</li>
      </ul>

      <h2>acceptable use</h2>
      <p>don&apos;t use binary garden to:</p>
      <ul>
        <li>break the law or harm other people;</li>
        <li>
          get into accounts or systems that aren&apos;t yours, or test our
          security without asking us first;
        </li>
        <li>overload the service, or create accounts in bulk or by automation;</li>
        <li>pretend to be someone else.</li>
      </ul>
      <p>we may suspend or close accounts that do.</p>

      <h2>apps that use binary garden sign-in</h2>
      <p>
        when you allow another app to use your binary garden account, your use of
        that app is between you and whoever runs it. their terms and privacy
        policy apply to it, not these.
      </p>

      <h2>open source</h2>
      <p>
        our code is open source and published on{' '}
        <a href="https://github.com/thebinarygarden">github</a>. each project&apos;s
        license covers the code itself; current projects use the agpl-3.0. these
        terms cover the hosted service at binarygarden.com.
      </p>

      <h2>no warranty</h2>
      <p>
        binary garden is free and provided &ldquo;as is&rdquo;, without
        warranties of any kind. we work to keep it running and your data safe,
        but we can&apos;t promise it will always be available or free of errors.
        to the extent the law allows, binary garden and its contributors
        aren&apos;t liable for losses from using it or not being able to.
      </p>

      <h2>ending things</h2>
      <p>
        you can stop using binary garden at any time and ask us to delete your
        account (see the <Link href="/privacy">privacy policy</Link>). we may
        change or stop the service; if we shut it down, we&apos;ll tell account
        holders ahead of time.
      </p>

      <h2>changes</h2>
      <p>
        if these terms change, we&apos;ll update this page and its date. for
        bigger changes we&apos;ll let account holders know by email.
      </p>

      <h2>contact</h2>
      <p>
        questions: reach us through{' '}
        <a href="https://github.com/thebinarygarden">github.com/thebinarygarden</a>.
      </p>
    </main>
  );
}
