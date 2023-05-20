import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type UseQueryParamsProps<T> = {
  key: string;
  initialValue?: T;
  transformer?: (value?: string) => T;
  resetOn?: T;
};

export function useQueryParams<T>({
  key,
  initialValue,
  transformer = (unit) => unit as T,
  resetOn,
}: UseQueryParamsProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamElement = useMemo(() => {
    const queryElement = searchParams.get(key);
    if (queryElement) {
      return transformer(queryElement);
    }
    return initialValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const [value, setValue] = useState(searchParamElement);

  useEffect(() => {
    if (searchParamElement === resetOn) {
      setSearchParams((query) => {
        query.delete(key);
        return query;
      });
    }
    setValue(searchParamElement);
  }, [searchParamElement]);

  function setValueWithQueryParams(newValue: string) {
    setValue(transformer(newValue));

    setSearchParams((query) => {
      if (resetOn === transformer(newValue)) {
        console.log(`removing ${key}`);
        query.delete(key);
        return query;
      }
      if (query.has(key)) {
        console.log(`update ${key}`);

        query.set(key, newValue);
      } else {
        console.log(`adding ${key}`);
        query.append(key, newValue);
      }
      console.log({ resetOn, newValue, transformed: transformer(newValue) });
      return query;
    });
  }
  return [value as T, setValueWithQueryParams] as const;
}