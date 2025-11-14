import { FormEvent, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type AdminSignInProps = {
  onAuthenticate: (username: string, password: string) => boolean;
};

const LABEL_CLASSES = "text-xs font-semibold uppercase tracking-[0.28em] text-blue-600";
const INPUT_CLASSES =
  "w-full rounded-2xl border border-blue-100 bg-white/80 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

export function AdminSignIn({ onAuthenticate }: AdminSignInProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDisabled = useMemo(() => isSubmitting || !username.trim() || !password, [isSubmitting, password, username]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled) {
      return;
    }

    setIsSubmitting(true);
    const success = onAuthenticate(username.trim(), password);

    if (!success) {
      setError("Incorrect username or password. Please try again.");
      setIsSubmitting(false);
      return;
    }

    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/40 to-white">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg rounded-3xl border border-blue-100 bg-white/95 p-10 shadow-xl">
          <div className="space-y-3 text-center">
            <p className={LABEL_CLASSES}>Restricted access</p>
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Sign in to view the horizons
            </h1>
            <p className="text-sm text-slate-600">
              Enter the administrator credentials to explore the UK Sport · Kyndryl Performance Hub experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="space-y-2">
              <label htmlFor="admin-username" className={LABEL_CLASSES}>
                Username
              </label>
              <input
                id="admin-username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className={INPUT_CLASSES}
                placeholder="Enter admin username"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-password" className={LABEL_CLASSES}>
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={INPUT_CLASSES}
                placeholder="Enter admin password"
              />
            </div>

            {error ? (
              <p className="rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className={cn(
                "w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2",
                isDisabled ? "cursor-not-allowed opacity-70" : "hover:bg-primary/90",
              )}
              disabled={isDisabled}
            >
              {isSubmitting ? "Verifying…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
