# SkillTrack

Kişisel Beceri ve Öğrenme Takip Platformu. Öğrenmek veya geliştirmek istediğiniz becerileri
kaydedin, hedef çalışma sürelerinizi belirleyin ve ilerlemenizi tek bir panelden takip edin.

## Canlı Demo

[https://coruscating-cat-30afaa.netlify.app](https://coruscating-cat-30afaa.netlify.app)

## Ekran Görüntüsü

![SkillTrack Ekran Görüntüsü](./screenshots/skilltrack-dashboard.png)

> `screenshots/` klasörüne uygulamanın Genel Bakış ekranından alınmış bir görüntü ekleyin.

## Özellikler

- Modern, SaaS dashboard hissiyatında profesyonel arayüz
- Beceri ekleme, düzenleme ve silme (tam CRUD desteği)
- Hedef ve tamamlanan çalışma süresine göre otomatik ilerleme hesaplama
- Tamamlanan süre hedefe ulaştığında durumun otomatik "Tamamlandı" olması
- Dashboard üzerinde toplam beceri, devam eden, tamamlanan ve toplam çalışma istatistikleri
- Genel öğrenme ilerlemesi ve son eklenen beceriler bölümü
- Arama, kategori/durum/öncelik filtreleme ve sıralama
- Silme işlemlerinde onay modalı
- Boş durum (empty state) ve sonuç bulunamadı ekranları
- Form doğrulama (validation) ve Türkçe hata mesajları
- LocalStorage ile kalıcı veri saklama, sayfa yenilemede veri kaybı yok
- Mobil, tablet ve masaüstü için tam responsive tasarım
- Erişilebilirlik: aria-label, klavye navigasyonu, odak (focus) durumları

## Kullanılan Teknolojiler

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Lucide React](https://lucide.dev/) (ikon kütüphanesi)
- Tarayıcı `LocalStorage` API (backend kullanılmamıştır)

## CRUD İşlemleri

| İşlem | Karşılığı |
| --- | --- |
| **CREATE** | "Yeni Beceri Ekle" formu ile yeni beceri oluşturma |
| **READ** | "Becerilerim" ekranında listeleme, arama ve filtreleme |
| **UPDATE** | Beceri kartındaki "Düzenle" aksiyonu ile güncelleme |
| **DELETE** | Onay modalı ile beceri silme |

## Proje Yapısı

```text
src/
├── components/
│   ├── layout/       # Sidebar, Header, sayfa iskeleti (Layout)
│   ├── dashboard/     # StatCard, ProgressOverview, RecentSkills
│   ├── skills/        # SkillCard, SkillForm, SkillList, SkillFilters, DeleteConfirmModal
│   └── ui/            # Button, Modal, ProgressBar, EmptyState, Badge, Toast
├── pages/              # Dashboard, Skills, About
├── interfaces/         # Skill.ts veri modeli ve tipler
├── context/            # SkillsContext, ToastContext (global state)
├── hooks/               # useSkills.ts (CRUD + LocalStorage senkronizasyonu)
├── utils/               # storage.ts, helpers.ts, constants.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Kurulum

```bash
git clone REPOSITORY_URL
cd skilltrack
npm install
npm run dev
```

## Çalıştırma

```bash
npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışır.

## Production Build

```bash
npm run build
```

Derlenen dosyalar `dist/` klasörüne çıkarılır.

Build çıktısını yerel olarak önizlemek için:

```bash
npm run preview
```

## Netlify Üzerinde Yayınlama

1. Depoyu GitHub'a yükleyin.
2. Netlify üzerinde "Add new site" → "Import an existing project" seçin ve deponuzu bağlayın.
3. Build ayarları proje kökündeki `netlify.toml` dosyasından otomatik olarak okunur:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. `netlify.toml` içerisindeki SPA yönlendirme kuralı (`/* → /index.html`) sayesinde
   `/skills` ve `/about` gibi rotalar doğrudan açıldığında 404 hatası alınmaz.
5. Yayınlandıktan sonra Netlify tarafından verilen bağlantıyı bu README'nin
   "Canlı Demo" bölümüne ekleyin.

## LocalStorage

- Tüm beceri verileri tarayıcının `LocalStorage`'ında `skilltrack_skills` anahtarı altında saklanır.
- Uygulama ilk kez açıldığında LocalStorage boşsa 4 örnek beceri otomatik olarak yüklenir.
  Kullanıcı verilerini sildikten sonra bu örnek veriler tekrar yüklenmez.
- Bozuk veya parse edilemeyen veri uygulamanın çökmesine neden olmaz; ilgili işlemler
  `try/catch` ile güvenli şekilde ele alınır.
- Backend veya harici bir veritabanı kullanılmamıştır; proje tamamen istemci tarafında (client-side)
  çalışır.

## Geliştirici

Bu proje, bir Web Geliştirme & Yapay Zeka eğitim programı bitirme projesi olarak
geliştirilmiştir.

