export const redirectTo = (path: string) => {
    const event = new CustomEvent('navigate', { detail: { path } });
    window.dispatchEvent(event);
  };