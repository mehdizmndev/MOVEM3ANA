import React from 'react';

export default function TermsPage() {
  return (
    <main className="pb-16 px-8 max-w-4xl mx-auto pt-12">
      <header className="mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter font-headline uppercase leading-none mb-4">Terms of Service</h1>
        <p className="text-stone-500 font-body">Last updated: May 2026</p>
      </header>

      <div className="space-y-8 text-on-surface dark:text-stone-300 font-body leading-relaxed">
        <section className="bg-surface-container-low dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm">
          <h2 className="text-2xl font-black italic tracking-tighter font-headline uppercase mb-4 text-primary-container">1. Acceptance of Terms</h2>
          <p>
            By accessing or using MOVEM3ANA, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
          </p>
        </section>

        <section className="bg-surface-container-low dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm">
          <h2 className="text-2xl font-black italic tracking-tighter font-headline uppercase mb-4 text-primary-container">2. User Accounts</h2>
          <p className="mb-4">
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
          </p>
        </section>

        <section className="bg-surface-container-low dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm">
          <h2 className="text-2xl font-black italic tracking-tighter font-headline uppercase mb-4 text-primary-container">3. Club Owners & Events</h2>
          <p className="mb-4">
            If you register as a Club Owner, you are responsible for the accuracy of the information provided about your club, events, and activities. MOVEM3ANA reserves the right to suspend or remove any club listing that violates our community guidelines.
          </p>
          <p>
            Payments and subscriptions processed through the platform are subject to our refund policy, which requires cancellation at least 48 hours before an event.
          </p>
        </section>

        <section className="bg-surface-container-low dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm">
          <h2 className="text-2xl font-black italic tracking-tighter font-headline uppercase mb-4 text-primary-container">4. Privacy Policy</h2>
          <p className="mb-4">
            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-stone-500 dark:text-stone-400">
            <li>We collect your name, email, and phone number solely for account management.</li>
            <li>We do not sell your personal data to third parties.</li>
            <li>Your passwords are securely hashed and cannot be read by our team.</li>
          </ul>
        </section>

        <section className="bg-surface-container-low dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-sm">
          <h2 className="text-2xl font-black italic tracking-tighter font-headline uppercase mb-4 text-primary-container">5. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
          </p>
        </section>

      </div>
    </main>
  );
}
