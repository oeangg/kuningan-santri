export async function APIDesa(kecamatanID) {
  try {
    const req = await fetch(
      `https://oeangg.github.io/api-wilayah-indonesia/api/villages/${kecamatanID}.json`,
    );

    const data = req.json();
    // revalidatePath("/pesantren/add");

    return data;
  } catch (error) {
    console.log(error);
  }
}
