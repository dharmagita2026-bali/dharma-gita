import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const sekarAlit = await prisma.materi.upsert({
    where: { slug: 'sekar-alit' },
    update: {},
    create: {
      title: 'Sekar Alit',
      slug: 'sekar-alit',
      description: 'Sekar Alit adalah jenis kidung yang menggunakan aturan pupuh...',
    },
  });

  await prisma.kidung.create({
    data: {
      title: 'Pupuh Mijil',
      description: 'Mijil memiliki watak yang bersifat bersungguh-sungguh...',
      lyrics: 'Lirik Pupuh Mijil: ... (isi lirik di sini) ...',
      audioUrl: 'https://your-storage.com/mijil.mp3',
      materiId: sekarAlit.id,
    },
  });

  console.log('Seed data created successfully! ✨');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());