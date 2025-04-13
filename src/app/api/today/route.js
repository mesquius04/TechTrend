import clientPromise from '../../../mongo/init';

export async function GET() {
    try {
        const client = await clientPromise;
        await client.connect();
        const db = client.db('techtrends');
        const collection = db.collection('mentions');

        const start = new Date();
        const end = new Date();
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        const pipeline = [
            { $match: { mentionedAt: { $gte: start, $lte: end } } },
            { $group: { _id: "$technology", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 15 }
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
    }
}
  
