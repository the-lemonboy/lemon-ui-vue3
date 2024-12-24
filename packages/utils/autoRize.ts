export const observerDomResize = function(dom: HTMLElement, callback: MutationCallback): MutationObserver {
  const observer = new MutationObserver(callback);

  observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true });

  return observer;
}