import type { LearnArticle } from '../../lib/learn/types';

export const article: LearnArticle = {
  id: 'what-is-a-calorie-deficit',
  slug: 'what-is-a-calorie-deficit',
  title: 'What Is a Calorie Deficit?',
  description: 'A calorie deficit means taking in less energy than you burn. Here is how big it should be, practical ways to create one, and why the scale does not drop in a straight line.',
  category: 'Calories',
  tags: ['calorie deficit', 'weight loss', 'water weight', 'metabolism'],
  readingTimeMinutes: 7,
  updatedAt: '2026-10-23',
  relatedTool: { label: 'Meal Calorie Calculator', href: '/meal-calorie-calculator' },
  heroSummary: "A calorie deficit is when you take in fewer calories from food and drink than your body uses, so it has to make up the difference from stored energy, mostly body fat. A deficit of around 500 kcal a day is a common, sustainable starting point and works out to roughly 1 lb (0.45 kg) a week. This guide covers how big a deficit should be, the easiest ways to create one, and why your weight bounces around even when you are doing everything right.",
  keyTakeaway: "A calorie deficit is eating less energy than you burn. Around 500 kcal a day is a sensible start. Daily weigh-ins swing with water and glycogen, so judge progress by weekly averages, and expect loss to slow a little as you get lighter.",
  seoTitle: 'What Is a Calorie Deficit? How Big and How to Create One | Food Nutrition Calculator',
  seoDescription: 'A calorie deficit means eating less energy than you burn. Learn how big it should be, easy ways to create one, and why the scale goes up and down.',
  sections: [
    {
      id: 'what-it-means',
      heading: 'What a calorie deficit actually means',
      body: [
        "Your body uses energy all day: to keep your heart, brain and organs running, to digest food, and to move. The total is your total daily energy expenditure (TDEE). The food and drink you consume supplies energy measured in calories (kcal in the UK, Calories on US labels; they are the same unit).",
        "If intake matches expenditure, your weight stays roughly stable. If intake is higher, the surplus is stored. If intake is lower, you are in a calorie deficit, and the body draws on its stores to cover the gap. Over weeks, that shows up as lower body weight and, if the deficit is moderate and protein is adequate, mostly lower body fat.",
        "A deficit is always relative to you. 1,800 kcal a day is a deficit for someone whose maintenance is 2,400 and a surplus for someone whose maintenance is 1,600. That is why copying someone else's calorie number rarely works."
      ],
      bullets: [
        'Calories in = calories out: weight stays about the same',
        'Calories in > calories out: surplus, weight goes up over time',
        'Calories in < calories out: deficit, weight goes down over time'
      ]
    },
    {
      id: 'how-big',
      heading: 'How big should a calorie deficit be?',
      body: [
        "A widely used approximation is that about 3,500 kcal equals 1 lb of body fat, or about 7,700 kcal per kg. On that basis a deficit of 500 kcal a day, 3,500 kcal a week, gives about 1 lb of loss a week. UK NICE guidance on obesity describes a 600 kcal a day deficit, a similar size.",
        "The NHS recommends aiming to lose 0.5 to 1 kg (about 1 to 2 lb) a week, and the CDC gives the same 1 to 2 lb range. A deficit of 500 to 1,000 kcal a day fits that, with the larger end usually suited to people with more weight to lose.",
        "Going bigger tends to backfire. Very large deficits make hunger and tiredness worse, make it harder to get enough protein, fibre and micronutrients, and are hard to sustain. The NHS says very low calorie diets of 800 kcal a day or less should only be followed with medical supervision."
      ],
      bullets: [
        '250 kcal a day: about 0.5 lb (0.23 kg) a week, gentle and easy to sustain',
        '500 kcal a day: about 1 lb (0.45 kg) a week, the usual starting point',
        '750 kcal a day: about 1.5 lb (0.7 kg) a week',
        '1,000 kcal a day: about 2 lb (0.9 kg) a week, the top of the NHS and CDC range'
      ]
    },
    {
      id: 'ways-to-create-one',
      heading: 'Practical ways to create a deficit',
      body: [
        "You can create a deficit by eating less, moving more, or both. For most people food changes do more of the work, because cutting 500 kcal of food takes minutes while burning 500 kcal through exercise can take an hour or more. Activity still matters for health, fitness and keeping weight off, and the NHS and US Physical Activity Guidelines both recommend at least 150 minutes of moderate activity a week.",
        "The easiest cuts are the ones you barely notice. Drinks are a good place to start: in USDA data a 12 oz can of regular cola has about 156 kcal while diet cola has about 7. Cooking oil is another: a tablespoon (14 g) of olive oil is about 126 kcal in USDA data, and free-pouring can easily add two or three times that.",
        "Protein and fibre help with fullness, so building meals around lean protein, vegetables, beans and whole grains makes a deficit easier to live with. Alcohol is worth tracking too, since it provides 7 kcal per gram on top of whatever mixers come with it."
      ],
      bullets: [
        'Swap sugary drinks for water, diet drinks, tea or coffee without sugar',
        'Measure cooking oil, butter, dressings and spreads instead of pouring',
        'Use a smaller plate or serve one portion and put the rest away',
        'Fill half the plate with vegetables or salad',
        'Choose higher-protein snacks such as Greek yoghurt, eggs or edamame',
        'Walk more: extra daily steps add up without needing gym time'
      ],
      toolCta: { label: 'Compare two foods side by side', href: '/compare-foods' }
    },
    {
      id: 'example-day',
      heading: 'Example: finding 500 kcal in a normal day',
      body: [
        "Here is how someone with a maintenance of about 2,300 kcal might reach roughly 1,800 kcal without changing every meal. The cola and olive oil figures come from the site's USDA data; the biscuit figure is a typical approximation.",
        "None of these changes removes a meal. Small, repeatable swaps tend to last longer than strict rules."
      ],
      bullets: [
        'Regular cola (12 oz can) to diet cola: saves about 149 kcal',
        'Measuring 1 tbsp of olive oil instead of free-pouring about 3 tbsp: saves about 252 kcal',
        'Skipping the second biscuit or cookie with tea: saves about 70 to 100 kcal',
        'Total: roughly 470 to 500 kcal a day'
      ],
      toolCta: { label: 'Add up a meal with the meal calculator', href: '/meal-calorie-calculator' }
    },
    {
      id: 'why-the-scale-fluctuates',
      heading: 'Why the scale goes up and down',
      body: [
        "Body weight is not just fat. It includes water, food in your gut, and glycogen, which is carbohydrate stored in muscles and the liver. Glycogen is stored with water, several grams of water for every gram of glycogen. When you eat fewer carbohydrates, glycogen and its water drop quickly, which is why the first week of a diet often shows a surprisingly large loss.",
        "The reverse happens too. A salty takeaway, a high-carb meal, a hard workout that causes muscle soreness, or hormonal changes across the menstrual cycle can all add a kilo (2 lb or more) of water overnight. None of that is fat. You cannot gain 1 kg of fat in a day without eating about 7,700 kcal more than you burn.",
        "The fix is to look at trends. Weigh yourself at the same time each morning, after using the toilet and before eating, and compare weekly averages rather than single days."
      ],
      callout: {
        tone: 'info',
        title: 'Weekly averages beat daily weigh-ins',
        body: 'Add up seven morning weights and divide by seven. If this week averages 84.6 kg and last week averaged 85.1 kg, you lost about 0.5 kg (1.1 lb), even if Tuesday looked higher than Monday.'
      }
    },
    {
      id: 'metabolic-adaptation',
      heading: 'Metabolic adaptation in plain terms',
      body: [
        "As you lose weight, you burn fewer calories, for two reasons. The first is simple: a smaller body needs less energy to run and to move around. Someone who started at 100 kg and is now 90 kg has a lower maintenance than before, so the same food intake produces a smaller deficit.",
        "The second is that the body adapts. In a deficit, people often move a little less without noticing: less fidgeting, fewer steps, more sitting. Energy use can also fall slightly more than the weight change alone would predict. This is a normal response, not a broken metabolism.",
        "In practice it means weight loss slows over time. The answer is usually to recalculate your maintenance after every 5 kg (about 10 lb) lost, keep daily steps up, and eat enough protein to help preserve muscle. Strength training helps with that too."
      ]
    },
    {
      id: 'common-mistakes',
      heading: 'Common mistakes',
      body: [
        "Most stalled deficits are not a metabolism problem. They are a counting problem. People reliably underestimate how much they eat, especially snacks, drinks and fats used in cooking."
      ],
      bullets: [
        'Guessing portions instead of weighing them for at least a week',
        'Not counting drinks, sauces, cooking oil and bites while cooking',
        'Being strict on weekdays and eating far more at weekends',
        'Trusting fitness tracker calorie burns and eating them all back',
        'Changing the plan after a single bad weigh-in'
      ],
      toolCta: { label: 'Look up calories for any food', href: '/food-calorie-counter' }
    },
    {
      id: 'who-should-not',
      heading: 'Who should get advice first',
      body: [
        "A moderate deficit is safe for most healthy adults, but it is not right for everyone. Children and teenagers need energy to grow, and pregnancy and breastfeeding raise energy needs."
      ],
      callout: {
        tone: 'warning',
        title: 'Check with a professional',
        body: 'Do not start a calorie deficit without advice if you are pregnant or breastfeeding, under 18, have or have had an eating disorder, have diabetes or take medication that affects blood sugar, or have another medical condition. A GP, doctor or registered dietitian can help you set a safe target.'
      }
    }
  ],
  faqs: [
    {
      question: 'Can you lose weight without a calorie deficit?',
      answer: 'Not body fat over the long term. Diets that seem to work without counting, such as cutting out carbs or fasting, still work by reducing how much you eat overall. Short-term drops can also come from water loss.'
    },
    {
      question: 'Why am I in a deficit but not losing weight?',
      answer: 'The usual causes are underestimated intake, water retention masking fat loss, or a maintenance estimate that was too high. Weigh your food for a week and compare weekly average weights over three to four weeks before cutting further.'
    },
    {
      question: 'Is a 1,000 calorie deficit safe?',
      answer: 'It is at the top of the range the NHS and CDC rates imply, about 2 lb (0.9 kg) a week. It can suit people with more weight to lose, but it should not push your intake very low. Get advice before eating less than your estimated BMR.'
    },
    {
      question: 'Does a calorie deficit make you lose muscle?',
      answer: 'Some lean tissue loss is normal, but you can limit it by keeping the deficit moderate, eating enough protein and doing regular strength training.'
    },
    {
      question: 'How long until I see results?',
      answer: 'Most people see a drop in the first week, much of it water. Fat loss trends usually become clear after two to four weeks of consistent tracking.'
    }
  ],
  relatedSlugs: ['how-many-calories-should-i-eat-to-lose-weight', 'tdee-explained', 'why-am-i-not-losing-weight']
};
