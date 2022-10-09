const loadSurah = () => {
  const url = "http://api.alquran.cloud/v1/surah";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySurahInCard(data.data));
};
const displaySurahInCard = (surahList) => {
  const surahCardSection = document.getElementById("surahCardSection");
  surahList.forEach((surah) => {
    const surahCard = document.createElement("div");
    surahCard.classList.add(
      "surahCard",
      "bg-white",
      "rounded-2xl",
      "p-10",
      "w-8/12",
      "mx-auto",
      "my-5"
    );
    surahCard.innerHTML = `
            <label for="surahDetailsModal"
            onclick="loadSurahAyats('${surah.number}')"
            <div class="flex justify-between items-center cursor-pointer">
            <div class="cardLeft font-bold flex items-center">
              <p
                class="text-xl bg-gray-200 rounded-full w-10 h-10 text-center flex flex-col justify-center items-center text-gray-700"
              >
                ${surah.number}
              </p>
              <div class="ml-5 flex flex-col">
                <h3 class="text-2xl text-green-500">${surah.englishName} <span class="text-black font-normal">(${surah.englishNameTranslation})</span></h3>
                <p>Ayah: ${surah.numberOfAyahs}, ${surah.revelationType}</p>
              </div>
            </div>
            <div>
              <h3 class="text-4xl">${surah.name}</h3>
            </div>
            </div>
              </label>
    `;
    surahCardSection.appendChild(surahCard);
  });
};

const loadSurahAyats = (surahNumber) => {
  const url = `https://api.alquran.cloud/v1/surah/${surahNumber}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayArabicAyats(data.data));
};

const displayArabicAyats = (ayatsInArabic) => {
  const {
    ayahs,
    englishName,
    englishNameTranslation,
    numberOfAyahs,
    revelationType,
  } = ayatsInArabic;
  const ayatCardHeaderContainer = document.getElementById("ayatCard");
  ayatCardHeaderContainer.innerHTML = "";
  const ayatCardHeader = document.createElement("div");
  ayatCardHeader.innerHTML = `
  <h3 class="font-bold text-5xl py-10">
    ${englishName}
  </h3>
  <div class="my-4 card w-full bg-white text-black">
  <div class="flex items-center justify-between px-60">
    <div>
      <img class="w-10/12" src=${
        revelationType === "Meccan" ? "images/macca.png" : "images/madina.png"
      } alt="">
    </div>
    <div class="text-left">
      <h3 class="text-4xl font-bold text-green-500">${englishName}</h3>
      <p class="text-gray-400">${englishNameTranslation}</p>
      <p class="text-gray-400">Ayah: ${numberOfAyahs}</p>
      <p class="text-gray-400">Nazil: ${revelationType}</p>
    </div>
  </div>
  <div>
    <h2 class="text-6xl py-10">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ</h2>
  </div>
</div>
  `;
  ayatCardHeaderContainer.appendChild(ayatCardHeader);
  ayahs.forEach((ayat) => {
    const { numberInSurah, text } = ayat;
    const ayatsCardBody = document.createElement("div");
    ayatsCardBody.classList.add(
      "my-4",
      "card",
      "w-full",
      "bg-white",
      "text-black"
    );
    ayatsCardBody.innerHTML = `
  <div class="my-4 mb-10 w-full mx-auto bg-white text-black">
    <div class="flex justify-between items-center px-20 py-10">
      <h4 class="text-3xl bg-gray-300 w-16 h-16 flex flex-col justify-center items-center rounded-full">${numberInSurah}</h4>
      <p class="cursor-pointer text-2xl"><i class="fa-solid fa-ellipsis"></i></p>
    </div>
    <h2 class="text-6xl text-right p-16">${text}</h2>
  </div>
    `;
    ayatCardHeaderContainer.appendChild(ayatsCardBody);
  });
};
/* const loadBanglaAyahs = async (banglaSurahNumber) => {
  const url = `https://api.alquran.cloud/v1/surah/${banglaSurahNumber}/bn.bengali`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySurahAyats(data));
};
 */
loadSurah();
// loadBanglaAyahs(1);
