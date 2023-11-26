import { Typography } from "@/ui/Typography";

export default function Home() {
  return (
    <div className="flex gap-4">
      <div>
        <svg
          width="308"
          height="632"
          viewBox="0 0 308 632"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z"
            stroke="#737373"
          />
          <path
            d="M12 55.5C12 30.9233 31.9233 11 56.5 11H80.5C86.8513 11 92 16.1487 92 22.5C92 30.5081 98.4919 37 106.5 37H201.5C209.508 37 216 30.5081 216 22.5C216 16.1487 221.149 11 227.5 11H251.5C276.077 11 296 30.9233 296 55.5V576.5C296 601.077 276.077 621 251.5 621H56.5C31.9233 621 12 601.077 12 576.5V55.5Z"
            fill="white"
            stroke="#737373"
          />
          <circle cx="153.5" cy="112" r="48" fill="#EEEEEE" />
          <rect
            x="73.5"
            y="185"
            width="160"
            height="16"
            rx="8"
            fill="#EEEEEE"
          />
          <rect x="117.5" y="214" width="72" height="8" rx="4" fill="#EEEEEE" />
          <rect x="35" y="278" width="237" height="44" rx="8" fill="#EEEEEE" />
          <rect x="35" y="342" width="237" height="44" rx="8" fill="#EEEEEE" />
          <rect x="35" y="406" width="237" height="44" rx="8" fill="#EEEEEE" />
          <rect x="35" y="470" width="237" height="44" rx="8" fill="#EEEEEE" />
          <rect x="35" y="534" width="237" height="44" rx="8" fill="#EEEEEE" />
        </svg>
      </div>
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
