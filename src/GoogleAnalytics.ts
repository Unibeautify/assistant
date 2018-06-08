const gtag: Function = (window as any).gtag;

export function trackEvent(event: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}): void {
  gtag("event", event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  });
}

export function trackPromise(event: {
  name: string;
  category?: string;
  label?: string;
}) {
  return (promise: Promise<any>) => {
    const before = nowMilliseconds();
    return promise
      .then(results => {
        const after = nowMilliseconds();
        const diff = after - before;
        trackTimingComplete({
          ...event,
          value: diff,
        });
        return results;
      })
      .catch((error: Error) => {
        trackError({ error });
        return Promise.reject(error);
      });
  };
}

export function trackTimingComplete(event: {
  name: string;
  value: number;
  category?: string;
  label?: string;
}) {
  gtag("event", "timing_complete", {
    name: event.name,
    value: event.value,
    event_category: event.category,
    event_label: event.label,
  });
}

export function trackError({
  error,
  fatal = false,
}: {
  error: Error;
  fatal?: boolean;
}) {
  const description = error.message;
  gtag("event", "exception", {
    description,
    fatal,
  });
}

function nowMilliseconds(): number {
  // Feature detects Navigation Timing API support.
  if (window.performance) {
    // Gets the number of milliseconds since page load
    // (and rounds the result since the value must be an integer).
    return Math.round(performance.now());
  }
  return Date.now();
}
