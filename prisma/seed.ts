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

  console.log('Seed data created successfully! ✨');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());