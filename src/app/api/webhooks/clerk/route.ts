import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma';

type CardTemplate = {
  question: string;
  answer: string;
  tags: string[];
  difficulty: string;
  audioUrls: null;
  stats: {
    totalReviews: number;
    correctReviews: number;
    incorrectReviews: number;
    streak: number;
    lastReviewedAt: null;
  };
  history: never[];
}

type CategoryName = "Mathematics" | "Science";

const DEFAULT_CATEGORIES = [
  { name: "Mathematics" as const, index: 0 },
  { name: "Science" as const, index: 1 }
];

const DEFAULT_CARDS: Record<CategoryName, CardTemplate[]> = {
  "Mathematics": [
    {
      question: "What is 2 + 2?",
      answer: "4",
      tags: ["arithmetic", "addition", "basics"],
      difficulty: "beginner",
      audioUrls: null,
      stats: {
        totalReviews: 0,
        correctReviews: 0,
        incorrectReviews: 0,
        streak: 0,
        lastReviewedAt: null
      },
      history: []
    },
    {
      question: "What is the square root of 16?",
      answer: "4",
      tags: ["arithmetic", "squares", "roots"],
      difficulty: "beginner",
      audioUrls: null,
      stats: {
        totalReviews: 0,
        correctReviews: 0,
        incorrectReviews: 0,
        streak: 0,
        lastReviewedAt: null
      },
      history: []
    },
    {
      question: "What is 7 x 8?",
      answer: "56",
      tags: ["arithmetic", "multiplication", "basics"],
      difficulty: "beginner",
      audioUrls: null,
      stats: {
        totalReviews: 0,
        correctReviews: 0,
        incorrectReviews: 0,
        streak: 0,
        lastReviewedAt: null
      },
      history: []
    }
  ],
  "Science": [
    {
      question: "What is the chemical symbol for Water?",
      answer: "H2O",
      tags: ["chemistry", "compounds", "basics"],
      difficulty: "beginner",
      audioUrls: null,
      stats: {
        totalReviews: 0,
        correctReviews: 0,
        incorrectReviews: 0,
        streak: 0,
        lastReviewedAt: null
      },
      history: []
    },
    {
      question: "What is the closest planet to the Sun?",
      answer: "Mercury",
      tags: ["astronomy", "planets", "solar system"],
      difficulty: "beginner",
      audioUrls: null,
      stats: {
        totalReviews: 0,
        correctReviews: 0,
        incorrectReviews: 0,
        streak: 0,
        lastReviewedAt: null
      },
      history: []
    },
    {
      question: "What is the process by which plants make their own food?",
      answer: "Photosynthesis",
      tags: ["biology", "plants", "processes"],
      difficulty: "intermediate",
      audioUrls: null,
      stats: {
        totalReviews: 0,
        correctReviews: 0,
        incorrectReviews: 0,
        streak: 0,
        lastReviewedAt: null
      },
      history: []
    }
  ]
};

async function seedUserData(userId: string) {
  // Create categories first
  const categories = await Promise.all(
    DEFAULT_CATEGORIES.map(async (category) => {
      return await prisma.category.create({
        data: {
          name: category.name,
          index: category.index,
          cardCount: 3, // Each category has 3 cards
          userId: userId
        }
      });
    })
  );

  // Create cards for each category
  await Promise.all(
    categories.map(async (category) => {
      const categoryCards = DEFAULT_CARDS[category.name as CategoryName];
      return Promise.all(
        categoryCards.map(async (card) => {
          return await prisma.card.create({
            data: {
              question: card.question,
              answer: card.answer,
              tags: card.tags,
              difficulty: card.difficulty,
              categoryId: category.id,
              userId: userId,
              audioUrls: card.audioUrls || undefined,
              stats: card.stats,
              history: card.history
            }
          });
        })
      );
    })
  );
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  const eventType = evt.type
  
  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    try {
      // Create the user first
      const newUser = await prisma.user.create({
        data: {
          clerkUserId: id,
          id: id,
          email: email_addresses[0].email_address,
          ...(first_name ? { firstName: first_name } : {}),
          ...(last_name ? { lastName: last_name } : {}),
          ...(image_url ? { imageUrl: image_url } : {})
        }
      });

      // Seed the user's data
      await seedUserData(newUser.id);
      
      console.log(`Created user and seeded default data for: ${id}`);
    } catch (error) {
      console.error('Error creating user and seeding data:', error);
      return new Response('Error creating user', { status: 500 });
    }
  }

  return new Response('', { status: 200 })
}