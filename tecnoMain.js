/*
 * tecnoMain_updated.js
 *
 * Sizning yangi HTML tuzilmangizdagi kategoriya nomlari (Biznes Startup | Venchur, Fond, Marketing, ...) 
 * avvalgi namunaviy JS dagi ichki kalitlarga (wordpress, crm, developer, ...) mos kelishi uchun
 * quyidagi skript yangilandi.
 *
 * Asosiy o'zgarishlar:
 *  1. Kategoriya identifikatori matndan emas, <a href="#slug"> atributidan olinadi. Shuning uchun matn erkin bo'lishi mumkin.
 *  2. data obyektidagi kalitlar sizning href hash-laringizga mos: wordpress, crm, developer, innovation, mobile, cloud, ruby, other.
 *     (Agar kerak bo'lsa Technology/others uchun ham qo'shimcha yozildi.)
 *  3. "All", "Featured" va h.k. filter tugmalar bosilganda kontentni o'zgartirmaslik yoki default holatni ko'rsatish uchun tekshiruv.
 *  4. Dastlabki DOM dagi ekspert kartalar holati saqlab olinadi (defaultData) — no category yoki mos kelmagan nomda shu qayta tiklanadi.
 *
 * Foydalanish: HTML faylingiz oxirida (tecnoMain.js dan keyin yoki uning o'rniga) shu faylni ulang.
 */

(function(){
  "use strict";

  /*----------------------------------\
   | 1. Dastlabki kartalar holatini saqlab olish
   |   (fallback uchun, masalan Filter->All bosilganda)
   \----------------------------------*/
  const getInitialCardsState = () => {
    const cards = document.querySelectorAll(".experts .expert");
    return Array.from(cards).map(card => {
      const imgEl = card.querySelector(".expert__img");
      const titleEl = card.querySelector(".expert__title");
      const descEl = card.querySelector(".expert__desc");
      const rateEl = card.querySelector(".expert__rate");
      return {
        img: imgEl ? imgEl.getAttribute("src") : "",
        title: titleEl ? titleEl.textContent.trim() : "",
        desc: descEl ? descEl.textContent.trim() : "",
        priceHTML: rateEl ? rateEl.innerHTML : ""
      };
    });
  };

  let defaultCardsState = null; // lazily init

  /*----------------------------------\
   | 2. Kategoriya ma'lumotlari
   |   Siz kerak bo'lsa rasmlar va narxlarni o'zgartiring.
   \----------------------------------*/
   const data = {
    // Biznes Startup | Venchur
    wordpress: [
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2Fa6961476-c5b3-4dcc-b249-a7d878545b64-d2.jpeg&w=3840&q=75",
        title: "Davron Parmonov",
        desc: "Biznes g‘oyalarni rivojlantirish va venchur fond topish bo‘yicha maslahat.",
        price: "$2.50"
      },
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2Fad096bf3-9378-4ecb-bbb2-3ad5b2274bf3-at.jpg&w=3840&q=75",
        title: "Alisher Tojiyev",
        desc: "Investorlar bilan ishlash va startaplar uchun strategiyalar.",
        price: "$3.10"
      }
    ],
  
    // Fond
    crm: [
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2F0f3c9274-edf1-4eed-b21f-c871edd6d2e2-ik.jpeg&w=3840&q=75",
        title: "Iskandar Qurbonov",
        desc: "Moliyaviy resurslarni jalb qilish bo‘yicha maslahatlar.",
        price: "$3.00"
      },
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2F53f812af-b08a-4fc2-99fb-ec561524ff6d-bb.jpeg&w=3840&q=75",
        title: "Bekhzod Botirov",
        desc: "Sarmoya loyihalarini tahlil qilish va tavsiyalar.",
        price: "$3.50"
      }
    ],
  
    // Marketing
    developer: [
      {
        img: "https://cdn.kwork.com/files/avatar/large/34/16781286-1.jpg",
        title: "Digital Marketing Expert",
        desc: "SEO, SMM va marketing kampaniyalari bo‘yicha yordam.",
        price: "$4.00"
      },
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2Fed6a0efe-5c6e-45ce-9d29-2026e718df3e-photo_2025-01-19_22-08-41.jpg&w=3840&q=75",
        title: "Sardor Babaev",
        desc: "Brendni rivojlantirish va mijozlarni jalb qilish bo‘yicha maslahat.",
        price: "$3.70"
      }
    ],
  
    // Savdo Moliya
    innovation: [
      {
        img: "https://cdn.kwork.com/files/avatar/large/22/26967-4.jpg",
        title: "Oybek Mavlonov",
        desc: "Sotuv bo'limini qurish va sotuv aperatorlarini tayyorlash bo'yicha maslahat.",
        price: "$3.75"
      },
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2F198d77fc-7084-4c03-830e-2c59ac95c64b-s.jpeg&w=3840&q=75",
        title: "Sarvar Zaynutdinov",
        desc: "Savdo strategiyalari va bozorni o‘rganish bo‘yicha maslahat.",
        price: "$3.90"
      }
    ],
  
    // Loyiha & Analitika
    mobile: [
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2F2efc1088-ef70-4a1e-9dce-42ad5aba3a58-IMG_7992.JPG&w=3840&q=75",
        title: "Hasan Mamasaidov",
        desc: "Loyihalarni boshqarish va samarali rejalashtirish.",
        price: "$3.20"
      },
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2F63b899e6-51aa-4b42-ab96-46347a029f76-1708701085195.jpeg&w=3840&q=75",
        title: "Otabek Sharapov",
        desc: "Analitika va ma’lumotlar asosida qarorlar qabul qilish.",
        price: "$3.60"
      }
    ],
  
    // Shaxsiy rivojlanish
    cloud: [
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2Facc4eed9-383b-482f-8247-8fdbc9bdf8fd-1629738208681.jpeg&w=1080&q=75",
        title: "Fahriddin Yusupov",
        desc: "Shaxsiy rivojlanish va liderlik bo‘yicha maslahat.",
        price: "$3.20"
      },
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2F7c831222-5aec-43de-82d3-065885093c92-1731783603228.jpeg&w=1080&q=75",
        title: "Omon Olimov",
        desc: "Motivatsiya va hayotiy maqsadlar bo‘yicha yo‘l-yo‘riq.",
        price: "$3.60"
      }
    ],
  
    // Sun'iy intellekt
    ruby: [
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2F3af49836-da29-4e95-ac1a-873b2517d5d7-1652262202898.jpg&w=1080&q=75",
        title: "Ikboljon Sobirov",
        desc: "Sun’iy intellekt va mashina o‘rganish bo‘yicha yechimlar.",
        price: "$2.80"
      },
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2F531d922a-775a-4ed9-8a16-95051af4ffab-max.jpeg&w=1080&q=75",
        title: "Makuhmudjon Sodikov",
        desc: "Mashina o‘rganish algoritmlarini ishlab chiqish.",
        price: "$3.40"
      }
    ],
  
    // Other
    other: [
      {
        img: "https://scontent.fbhk1-3.fna.fbcdn.net/v/t39.30808-6/518607287_1288152566037149_8112602558672517331_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=nq2FXwDEvzgQ7kNvwGa8fEC&_nc_oc=Adla4joHw1hBUiEUv_H89nWEmYk5X1Bm1SKWCikEy421uOmAUe3DMxL4t1_pk134zY5-WbuKrQyZ-i5s7NiIasxN&_nc_zt=23&_nc_ht=scontent.fbhk1-3.fna&_nc_gid=_oU278Sl3HtrSde2uTKH8w&oh=00_AfQNu9KWRyMjBWGVvShP1Aunk63tzSaxwXdkcIPUgoi9MA&oe=68828F7C",
        title: "Chingiz G'afforov",
        desc: "Frontend development",
        price: "$2.00"
      },
      {
        img: "https://connected.uz/_next/image?url=https%3A%2F%2Fconnecteduz.s3.eu-north-1.amazonaws.com%2Fedf636cf-55ad-47d7-b92e-a95389dd084c-1707680118772.jpeg&w=1080&q=75",
        title: "Abduqahhor Tashmuhammedov",
        desc: "Texnik muammolarni tezkor hal qilish.",
        price: "$2.50"
      }
    ]
  };
  

  /*----------------------------------\
   | 3. Util: elementdan kategoriya ID ni olish
   \----------------------------------*/
  function getCatIdFromTag(el){
    if(!el) return "";
    // href dan (#slug) olish
    const href = el.getAttribute("href");
    if(href && href.startsWith("#")) {
      return href.slice(1).toLowerCase();
    }
    // dataset fallback: data-cat
    if(el.dataset && el.dataset.cat) return el.dataset.cat.toLowerCase();
    // text fallback (kamdan-kam)
    return el.textContent.toLowerCase().trim().replace(/\s+/g,'-');
  }

  /*----------------------------------\
   | 4. Kartalarni yangilash
   \----------------------------------*/
  function updateCardsForCategory(catId){
    // defaultCardsState ni bir marta saqlab qo'yamiz
    if(!defaultCardsState) defaultCardsState = getInitialCardsState();

    const cards = document.querySelectorAll(".experts .expert");

    if(!data[catId]){
      // kategoriya topilmasa -> default holatni tiklash
      defaultCardsState.forEach((info,idx)=>{
        const card = cards[idx];
        if(!card) return;
        const imgEl = card.querySelector(".expert__img");
        const titleEl = card.querySelector(".expert__title");
        const descEl = card.querySelector(".expert__desc");
        const rateEl = card.querySelector(".expert__rate");
        if(imgEl) imgEl.src = info.img;
        if(titleEl) titleEl.textContent = info.title;
        if(descEl) descEl.textContent = info.desc;
        if(rateEl) rateEl.innerHTML = info.priceHTML;
      });
      return;
    }

    const catData = data[catId];
    cards.forEach((card, index) => {
      const info = catData[index] || catData[0];
      const imgEl = card.querySelector(".expert__img");
      const titleEl = card.querySelector(".expert__title");
      const descEl = card.querySelector(".expert__desc");
      const rateEl = card.querySelector(".expert__rate");

      if (imgEl) imgEl.src = info.img;
      if (titleEl) titleEl.textContent = info.title;
      if (descEl) descEl.textContent = info.desc;
      if (rateEl) {
        const unitSpan = rateEl.querySelector(".expert__unit");
        rateEl.textContent = info.price + " ";
        if (unitSpan) {
          rateEl.appendChild(unitSpan);
        } else {
          const span = document.createElement("span");
          span.className = "expert__unit";
          span.textContent = "per minute";
          rateEl.appendChild(span);
        }
      }
    });
  }

  function updateActiveTags(catId){
    const tags = document.querySelectorAll(".category__tag");
    tags.forEach(tag => {
      const id = getCatIdFromTag(tag);
      tag.classList.toggle("category__tag--active", id === catId);
    });
  }

  function ensureCSS(catId){
    if (!catId) return;
    if (!document.querySelector('link[data-dynamic-style="'+catId+'"]')) {
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = catId + ".css"; // masalan wordpress.css
      styleLink.dataset.dynamicStyle = catId;
      document.head.appendChild(styleLink);
    }
  }

  function aktivTagniYangilash(catId){
    if(!catId){
      catId = window.location.hash.slice(1).toLowerCase();
    }
    if(!catId) {
      updateCardsForCategory("");
      updateActiveTags("");
      return;
    }
    ensureCSS(catId);
    updateActiveTags(catId);
    updateCardsForCategory(catId);
  }

  window.addEventListener("hashchange", () => aktivTagniYangilash());

  document.querySelectorAll(".category__tag").forEach(tag => {
    tag.addEventListener("click", function(e){
      const id = getCatIdFromTag(this);
      aktivTagniYangilash(id);
    });
  });

  document.querySelectorAll(".filterbar__btn").forEach(btn => {
    btn.addEventListener("click", function(){
      const allButtons = document.querySelectorAll(".filterbar__btn");
      allButtons.forEach(b=>b.classList.remove("filterbar__btn--active"));
      this.classList.add("filterbar__btn--active");

      const txt = this.textContent.toLowerCase().trim();
      if(txt === 'all'){
        aktivTagniYangilash("");
      } else {
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function(){
    defaultCardsState = getInitialCardsState();
    aktivTagniYangilash();
  });

})();
