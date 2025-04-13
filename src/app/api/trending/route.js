import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const db = client.db('techtrends');
    const collection = db.collection('mentions');

    const pipeline = [
      { $group: { _id: "$technology", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ];

    const trending = await collection.aggregate(pipeline).toArray();

    return new Response(JSON.stringify(trending), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'internal_error' }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}

export async function POST() {
    try {
      await client.connect();
      const db = client.db('techtrends');
      const collection = db.collection('mentions');
  
      const technologies = [
        'React', 'Vue', 'Angular', 'Svelte', 'SolidJS', 'Preact', 'Ember.js', 'Next.js', 'Nuxt', 'Remix', 'Astro', 'Qwik','Node.js', 'Deno', 'Bun','TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'Java', 'C#', 'PHP', 'Ruby','Express.js', 'Fastify', 'NestJS', 'Hapi.js', 'Koa','GraphQL', 'REST', 'tRPC', 'WebSockets','MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Firebase', 'Supabase','Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Styled Components', 'Webpack', 'Vite', 'Parcel', 'Rollup','Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Ansible','AWS', 'GCP', 'Azure', 'Netlify', 'Vercel','Jest', 'Mocha', 'Vitest', 'Cypress', 'Playwright','ESLint', 'Prettier', 'Husky', 'Lint-staged','Storybook', 'Figma', 'Postman', 'Swagger','Zustand', 'Redux', 'Recoil', 'Jotai', 'MobX','Prisma', 'Sequelize', 'TypeORM','Electron', 'React Native', 'Flutter', 'Ionic','Three.js', 'Babylon.js', 'GSAP', 'Anime.js','OpenAI', 'LangChain', 'Pinecone', 'Hugging Face',       'Cassandra', 'Neo4j', 'ElasticSearch', 'Apache Kafka','Linux', 'Bash', 'Zsh', 'Nginx', 'Apache', 'Markdown', 'YAML', 'JSON', 'XML'
      ];
      
      const randomMentions = Array.from({ length: 50 }, () => ({
        technology: technologies[Math.floor(Math.random() * technologies.length)],
        mentionedAt: new Date()
      }));
  
      await collection.insertMany(randomMentions);
  
      return new Response(JSON.stringify({ message: 'Data Added to MongoDB' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: 'internal_error - Inserting data to MongoDB' }), {
        status: 500
      });
    } finally {
      await client.close();
    }
  }
  