export async function APIKecamatan() {
  try {
    const req = await fetch(
      "https://oeangg.github.io/api-wilayah-indonesia/api/districts/3208.json",
    );
    const data = req.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
