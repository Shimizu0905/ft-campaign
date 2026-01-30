const i=[{id:0,name:"上野トレーナー",store:"円山店",catchphrase:'"コミュ力おばけ"と言えばこの漢<br>円山指名率No.1!!',catchphraseHighlight:["コミュ力おばけ","円山指名率No.1!!"],description:"僕自身もともと体型へのコンプレックスから無理な食事やトレーニングを行い、続かなかった経験があります。無理な目標設定や無謀な挑戦ではなくしっかりとプロセスを作り、まずは手前のゴールに導けるような指導を心がけております!",achievements:[{title:"2021 MUSCLE GATE 札幌",details:["ノービス-172/4位","-168/4位"]},{title:"2023 JBBF 札幌",details:["23歳以下級jrOPEN/2位","-168/2位"]},{title:"2024 JBBF 北海道大会",details:["-168/4位"]},{title:"2025 JBBF 北海道大会",details:["-168/優勝"]}],photo:"/assets/images/experience/tresapo/crew/crew-01.webp"},{id:1,name:"栗生トレーナー",store:"桑園店",catchphrase:"桑園のマザーテレサ",catchphraseHighlight:[],description:"ジムに通うことが楽しくなってくれると嬉しいので、会員様が常にモチベーションを高めていけるよう心がけて、目標に向けて全力サポートしていきます。今日も楽しかった！と思ってもらえるような時間を心がけています。",achievements:[],photo:"/assets/images/experience/tresapo/crew/crew-02.webp"},{id:2,name:"中村トレーナー",store:"菊水店",catchphrase:"筋トレに人生を救われた<br>筋トレオタク!",catchphraseHighlight:[],description:"セルフトレーニングで効果的に実践していただくために、自分自身のトレーニング経験をもとに、無理なく最短で結果が出せるよう大切なポイントを端的に伝えることを心がけています。",achievements:[{title:"2022 JBBF 北海道大会",details:["23歳以下級−172/5位"]},{title:"2023 JBBF 北海道大会　−172/5位"},{title:"2024 JBBF 北海道大会　−172/2位"}],photo:"/assets/images/experience/tresapo/crew/crew-03.webp"},{id:3,name:"小玉トレーナー",store:"南郷7丁目店",catchphrase:"細マッチョになりたいなら<br>この漢に!",catchphraseHighlight:[],description:"サポート前にしっかりとヒアリングを行い、不安に寄り添い解消できるよう心がけています。重さや強度も個々に適した設定をレクチャーいたしますので、安心して受講していただけます。",achievements:[{title:"マッスルゲート札幌大会",details:["JBBF 北海道大会メンズフィジーク<br>新人−172 4位<br>一般−172 5位"]}],photo:"/assets/images/experience/tresapo/crew/crew-04.webp"}];function $(){const a=document.getElementById("crew-modal"),w=document.getElementById("crew-modal-overlay"),u=document.getElementById("crew-modal-close");if(!a)return;let n=!1,s=0;function d(e){if(e<0||e>=i.length)return;const t=i[e],o=a.querySelector(".p-crew-modal__content");if(!o)return;let l=t.catchphrase;t.catchphraseHighlight&&t.catchphraseHighlight.length>0&&t.catchphraseHighlight.forEach(c=>{l=l.replace(c,`<span class="p-crew-modal__catchphrase-highlight">${c}</span>`)});const y=t.achievements.map(c=>{const b=c.details&&c.details.length>0?c.details.map(M=>`<span class="p-crew-modal__achievement-detail">${M}</span>`).join(" "):"";return`
        <li class="p-crew-modal__achievement-item">
          <span class="p-crew-modal__achievement-title">${c.title}</span>
          ${b?`<span class="p-crew-modal__achievement-details-wrapper">${b}</span>`:""}
        </li>
      `}).join("");o.innerHTML=`
      <div class="p-crew-modal__header">
        <img src="${t.photo}" alt="${t.name}" class="p-crew-modal__photo">
        <div class="p-crew-modal__info">
          <h4 class="p-crew-modal__name">${t.name}<span class="p-crew-modal__store">〈${t.store}〉</span></h4>
        </div>
      </div>
      <div class="p-crew-modal__body">
        <p class="p-crew-modal__catchphrase">${l}</p>
        <div class="p-crew-modal__description">
          <p>${t.description}</p>
        </div>
        <div class="p-crew-modal__achievements">
          <ul class="p-crew-modal__achievements-list">
            ${y}
          </ul>
        </div>
      </div>
    `,a.setAttribute("aria-labelledby",`crew-modal-title-${e}`),a.setAttribute("aria-describedby",`crew-modal-desc-${e}`)}function B(e){e<0||e>=i.length||(n=!0,s=e,d(e),a.classList.add("is-open"),document.body.classList.add("is-modal-open"),window.crewSlider&&(window.crewSlider.slick("slickPause"),window.crewSlider.slick("slickGoTo",e)))}function p(){n=!1,a.classList.remove("is-open"),document.body.classList.remove("is-modal-open"),window.crewSlider&&window.crewSlider.slick("slickPlay")}function v(){s=(s+1)%i.length,d(s),window.crewSlider&&window.crewSlider.slick("slickGoTo",s)}function g(){s=(s-1+i.length)%i.length,d(s),window.crewSlider&&window.crewSlider.slick("slickGoTo",s)}let h=0,m=0,r=!1;function E(e){h=e.touches[0].clientX,m=h,r=!0}function k(e){r&&(m=e.touches[0].clientX)}function L(){if(!r)return;r=!1;const e=m-h;Math.abs(e)>50&&(e>0?g():v())}const f=document.getElementById("crew-modal-prev"),_=document.getElementById("crew-modal-next");f&&f.addEventListener("click",g),_&&_.addEventListener("click",v),a&&(a.addEventListener("touchstart",E,{passive:!0}),a.addEventListener("touchmove",k,{passive:!0}),a.addEventListener("touchend",L,{passive:!0})),document.addEventListener("click",e=>{var t;if(e.target.closest(".p-crew__open")){const o=e.target.closest(".p-crew__open");e.stopPropagation();const l=parseInt(o.getAttribute("data-open")||((t=o.closest(".p-crew__slide"))==null?void 0:t.getAttribute("data-crew"))||"0");B(l)}}),u&&u.addEventListener("click",p),w&&w.addEventListener("click",p),document.addEventListener("keydown",e=>{e.key==="Escape"&&n&&p()})}document.addEventListener("DOMContentLoaded",function(){$()});
