import { ContactForm } from "@/components/ContactForm"

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-2xl mx-auto">
      {/* Hero */}
      <section className="mb-24">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Hi, I&apos;m Jane Smith
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed">
          I build thoughtful web experiences with a focus on simplicity and
          craft. Currently open to new opportunities.
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight mb-1">
          Get in touch
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
          Have a project in mind? Drop me a message and I&apos;ll get back to you.
        </p>
        <ContactForm />
      </section>
    </main>
  )
}
