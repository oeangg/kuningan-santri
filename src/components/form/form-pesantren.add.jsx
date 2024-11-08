"use client";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { APIDesa } from "@/actions.other/api-village";

export const FormAddPesantren = ({ kecamatan }) => {
  const [desa, setDesa] = useState([]); //default

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

  // sort alpabeth desa dari APi

  return (
    <form
      action=""
      className="flex w-full flex-wrap rounded-xl bg-sky-100 px-8 py-5 text-base font-normal text-sky-500"
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
        </div>
        <div>
          <label htmlFor="">Pimpinan pesantren</label>
          <input
            type="text"
            name="leader"
            placeholder="Input nama pimpinan"
            className="input-small"
          />
        </div>
        <div>
          <label htmlFor="" className="block">
            Type
          </label>
          <select
            name="type"
            className="w-full rounded-lg border border-twBlue px-3 py-1 placeholder:text-sm placeholder:font-extralight placeholder:text-slate-300 focus:border-2 focus:border-sky-300 focus:outline-none"
          >
            <option value="volvo" disabled>
              Pilih Type pesantren
            </option>
            <option value="modern">Pesantren Tradisional</option>
            <option value="saab">Pesantren Modern</option>
            <option value="mercedes">Pesantren Semi Modern</option>
          </select>
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
        </div>
        <div>
          <label htmlFor="">Input photo</label>
          <input
            type="file"
            name="pics"
            placeholder="Input file photo"
            className="input-small"
            multiple
          />
        </div>
        <div>
          <label htmlFor="" className="block">
            Fasilitas
          </label>
          <TextareaAutosize
            name="fasilitas"
            placeholder="Input fasilitas pesantren"
            className="w-full rounded-lg border border-twBlue px-3 py-1 placeholder:text-sm placeholder:font-extralight placeholder:text-slate-300 focus:border-2 focus:border-sky-300 focus:outline-none"
          />
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
        </div>
        <div>
          <label htmlFor="">Website Link</label>
          <input
            type="text"
            name="siteLink"
            placeholder="Input website "
            className="input-small"
          />
        </div>
        <div>
          <label htmlFor="">Map address Link</label>
          <input
            type="text"
            name="mapLink"
            placeholder="Input map address"
            className="input-small"
          />
        </div>
        <div>
          <label htmlFor="">Contact email</label>
          <input
            type="text"
            name="contactEmail"
            placeholder="Input contact email"
            className="input-small"
          />
        </div>
        <div>
          <label htmlFor="">Contact phone</label>
          <input
            type="text"
            name="contactPhone"
            placeholder="Input contact phone"
            className="input-small"
          />
        </div>
        <div>
          <button>Save</button>
        </div>
      </div>
    </form>
  );
};
