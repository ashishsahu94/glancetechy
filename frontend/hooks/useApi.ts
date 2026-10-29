"use client";
// hooks/useApi.ts - loads data from a public GET endpoint
import { useCallback, useEffect, useState } from "react";
import { apiGet, asList } from "@/lib/api";

type State<T> = { path: string; data: T | null; error: string };

function useFetch<T>(path: string, map: (raw: unknown) => T) {
  const [state, setState] = useState<State<T>>({ path: "", data: null, error: "" });
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let alive = true;
    apiGet<unknown>(path)
      .then((raw) => alive && setState({ path, data: map(raw), error: "" }))
      .catch(
        (e) =>
          alive &&
          setState({
            path,
            data: null,
            error: e instanceof Error ? e.message : "Could not load data.",
          })
      );
    return () => {
      alive = false;
    };
    // `map` is a stable module-level function at every call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);
  const settled = state.path === path;

  return {
    data: settled ? state.data : null,
    error: settled ? state.error : "",
    loading: !settled,
    reload,
  };
}

const identity = (raw: unknown) => raw;

/** Raw JSON response. */
export const useApi = <T,>(path: string) => useFetch<T>(path, identity as (r: unknown) => T);

/** Always returns an array, whatever list shape the API answers with. */
export const useApiList = <T,>(path: string) => useFetch<T[]>(path, asList<T>);
