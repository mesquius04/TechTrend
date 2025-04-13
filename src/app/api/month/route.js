import clientPromise from '../../../mongo/init';

export async function GET() {
  try {
    const client = await clientPromise;
    await client.connect();
    const db = client.db('techtrends');
    const collection = db.collection('mentions');

    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const pipeline = [
      { 
        $match: {
          mentionedAt: { $gte: startOfLastMonth },
        },
      },
      {
        $project: {
          technology: 1,
          month: {
            $cond: [
              { $gte: ['$mentionedAt', startOfThisMonth] },
              'thisMonth',
              'lastMonth',
            ],
          },
        },
      },
      {
        $group: {
          _id: { technology: '$technology', month: '$month' },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.technology',
          counts: {
            $push: {
              k: '$_id.month',
              v: '$count',
            },
          },
        },
      },
      {
        $project: {
          technology: '$_id',
          counts: { $arrayToObject: '$counts' },
          _id: 0,
        },
      },
      {
        $addFields: {
          increase: {
            $subtract: [
              { $ifNull: ['$counts.thisMonth', 0] },
              { $ifNull: ['$counts.lastMonth', 0] },
            ],
          },
        },
      },
      {
        $sort: { increase: -1 },
      },
      {
        $limit: 15,
      },
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
