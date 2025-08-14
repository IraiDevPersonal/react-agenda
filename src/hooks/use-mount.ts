import { useRef } from "react";

export function useMount(callback: () => void) {
  const isMounted = useRef(false);

  if (!isMounted.current) {
    callback();
    isMounted.current = true;
  }
}
