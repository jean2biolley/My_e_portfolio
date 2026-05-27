"use client"
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_KEY || '');

  if (state.succeeded) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8 bg-white/5 rounded-sm border border-white/10 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-accent mb-4 ring-8 ring-accent/10 shadow-inner">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h4 className="text-2xl font-serif text-white">Message Received</h4>
        <p className="text-white/60 text-sm">Thank you for reaching out. I will review your message and reply promptly.</p>
        <button onClick={() => window.location.reload()} className="mt-6 text-sm underline text-white/40 hover:text-white transition-colors">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6 pb-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs uppercase tracking-widest text-white/50 block font-medium">Full Name</label>
          <input
            id="name" name="name" type="text" required
            className="w-full bg-white/5 border-b border-white/20 px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors focus:bg-white/10"
            placeholder="John Doe"
          />
          <ValidationError field="name" prefix="Name" errors={state.errors} />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/50 block font-medium">Email Address</label>
          <input
            id="email" name="email" type="email" required
            className="w-full bg-transparent border-b border-white/20 px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors focus:bg-white/10"
            placeholder="john@firm.com"
          />
          <ValidationError field="email" prefix="Email" errors={state.errors} />
        </div>
      </div>
      <div className="space-y-2 pb-4">
        <label htmlFor="message" className="text-xs uppercase tracking-widest text-white/50 block font-medium">Inquiry / Message</label>
        <textarea
          id="message" name="message" required rows={4}
          className="w-full bg-transparent border-b border-white/20 px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors focus:bg-white/10 resize-none"
          placeholder="Discussing derivatives or open roles..."
        ></textarea>
        <ValidationError field="message" prefix="Message" errors={state.errors} />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full md:w-auto px-8 py-3 bg-accent text-white font-medium hover:bg-white hover:text-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md rounded-sm"
      >
        {state.submitting ? "Dispatching..." : "Dispatch Message"}
      </button>
      {state.errors && (
        <p className="text-red-400 text-sm mt-3 bg-red-950/20 p-3 rounded-sm">
          Please verify your submission.
        </p>
      )}
    </form>
  );
}
