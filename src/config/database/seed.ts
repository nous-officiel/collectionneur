import prisma from './client'

async function seedDatabase() {
  await prisma.capture.deleteMany()
  await prisma.user.deleteMany()
  console.log('🧹 Database cleaned.')

  const users = await Promise.all([
    prisma.user.create({
      data: {
        pseudo: 'RudyDupuis',
        sub: 'auth0|user1234567890'
      }
    }),
    prisma.user.create({
      data: {
        pseudo: 'JeanDupont',
        sub: 'auth0|user0987654321'
      }
    }),
    prisma.user.create({
      data: {
        pseudo: 'MarieCurie',
        sub: 'auth0|user1122334455'
      }
    })
  ])
  console.log(`👥 ${users.length} users created.`)

  const collectibles = await Promise.all([
    prisma.collectible.create({
      data: { name: 'Tour Eiffel' }
    }),
    prisma.collectible.create({
      data: { name: 'Arc de Triomphe' }
    }),
    prisma.collectible.create({
      data: { name: 'Sacré-Cœur' }
    }),
    prisma.collectible.create({
      data: { name: 'Notre-Dame' }
    }),
    prisma.collectible.create({
      data: { name: 'Louvre' }
    }),
    prisma.collectible.create({
      data: { name: 'Champs-Élysées' }
    }),
    prisma.collectible.create({
      data: { name: 'Versailles' }
    }),
    prisma.collectible.create({
      data: { name: 'Panthéon' }
    })
  ])
  console.log(`🏆 ${collectibles.length} collectibles created.`)

  const dummyPhoto = Buffer.from('fake-image-data')

  const captures = await Promise.all([
    prisma.capture.create({
      data: {
        photo: dummyPhoto,
        latitude: 48.8584,
        longitude: 2.2945,
        userId: users[0].id,
        collectibleId: collectibles[0].id
      }
    }),
    prisma.capture.create({
      data: {
        photo: dummyPhoto,
        latitude: 48.8738,
        longitude: 2.295,
        userId: users[0].id,
        collectibleId: collectibles[1].id
      }
    }),
    prisma.capture.create({
      data: {
        photo: dummyPhoto,
        latitude: 48.8867,
        longitude: 2.3431,
        userId: users[0].id,
        collectibleId: collectibles[2].id
      }
    }),
    prisma.capture.create({
      data: {
        photo: dummyPhoto,
        latitude: 48.8584,
        longitude: 2.2945,
        userId: users[1].id,
        collectibleId: collectibles[0].id
      }
    }),
    prisma.capture.create({
      data: {
        photo: dummyPhoto,
        latitude: 48.8606,
        longitude: 2.3376,
        userId: users[1].id,
        collectibleId: collectibles[4].id
      }
    }),
    prisma.capture.create({
      data: {
        photo: dummyPhoto,
        latitude: 48.853,
        longitude: 2.3499,
        userId: users[2].id,
        collectibleId: collectibles[3].id
      }
    }),
    prisma.capture.create({
      data: {
        photo: dummyPhoto,
        latitude: 48.8049,
        longitude: 2.1204,
        userId: users[2].id,
        collectibleId: collectibles[6].id
      }
    }),
    prisma.capture.create({
      data: {
        photo: dummyPhoto,
        latitude: 48.8462,
        longitude: 2.3464,
        userId: users[2].id,
        collectibleId: collectibles[7].id
      }
    })
  ])
  console.log(`📸 ${captures.length} captures created.`)
}
seedDatabase()
  .then(async () => {
    console.log('✅ Database seeded successfully.')
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error('❌ Database seeding failed:', error)
    await prisma.$disconnect()
    process.exit(1)
  })
