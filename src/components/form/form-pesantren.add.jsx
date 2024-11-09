"use client";
import { useEffect, useState, useActionState } from "react";
import { SavePesantren } from "@/actions.other/pesantren-save";
import TextareaAutosize from "react-textarea-autosize";
import { APIDesa } from "@/actions.other/api-village";
import { z } from "zod";
const MAX_FILE_SIZE = 1024 * 1024 * 3;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schemaGambar = z
  .array(z.instanceof(File), {
    message: "Silahkan upload gambar kembali ",
  })
  .max(3, { message: "Maximal upload 3 gambar" })
  .min(1, { message: "miminal upload 1 gambar" })
  .refine(
    (files) =>
      files.every(
        (file) =>
          file.size <= MAX_FILE_SIZE &&
          ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      ),
    {
      message:
        "Format gambar harus .jpeg, .jpg, .png total ukuran gambar 3MB !",
    },
  );

const schemaPesantren = z.object({
  name: z.string().min(7, { message: "Nama harus terdiri minimal 7 karakter" }),
  profil: z
    .string()
    .min(20, { message: "Profil harus terdiri minimal 20 karakter" }),
  leader: z
    .string()
    .min(5, { message: "Pimpinan harus terdiri minimal 5 karakter" }),
  type: z.string().min(1, { message: "Type pesantren harus diisi!" }),
  methode: z
    .string()
    .min(10, { message: "Method harus terdiri minimal 10 karakter" }),
  facility: z
    .string()
    .min(5, { message: "Fasilitas harus terdiri minimal 5 karakter" }),
  address: z
    .string()
    .min(10, { message: "Alamat harus terdiri minimal 5 karakter" }),

  district: z.string().min(1, { message: "Kecamatan harus diisi!" }),
  pics: schemaGambar,
  village: z.string().min(1, { message: "Desa harus diisi!" }),
  siteLink: z.string(),
  contactEmail: z.string().email({ message: "format email tidak valid!" }),
  contactPhone: z
    .string()
    .min(9, { message: "Phone harus terdiri minimal 8 digit" }),
  mapLink: z.string().min(1, { message: "Maplink harus diisi!" }),
});

export const FormAddPesantren = ({ kecamatan }) => {
  const [desa, setDesa] = useState([]); //default
  const [errors, setErrors] = useState([]);

  const [state, formAction, isPending] = useActionState(SavePesantren, null);

  useEffect(() => {
    let desaSort = desa.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    setDesa(desaSort);
  }, [desa]);

  async function handleKecID(e) {
    const kecID = e.target.value;
    const dataDesa = await APIDesa(kecID);
    setDesa(dataDesa);
  }
  //sort alpabeth kecamatan dari APi
  let kecamatanSort = kecamatan.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  async function validasiData(formData) {
    const isValidPesantren = schemaPesantren.safeParse(
      Object.fromEntries(formData.entries()),
    );

    if (!isValidPesantren.success) {
      setErrors(isValidPesantren.error.flatten().fieldErrors);
    }

    await formAction(formData);
  }

  // sort alpabeth desa dari APi

  return (
    <form
      action={validasiData}
      className="flex w-full flex-wrap rounded-lg bg-sky-50 px-8 py-5 text-base font-normal text-sky-400"
    >
      <div className="basis-1/2 space-y-2 px-2">
        <div>
          <label htmlFor="">Nama Pesantren</label>
          <input
            type="text"
            name="name"
            placeholder="Input nama"
            className="input-small"
          />
          {errors?.name && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="" className="block">
            Profil
          </label>
          <TextareaAutosize
            name="profil"
            placeholder="Input profil"
            className="w-full rounded-lg border border-twBlue px-3 py-1 placeholder:text-sm placeholder:font-extralight placeholder:text-slate-300 focus:border-2 focus:border-sky-300 focus:outline-none"
          />
          {errors?.profil && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.profil}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="">Pimpinan pesantren</label>
          <input
            type="text"
            name="leader"
            placeholder="Input nama pimpinan"
            className="input-small"
          />
          {errors?.leader && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.leader}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="" className="block">
            Type
          </label>
          <select
            name="type"
            className="w-full rounded-lg border border-twBlue px-3 py-1 placeholder:text-sm placeholder:font-extralight placeholder:text-slate-300 focus:border-2 focus:border-sky-300 focus:outline-none"
          >
            <option disabled>Pilih Type pesantren</option>
            <option value="Tradisional">Pesantren Tradisional</option>
            <option value="Modern">Pesantren Modern</option>
            <option value="Semi Modern">Pesantren Semi Modern</option>
          </select>
          {errors?.type && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.type}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="" className="block">
            Methode belajar
          </label>
          <TextareaAutosize
            name="methode"
            placeholder="Input methode belajar"
            className="w-full rounded-lg border border-twBlue px-3 py-1 placeholder:text-sm placeholder:font-extralight placeholder:text-slate-300 focus:border-2 focus:border-sky-300 focus:outline-none"
          />
          {errors?.methode && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.methode}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="">Input photo</label>
          <input
            type="file"
            name="pics"
            accept="image/png, image/jpeg, image/jpg"
            className="input-small"
            multiple
          />
          {errors?.pics && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.pics}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="" className="block">
            Fasilitas
          </label>
          <TextareaAutosize
            name="facility"
            placeholder="Input fasilitas pesantren"
            className="w-full rounded-lg border border-twBlue px-3 py-1 placeholder:text-sm placeholder:font-extralight placeholder:text-slate-300 focus:border-2 focus:border-sky-300 focus:outline-none"
          />
          {errors?.facility && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.facility}
            </p>
          )}
        </div>
      </div>
      <div className="basis-1/2 space-y-2 px-2">
        <div>
          <label htmlFor="" className="block">
            Alamat
          </label>
          <TextareaAutosize
            name="address"
            placeholder="Input alamat"
            className="w-full rounded-lg border border-twBlue px-3 py-1 placeholder:text-sm placeholder:font-extralight placeholder:text-slate-300 focus:border-2 focus:border-sky-300 focus:outline-none"
          />
          {errors?.address && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.address}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="" className="block">
            Kecamatan
          </label>
          <select
            name="district"
            onChange={handleKecID}
            className="w-full rounded-lg border border-twBlue px-3 py-1 placeholder:text-sm placeholder:font-extralight placeholder:text-slate-300 focus:border-2 focus:border-sky-300 focus:outline-none"
          >
            <option disabled>Pilih kecamatan...</option>
            {/* <option value="modern">Kecamatan Maleber </option> */}

            {kecamatanSort.map((kc) => (
              <option value={kc.id} key={kc.id}>
                {kc.name}
              </option>
            ))}
          </select>
          {errors?.district && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.district}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="" className="block">
            Desa
          </label>
          <select
            name="village"
            className="w-full rounded-lg border border-twBlue px-3 py-1 placeholder:text-sm placeholder:font-extralight placeholder:text-slate-300 focus:border-2 focus:border-sky-300 focus:outline-none"
          >
            <option value="volvo" disabled>
              Pilih desa...
            </option>
            {/* <option value="modern">Desa Maleber </option> */}
            {desa.map((ds) => (
              <option value={ds.id} key={ds.id}>
                {ds.name}
              </option>
            ))}
          </select>
          {errors?.village && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.village}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="">Website Link</label>
          <input
            type="text"
            name="siteLink"
            placeholder="Input website "
            className="input-small"
          />
          {errors?.siteLink && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.siteLink}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="">Map address Link</label>
          <input
            type="text"
            name="mapLink"
            placeholder="Input map address"
            className="input-small"
          />
          {errors?.mapLink && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.mapLink}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="">Contact email</label>
          <input
            type="text"
            name="contactEmail"
            placeholder="Input contact email"
            className="input-small"
          />
          {errors?.contactEmail && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.contactEmail}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="">Contact phone</label>
          <input
            type="text"
            name="contactPhone"
            placeholder="Input contact phone"
            className="input-small"
          />
          {errors?.contactPhone && (
            <p className="-mt-0 text-center text-xs font-light text-red-500">
              {errors.contactPhone}
            </p>
          )}
        </div>
        <div>
          <button>Save</button>
        </div>
      </div>
    </form>
  );
};
