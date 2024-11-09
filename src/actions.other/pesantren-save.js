"use server";

export async function SavePesantren(_state, formData) {
  const pics = formData.getAll("pics");

  // Parsing JSON menjadi array objek
  //   const files = JSON.parse(jsonFormat);

  console.log(pics);
}
