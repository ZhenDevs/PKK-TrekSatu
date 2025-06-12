<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">Panduan Pendakian Gunung</h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Informasi lengkap tentang persiapan, tips keselamatan, dan hal-hal yang perlu diketahui sebelum mendaki gunung.
        </p>
      </div>
      
      <!-- Table of Contents -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Daftar Isi</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a 
            v-for="(section, index) in guideSections" 
            :key="index" 
            :href="`#section-${index}`"
            class="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors group"
          >
            <div class="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <span v-html="section.iconSvg"></span>
            </div>
            <span class="font-medium text-gray-800 group-hover:text-blue-600">{{ section.title }}</span>
          </a>
        </div>
      </div>
      
      <!-- Guide Sections -->
      <div class="space-y-12">
        <section 
          v-for="(section, index) in guideSections" 
          :id="`section-${index}`" 
          :key="index"
          class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
        >
          <!-- Section Header -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex items-center">
            <div class="w-10 h-10 rounded-lg bg-white/20 text-white flex items-center justify-center mr-4">
              <span v-html="section.iconSvg"></span>
            </div>
            <h2 class="text-xl font-bold text-white">{{ section.title }}</h2>
          </div>
          
          <!-- Section Content -->
          <div class="p-6">
            <div class="prose max-w-none" v-html="section.content"></div>
            
            <!-- Checklist or Tips (if available) -->
            <div v-if="section.checklist && section.checklist.length > 0" class="mt-6 bg-gray-50 rounded-lg p-5 border border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ section.checklistTitle || 'Checklist' }}</h3>
              <div class="grid md:grid-cols-2 gap-3">
                <div 
                  v-for="(item, i) in section.checklist" 
                  :key="i"
                  class="flex items-start"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <!-- FAQ Section -->
      <div class="mt-12 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
          <h2 class="text-xl font-bold text-white">Pertanyaan Umum (FAQ)</h2>
        </div>
        
        <div class="p-6">
          <dl>
            <div 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="mb-6 last:mb-0"
            >
              <dt class="text-lg font-semibold text-gray-900">{{ faq.question }}</dt>
              <dd class="mt-2 text-gray-600">{{ faq.answer }}</dd>
            </div>
          </dl>
        </div>
      </div>
      
      <!-- Emergency Information -->
      <div class="mt-8 bg-red-50 rounded-xl shadow-md overflow-hidden border border-red-100">
        <div class="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4">
          <h2 class="text-xl font-bold text-white">Informasi Darurat</h2>
        </div>
        
        <div class="p-6">
          <p class="text-gray-700 mb-4">Jika terjadi keadaan darurat selama pendakian:</p>
          
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg shadow-sm border border-red-100 flex items-center">
              <div class="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Nomor Darurat</h3>
                <p class="text-red-600 font-semibold">112 / 119</p>
              </div>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm border border-red-100 flex items-center">
              <div class="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Basarnas</h3>
                <p class="text-red-600 font-semibold">115</p>
              </div>
            </div>
            
            <div class="md:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-red-100">
              <p class="text-gray-700 font-medium mb-2">Tindakan saat darurat:</p>
              <ol class="list-decimal pl-5 space-y-1 text-gray-600">
                <li>Tetap tenang dan jangan panik</li>
                <li>Gunakan peralatan P3K yang dibawa</li>
                <li>Informasikan posisi anda selengkap mungkin jika meminta bantuan</li>
                <li>Jika memungkinkan, turun ke ketinggian yang lebih rendah untuk kasus hipotermia atau AMS</li>
                <li>Jangan tinggalkan korban sendirian</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Back to Top Button -->
      <div class="text-center mt-8">
        <a href="#" class="inline-flex items-center px-4 py-2 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          </svg>
          Kembali ke atas
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// definePageMeta({
//   layout: 'dashboard',
// });

// Static Content - Guide Sections
const guideSections = [
  {
    title: 'Persiapan Fisik',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>`,
    content: `
      <p>Persiapan fisik yang baik sangat penting sebelum melakukan pendakian gunung. Pendakian melibatkan berjalan dalam waktu lama dengan membawa beban, serta beraktivitas di ketinggian dengan kadar oksigen yang lebih rendah.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Latihan yang Dianjurkan:</h3>
      <p>Mulailah persiapan fisik setidaknya 4-6 minggu sebelum pendakian. Fokuskan pada latihan kardiovaskular (jantung dan paru-paru) serta kekuatan kaki dan core (inti tubuh).</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Adaptasi Ketinggian:</h3>
      <p>Jika memungkinkan, lakukan beberapa pendakian di gunung yang lebih rendah terlebih dahulu untuk membiasakan tubuh dengan aktivitas di ketinggian.</p>
    `,
    checklist: [
      'Jogging atau lari 3-4 kali seminggu (minimal 30 menit)',
      'Latihan naik-turun tangga dengan membawa beban',
      'Jalan kaki jarak jauh (5-10 km) seminggu sekali',
      'Latihan kekuatan kaki (squat, lunges)',
      'Latihan core (plank, sit-up) untuk stabilitas saat membawa carrier',
      'Hiking pendek di akhir pekan untuk membiasakan kaki',
      'Istirahat cukup dan nutrisi seimbang',
      'Hindari konsumsi alkohol dan merokok'
    ],
    checklistTitle: 'Program Latihan Disarankan'
  },
  {
    title: 'Peralatan Pendakian',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>`,
    content: `
      <p>Peralatan yang tepat sangat penting untuk keamanan dan kenyamanan selama pendakian. Pilih peralatan yang sesuai dengan kondisi gunung yang akan didaki dan lama pendakian.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Carrier/Tas:</h3>
      <p>Pilih carrier dengan kapasitas 40-70 liter tergantung durasi pendakian. Pastikan carrier memiliki sistem suspensi yang nyaman, tali pinggang dan dada, serta cocok dengan ukuran tubuh Anda.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Pakaian:</h3>
      <p>Gunakan prinsip layering (berlapis) agar bisa menyesuaikan dengan perubahan suhu. Hindari pakaian berbahan katun karena menyerap air dan lama kering. Pilih bahan quick-dry dan breathable.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Sepatu:</h3>
      <p>Gunakan sepatu hiking/trekking yang memiliki grip baik dan ankle support. Sepatu yang sudah dipakai beberapa kali (tidak baru) akan lebih nyaman digunakan untuk pendakian jarak jauh.</p>
    `,
    checklist: [
      'Carrier/ransel 40-70 liter dengan rain cover',
      'Tenda, matras, dan sleeping bag',
      'Sepatu trekking waterproof',
      'Pakaian dalam quick-dry',
      'Baju hangat (fleece/jaket)',
      'Jaket waterproof/windproof',
      'Topi/kupluk dan sarung tangan',
      'Headlamp/senter dan baterai cadangan',
      'Kompor portable dan gas',
      'Peralatan masak dan makan',
      'Botol air minimal 2 liter',
      'Makanan instan dan snack energi',
      'P3K personal dan obat-obatan pribadi',
      'Plastik sampah',
      'Peta, kompas/GPS',
      'Peluit dan korek api waterproof'
    ],
    checklistTitle: 'Perlengkapan Dasar Pendakian'
  },
  {
    title: 'Keamanan & Keselamatan',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>`,
    content: `
      <p>Keselamatan harus menjadi prioritas utama dalam pendakian gunung. Selalu utamakan keselamatan di atas ego dan keinginan mencapai puncak.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Perencanaan:</h3>
      <p>Sebelum mendaki, pelajari rute pendakian, prediksi cuaca, dan tingkat kesulitan gunung yang akan didaki. Informasikan rencana pendakian kepada keluarga atau teman yang tidak ikut mendaki.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Perizinan:</h3>
      <p>Selalu daftar dan dapatkan izin pendakian resmi. Ini penting untuk pendataan dan memudahkan tim SAR jika terjadi keadaan darurat.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Selama Pendakian:</h3>
      <p>Jalan sesuai kemampuan, jangan memaksakan diri. Minum air secara teratur untuk mencegah dehidrasi. Istirahat secukupnya. Perhatikan tanda-tanda penyakit ketinggian.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Cuaca:</h3>
      <p>Cuaca di gunung dapat berubah dengan cepat. Jika kondisi memburuk (hujan deras, badai, kabut tebal), pertimbangkan untuk turun atau berlindung. Jangan nekat meneruskan pendakian dalam kondisi cuaca ekstrem.</p>
    `,
    checklist: [
      'Mendaki dalam kelompok minimal 3-4 orang',
      'Tetap di jalur resmi, jangan mencoba jalur alternatif',
      'Beri tahu petugas/basecamp tentang rencana pendakian',
      'Selalu bawa perlengkapan darurat (P3K, peluit, senter)',
      'Perhatikan ramalan cuaca sebelum dan selama pendakian',
      'Jangan meninggalkan anggota kelompok sendirian',
      'Bawa cadangan makanan lebih dari yang diperkirakan',
      'Kenali tanda-tanda penyakit ketinggian',
      'Bersikap rendah hati dan tidak malu untuk berbalik jika kondisi tidak memungkinkan',
      'Selalu bersihkan sampah dan bawa turun'
    ],
    checklistTitle: 'Tips Keselamatan'
  },
  {
    title: 'Kesehatan di Ketinggian',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>`,
    content: `
      <p>Berada di ketinggian memberikan tantangan tersendiri bagi tubuh. Kadar oksigen yang lebih rendah dapat menyebabkan berbagai masalah kesehatan jika tidak diatasi dengan benar.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Penyakit Ketinggian:</h3>
      <p>Acute Mountain Sickness (AMS) adalah kondisi yang umum terjadi pada pendaki yang naik terlalu cepat ke ketinggian. Gejala awal termasuk sakit kepala, mual, muntah, kehilangan nafsu makan, kelelahan, dan gangguan tidur.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Pencegahan AMS:</h3>
      <p>Naik secara bertahap, tidak terburu-buru. Prinsip "naik tinggi, tidur rendah" dapat membantu. Hindari alkohol dan obat tidur. Minum banyak air dan konsumsi makanan tinggi karbohidrat.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Penanganan:</h3>
      <p>Jika mengalami gejala AMS, hentikan pendakian. Istirahat dan jika memungkinkan turun ke ketinggian lebih rendah. Jika gejala memburuk (sulit bernapas saat istirahat, bingung, tidak mampu berjalan lurus), segera turun dan cari pertolongan medis.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Dehidrasi:</h3>
      <p>Di ketinggian, tubuh kehilangan cairan lebih cepat melalui pernapasan dan keringat. Minum air secara teratur meskipun tidak merasa haus. Urin yang jernih/pucat menandakan hidrasi yang baik.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Hipotermia:</h3>
      <p>Suhu di gunung bisa turun drastis, terutama malam hari. Kenali tanda hipotermia: menggigil parah, koordinasi buruk, bicara tidak jelas, kebingungan. Segera hangatkan dengan pakaian kering, minuman hangat, dan body heat sharing jika diperlukan.</p>
    `,
    checklist: [
      'Naik secara bertahap, aklimatisasi dengan baik',
      'Minum minimal 3-4 liter air per hari',
      'Konsumsi makanan tinggi karbohidrat',
      'Hindari alkohol dan obat penenang',
      'Bawa obat-obatan untuk sakit kepala dan mual',
      'Kenali tanda-tanda AMS, HAPE, dan HACE',
      'Gunakan teknik pernapasan yang benar saat mendaki',
      'Jangan malu untuk turun jika mengalami gejala penyakit ketinggian',
      'Gunakan prinsip layering untuk pakaian agar tetap hangat',
      'Selalu jaga agar pakaian tetap kering, terutama yang langsung kontak dengan kulit'
    ],
    checklistTitle: 'Tips Kesehatan di Ketinggian'
  },
  {
    title: 'Etika Pendakian',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>`,
    content: `
      <p>Etika pendakian adalah prinsip perilaku yang menjaga kelestarian lingkungan gunung dan menghormati sesama pendaki serta masyarakat sekitar.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Prinsip Leave No Trace:</h3>
      <p>Pendakian yang bertanggung jawab mengikuti prinsip "Leave No Trace" (Tidak Meninggalkan Jejak). Artinya, kita berusaha meminimalkan dampak keberadaan kita di alam.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Sampah:</h3>
      <p>Bawa turun semua sampah yang kamu bawa naik. Termasuk sampah organik seperti kulit buah. Jika memungkinkan, bantu juga membawa turun sampah yang ditinggalkan pendaki lain.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Api Unggun:</h3>
      <p>Hindari membuat api unggun. Jika terpaksa, gunakan area yang sudah ada dan pastikan api benar-benar padam sebelum ditinggalkan. Lebih baik menggunakan kompor portable.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Hubungan dengan Pendaki Lain:</h3>
      <p>Hormati sesama pendaki. Beri jalan pada pendaki yang lebih cepat. Tawarkan bantuan jika ada yang kesulitan. Menjaga ketenangan di area perkemahan.</p>
      
      <h3 class="text-lg font-medium text-gray-900 mt-4 mb-2">Budaya Lokal:</h3>
      <p>Hormati budaya dan kepercayaan masyarakat lokal. Beberapa gunung memiliki area sakral atau ritual tertentu yang perlu dihormati. Patuhi aturan yang ditetapkan oleh masyarakat setempat.</p>
    `,
    checklist: [
      'Bawa turun semua sampah (termasuk puntung rokok)',
      'Gunakan toilet atau buang air pada jarak minimal 100m dari sumber air',
      'Hindari membuat api unggun',
      'Jangan ambil apapun dari gunung kecuali foto dan kenangan',
      'Gunakan jalur yang sudah ada, jangan membuat jalur baru',
      'Hormati pendaki lain dan jaga ketenangan',
      'Patuhi peraturan dan ketentuan pendakian setempat',
      'Hormati budaya dan kepercayaan masyarakat lokal',
      'Gunakan sabun/peralatan mandi yang ramah lingkungan',
      'Bantu menjaga kebersihan dan kelestarian gunung'
    ],
    checklistTitle: 'Etika Pendakian'
  }
];

// Static FAQs
const faqs = [
  {
    question: 'Berapa lama waktu yang dibutuhkan untuk persiapan fisik sebelum mendaki gunung?',
    answer: 'Idealnya, persiapan fisik dilakukan 4-6 minggu sebelum pendakian. Fokuskan pada latihan kardio dan kekuatan kaki. Untuk gunung dengan tingkat kesulitan tinggi, mungkin diperlukan persiapan yang lebih lama.'
  },
  {
    question: 'Apakah saya perlu membuat izin pendakian?',
    answer: 'Ya, hampir semua gunung di Indonesia yang dibuka untuk umum mewajibkan pendaki untuk mendaftar dan mendapatkan izin pendakian. Ini penting untuk keselamatan dan pendataan. Izin dapat dibuat di basecamp atau secara online melalui aplikasi pendakian resmi.'
  },
  {
    question: 'Berapa banyak air yang harus dibawa selama pendakian?',
    answer: 'Minimal 2-3 liter per hari pendakian. Namun, jumlah ini bisa bertambah tergantung kondisi cuaca dan rute. Beberapa gunung memiliki sumber air yang bisa diakses untuk mengisi ulang, tetapi pastikan untuk memfilter atau merebus air tersebut sebelum dikonsumsi.'
  },
  {
    question: 'Bagaimana cara mengenali gejala penyakit ketinggian (AMS)?',
    answer: 'Gejala awal AMS termasuk sakit kepala yang tidak hilang dengan painkillers, mual atau muntah, kehilangan nafsu makan, kelelahan berlebih, pusing, dan gangguan tidur. Jika mengalami gejala ini, segera hentikan pendakian dan pertimbangkan untuk turun ke ketinggian lebih rendah.'
  },
  {
    question: 'Bolehkah saya mendaki gunung sendirian?',
    answer: 'Sangat tidak disarankan mendaki gunung sendirian, terutama bagi pemula. Pendakian sebaiknya dilakukan dalam kelompok minimal 3-4 orang. Jika terjadi kecelakaan, ada yang bisa memberikan pertolongan pertama dan mencari bantuan.'
  },
  {
    question: 'Apa saja yang harus ada dalam kotak P3K pendakian?',
    answer: 'Kotak P3K dasar untuk pendakian sebaiknya berisi: perban, plester, antiseptik, obat anti alergi, obat sakit kepala, obat diare, obat mual, obat anti inflamasi (seperti ibuprofen), penghangat instan, gunting kecil, pinset, dan obat-obatan pribadi jika ada kondisi medis tertentu.'
  }
];
</script>

<style>
.prose h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  font-size: 1.25rem;
  color: #1f2937;
}

.prose p {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  color: #4b5563;
}

/* Proper aspect ratio for images */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 > img {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
}
</style>