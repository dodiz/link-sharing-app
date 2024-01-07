import { Typography } from "@/ui/Typography";
import { Customize } from "../../components/Customize";

export default function Page() {
  return (
    <>
      <Typography variant="heading-m">Customize your links</Typography>
      <Typography variant="body-m" className="text-secondary-400">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </Typography>
      <Customize />
    </>
  );
}
