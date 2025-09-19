"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { PaginationInfo } from "@/types/pokemon";
import Link from "next/link";

interface PaginationProps {
  pagination: PaginationInfo;
}

export default function Pagination({ pagination }: PaginationProps) {
  const searchParams = useSearchParams();

  const getUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", page.toString());
      }

      const queryString = params.toString();
      const url = queryString ? `/?${queryString}` : "/";
      return url;
    },
    [searchParams]
  );

  const currentPage = pagination.currentPage;
  const hasPrevious = pagination.hasPrevious;
  const hasNext = pagination.hasNext;

  return (
    <div className="flex justify-center gap-4 py-4">
      {hasPrevious && (
        <Link
          className="rounded bg-blue-500 px-4 py-2 text-white"
          href={getUrl(currentPage - 1)}
        >
          Previous
        </Link>
      )}
      {hasNext && (
        <Link
          className="rounded bg-blue-500 px-4 py-2 text-white"
          href={getUrl(currentPage + 1)}
        >
          Next
        </Link>
      )}
    </div>
  );
}
