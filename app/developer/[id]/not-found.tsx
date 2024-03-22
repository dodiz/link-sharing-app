import { Button, Typography } from "@/ui";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="md:h-[35rem] md:rounded-b-3xl md:bg-primary-300 md:p-6" />
      <div className="w-full bg-secondary-100 px-14 py-12 md:mx-auto md:w-[35rem] md:-translate-y-1/2 md:rounded-md">
        <Typography variant="heading-m" className="text-secondary-500">
          Dev not found
        </Typography>
        <Button as={Link} href="/" className="mt-4">
          Back home
        </Button>
      </div>
    </>
  );
}
