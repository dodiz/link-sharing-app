import { Typography } from "@/ui/Typography";
import { Preview } from "./_components/Preview";

export default function Home() {
  return (
    <div className="flex gap-4">
      <Preview />
      <div className="flex-1 p-10 rounded-md bg-secondary-100">
        <Typography variant="heading-m">Customize your links</Typography>
        <Typography variant="body-m" className="text-secondary-400">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </Typography>
      </div>
    </div>
  );
}
