import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'new-year-weight-loss-plan',
  slug: 'new-year-weight-loss-plan',
  title: 'How to Lose Weight After Christmas: A Realistic New Year Plan',
  description: 'A 12-week plan for losing weight after the holidays: why the first week on the scale misleads, how to set your calorie and protein targets, a worked example, and swaps that cut 500 calories a day without a crash diet.',
  category: 'Calories',
  tags: ['weight loss', 'new year', 'calorie deficit', 'protein', 'january'],
  readingTimeMinutes: 8,
  updatedAt: '2026-11-21',
  relatedTool: { label: 'Calorie Deficit Calculator', href: '/calorie-deficit-calculator' },
  heroSummary: 'The most reliable way to lose weight in the new year is a steady deficit of about 500 calories a day, enough protein to hold on to muscle, and twelve weeks of patience. That pace takes off up to about 1 lb (0.45 kg) a week, so a plan that starts in early January can be 10 to 12 lb lighter by the end of March. This guide shows how to set your numbers, a worked example from start to finish, and the everyday swaps that make up most of the 500 calories.',
  keyTakeaway: 'Ignore the first week on the scale: much of the post-Christmas gain is water from salt and carbohydrate, and it goes by itself. Then work out your maintenance calories, eat about 500 below them, aim for 1.2 to 1.6 g of protein per kg of body weight, and judge progress on your two-week average, not any single morning.',
  // The "|" stops metadata.ts appending the site name, keeping the title under 60 chars.
  seoTitle: 'New Year Weight Loss Plan | A Realistic 12-Week Guide',
  seoDescription: 'Lose weight after Christmas without a crash diet: set calorie and protein targets, follow a 12-week worked example, and make swaps that save 500 calories a day.',
  sections: [
    {
      id: 'first-week',
      heading: 'Week 1: do not trust the scale yet',
      body: [
        'Most people weigh more after Christmas than before it, but less of that is fat than it looks. Salty food makes your body hold extra water, and the extra carbohydrate you eat is stored as glycogen, which binds about three times its weight in water. A jump of 2 to 4 lb (1 to 2 kg) over the holidays is common, and much of it disappears within a week or two of normal eating.',
        'That matters for two reasons. First, the quick drop in the first week is mostly water, so do not expect the same pace to continue. Second, if you weigh yourself on 27 December and set your goal from that number, you will set it from a weight that was never real. Take your starting weight after a week of ordinary eating instead.'
      ],
      callout: {
        tone: 'info',
        title: 'How much fat is a holiday really worth?',
        body: 'A common rule of thumb is that a pound of body fat stores about 3,500 calories. Gaining a real pound of fat over Christmas means eating 3,500 calories more than you burn, for example 500 extra calories every day for a week. A typical Christmas dinner of about 1,880 calories is a big meal, but on its own it adds well under half a pound of fat.'
      },
      toolCta: { label: 'See what a Christmas dinner adds up to', href: '/learn/christmas-dinner-calories' }
    },
    {
      id: 'set-your-numbers',
      heading: 'Step 1: set your calorie target',
      body: [
        'Your target is your maintenance calories, the amount that would keep your weight steady, minus about 500. Maintenance is estimated from your weight, height, age, sex and activity level using the Mifflin-St Jeor equation, then multiplied by an activity factor. The calorie deficit calculator does every step and gives you a goal date.',
        'Two guard rails keep the plan sustainable. Do not set your target below your estimated basal metabolic rate (BMR) without advice from a doctor or dietitian, and do not aim to lose more than 2 lb (about 1 kg) a week, the top of the range the NHS and the CDC recommend.'
      ],
      bullets: [
        'Maintenance calories: BMR x activity factor (1.2 desk job, 1.375 light exercise, 1.55 moderate exercise)',
        'Weight loss target: maintenance minus about 500 calories a day',
        'Expected pace: up to about 1 lb (0.45 kg) a week, slower as you get lighter',
        'Floor: not below your BMR without professional advice'
      ],
      toolCta: { label: 'Work out your calorie target and goal date', href: '/calorie-deficit-calculator' }
    },
    {
      id: 'protein',
      heading: 'Step 2: set a protein target',
      body: [
        'Protein does two jobs when you are eating less. It helps you keep muscle while you lose fat, and it is the most filling of the three macronutrients, which makes a deficit easier to stick to.',
        'The 2025-2030 Dietary Guidelines for Americans, released in January 2026, set a protein goal of 1.2 to 1.6 g per kg of body weight a day and recommend protein at every meal. That range suits most people who are losing weight. If you have a lot of weight to lose, base it on your goal weight rather than your current weight.'
      ],
      bullets: [
        'Grilled chicken breast, 4 oz (113 g): 33 g protein, 199 calories',
        'Plain nonfat Greek yogurt, 150 g pot: 15 g protein, 89 calories',
        'Large egg (50 g): 6 g protein, 72 calories'
      ],
      toolCta: { label: 'Work out your protein target', href: '/protein-calculator' }
    },
    {
      id: 'worked-example',
      heading: 'A worked example: 12 weeks from January',
      body: [
        'Emma is 38, 5 ft 4 in (163 cm) tall and weighs 12 st 7 lb (175 lb, 79.4 kg) after the first week of January. She has a desk job and walks most days, so "lightly active" fits.'
      ],
      bullets: [
        'BMR: (10 x 79.4) + (6.25 x 163) - (5 x 38) - 161 = about 1,462 calories',
        'Maintenance: 1,462 x 1.375 = about 2,010 calories',
        'Target: 2,010 - 500 = about 1,510 calories a day, just above her BMR',
        'Protein: 1.2 to 1.6 g x 79.4 kg = about 95 to 127 g a day',
        'Twelve weeks at 500 calories a day is a 42,000 calorie deficit, or about 12 lb (5.4 kg) by the 3,500 rule',
        'Realistic result by the end of March: 10 to 12 lb (4.5 to 5.4 kg), because loss slows as she gets lighter'
      ],
      callout: {
        tone: 'trust',
        title: 'Recalculate every 5 kg',
        body: 'As Emma gets lighter, her maintenance calories fall, so the same intake becomes a smaller deficit. Recalculating after every 5 kg (about 11 lb) lost keeps the plan on track without cutting further than she needs to.'
      }
    },
    {
      id: 'swaps',
      heading: 'Step 3: swaps that add up to 500 calories',
      body: [
        'Most people do not need a new diet to find 500 calories a day. Two or three swaps in the things they already eat and drink usually cover it. These figures come from the USDA data used on this site.'
      ],
      bullets: [
        'Regular cola (12 oz can) for diet cola: saves about 149 calories',
        'Medium mocha for a medium cappuccino: saves about 188 calories',
        'Bag of crisps or chips (57 g) for 3 cups of air-popped popcorn: saves about 226 calories',
        'Two chocolate chip cookies (60 g) for an apple: saves about 200 calories',
        'Two tablespoons of oil in cooking for one: saves about 126 calories',
        'A pint of beer (568 ml) for a pint of light beer: saves about 80 calories'
      ],
      callout: {
        tone: 'info',
        title: 'Drinks are the easiest place to start',
        body: 'Sugary drinks, coffee-shop drinks and alcohol do little to fill you up, so cutting them rarely leaves you hungry. Swapping one cola and one mocha a day already saves about 337 calories.'
      },
      toolCta: { label: 'Find more low-calorie snacks', href: '/learn/low-calorie-snacks-under-100-calories' }
    },
    {
      id: 'track-and-adjust',
      heading: 'Step 4: track, then adjust after three weeks',
      body: [
        'Your calculated target is an estimate. Log what you eat for the first three weeks, including cooking oil, drinks and weekends, which are the most common things to miss. Weigh yourself a few mornings a week and compare weekly averages rather than single days.',
        'After three weeks, check the trend. If your average weight is falling by about 0.5 to 1 lb (0.25 to 0.45 kg) a week, keep going. If it has not moved, eat about 100 to 200 calories less or add some activity, and check the next three weeks. If you are losing much faster than 2 lb a week after the first fortnight, eat a little more.'
      ],
      toolCta: { label: 'Add up the calories in a meal', href: '/meal-calorie-calculator' }
    },
    {
      id: 'safety',
      heading: 'Who should get advice first',
      body: [
        'A steady 500 calorie deficit is a safe starting point for most healthy adults. Very low calorie diets of 800 calories a day or less should only be followed with medical supervision, the NHS says.'
      ],
      callout: {
        tone: 'warning',
        title: 'Speak to a professional first if this applies to you',
        body: 'Talk to a GP, doctor or registered dietitian before changing your diet if you are pregnant or breastfeeding, under 18, have or have had an eating disorder, have diabetes or take medication affected by food intake, or have another medical condition.'
      }
    }
  ],
  faqs: [
    {
      question: 'How much weight can I lose by the end of March?',
      answer: 'At a deficit of about 500 calories a day, most people lose up to about 1 lb (0.45 kg) a week. Starting in early January, that is roughly 10 to 12 lb (4.5 to 5.4 kg) by the end of March, with the pace slowing a little as you get lighter.'
    },
    {
      question: 'How much weight do people gain over Christmas?',
      answer: 'The scale often shows 2 to 4 lb (1 to 2 kg) more after the holidays, but much of that is water from salty food and stored carbohydrate. It usually drops within one to two weeks of normal eating. Real fat gain needs about 3,500 extra calories per pound.'
    },
    {
      question: 'How many calories should I eat to lose weight in January?',
      answer: 'Work out your maintenance calories from your weight, height, age, sex and activity, then subtract about 500. For many women that lands around 1,400 to 1,800 calories a day and for many men around 1,900 to 2,400. Do not go below your BMR without professional advice.'
    },
    {
      question: 'Should I do a detox or juice cleanse after Christmas?',
      answer: 'There is no need. Your liver and kidneys clear waste without special products, and the quick drop on the scale from a cleanse is mostly water that returns when you eat normally. A steady calorie deficit with enough protein works better and lasts.'
    },
    {
      question: 'How much protein should I eat while losing weight?',
      answer: 'The 2025-2030 Dietary Guidelines for Americans set a goal of 1.2 to 1.6 g of protein per kg of body weight a day. For someone weighing 80 kg (about 176 lb) that is about 96 to 128 g a day, ideally spread across every meal.'
    }
  ],
  relatedSlugs: ['how-many-calories-should-i-eat-to-lose-weight', 'what-is-a-calorie-deficit', 'why-am-i-not-losing-weight']
};
