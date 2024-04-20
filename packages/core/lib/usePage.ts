import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function usePage() {
  const searchParams = new URLSearchParams(useSearchParams());
  const pathname = usePathname();
  const router = useRouter();
  const page = searchParams.get("page");
  useEffect(() => {
    if (!page) searchParams.set("page", "1");
    router.replace(`${pathname}?${searchParams.toString()}`);
  }, []);
  // if (!page) router.replace(`${pathname}?${searchParams.toString()}`);
  return Number(page ?? 1)
}
