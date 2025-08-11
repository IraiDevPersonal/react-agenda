import { useEffect, useState } from "react";

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

type Props = {
  withState?: boolean;
  clearCopyDelay?: number;
};

export function useClipboard(props?: Props): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  useEffect(() => {
    let timer: undefined | NodeJS.Timeout;

    if (props?.clearCopyDelay) {
      timer = setInterval(() => {
        setCopiedText(null);
      }, props.clearCopyDelay);
    }

    return () => clearInterval(timer);
  }, [copiedText, props?.clearCopyDelay]);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      props?.withState && setCopiedText(text);
      return true;
    }
    catch (error) {
      console.error("Copy failed", error);
      props?.withState && setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy] as const;
}
