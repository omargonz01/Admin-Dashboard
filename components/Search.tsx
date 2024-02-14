"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { SearchIcon } from "lucide-react";

type Props = {
  query?: string;
};

export default function Search({ query }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleSearch(value: string) {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="relative mt-5 max-w-md">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="mr-3 h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          name="search"
          autoComplete="off"
          id="search"
          className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search by name..."
          onChange={(event) => handleSearch(event.target.value)}
          defaultValue={query}
        />
      </div>
    </div>
  );
}
