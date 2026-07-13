import { permanentRedirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Jak przebiega konsultacja i jak się przygotować",
  description:
    "Praktyczne informacje o przebiegu stacjonarnej konsultacji lekarskiej i przygotowaniu do wizyty.",
  path: "/jak-wyglada-wizyta",
  indexable: false,
});

export default function PatientInfoPage() {
  permanentRedirect("/jak-wyglada-wizyta");
}
