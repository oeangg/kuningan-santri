import { FormAddPesantren } from "@/components/form/form-pesantren.add";
import { APIKecamatan } from "@/actions.other/api-district";

export default async function Page() {
  const kecamatan = await APIKecamatan();

  return (
    <div className="mx-auto mt-24 max-w-4xl">
      <h1 className="text-xl font-medium uppercase text-sky-600">
        Input data Pesantren
      </h1>
      <FormAddPesantren kecamatan={kecamatan} />
    </div>
  );
}
